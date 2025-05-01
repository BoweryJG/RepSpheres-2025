import os
import json
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from supabase import create_client, Client
from mutagen.mp3 import MP3

# === CONFIG ===
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
STORAGE_BUCKET = "audiorecordings"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# === INIT ===
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
app = FastAPI()

# === ROOT CHECK ===
@app.get("/")
def read_root():
    return {"message": "App is live!"}

# === WEBHOOK ===
class WebhookPayload(BaseModel):
    filename: str

@app.post("/webhook")
async def webhook(payload: WebhookPayload):
    filename = payload.filename
    print(f"Received: {filename}")
    os.makedirs("downloads", exist_ok=True)
    local_path = f"./downloads/{filename}"

    # Download audio
    res = supabase.storage.from_(STORAGE_BUCKET).download(filename)
    with open(local_path, "wb") as f:
        f.write(res)

    # Duration
    try:
        duration = round(MP3(local_path).info.length, 2)
    except Exception:
        duration = None

    # Transcribe
    with open(local_path, "rb") as audio_file:
        whisper_res = requests.post(
            "https://api.openai.com/v1/audio/transcriptions",
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
            files={"file": audio_file, "model": (None, "whisper-1")}
        )
    if whisper_res.status_code != 200:
        return {"error": "whisper failed"}
    transcript = whisper_res.json()["text"]

    # === GPT-4 Analysis: Sales Coach ===
    gpt_sales = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"},
        json={
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "You are an expert sales coach. Analyze the following sales call transcript and provide a JSON object with summary, tone, objections, follow_up_recommendations, and deal_readiness_score (0-100)."},
                {"role": "user", "content": transcript}
            ]
        }
    )
    if gpt_sales.status_code != 200:
        return {"error": "gpt-4 (sales coach) failed"}
    parsed_sales = json.loads(gpt_sales.json()["choices"][0]["message"]["content"])

    # === GPT-4 Analysis: Harvey Specter ===
    gpt_harvey = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"},
        json={
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "You are Harvey Specter, the most ruthless closer in NYC. Analyze this call. Identify weakness, hesitation, manipulation tactics, and any leverage opportunities. Be blunt, elite, and tactical. Output in JSON with: weaknesses, leverage_moves, closing_strategy, and rating (0–100)."},
                {"role": "user", "content": transcript}
            ]
        }
    )
    if gpt_harvey.status_code != 200:
        return {"error": "gpt-4 (harvey specter) failed"}
    parsed_harvey = json.loads(gpt_harvey.json()["choices"][0]["message"]["content"])

    # Estimate cost
    cost = round((duration / 60) * 0.006 + (len(transcript) / 4 / 1000 * 0.03), 4) if duration else None

    # Store results
    supabase.table("call_analysis").insert({
        "filename": filename,
        "summary": parsed_sales.get("summary"),
        "tone": parsed_sales.get("tone"),
        "objections": parsed_sales.get("objections"),
        "follow_up": parsed_sales.get("follow_up_recommendations"),
        "score": parsed_sales.get("deal_readiness_score"),
        "harvey_weaknesses": parsed_harvey.get("weaknesses"),
        "harvey_leverage": parsed_harvey.get("leverage_moves"),
        "harvey_strategy": parsed_harvey.get("closing_strategy"),
        "harvey_rating": parsed_harvey.get("rating"),
        "transcript": transcript,
        "duration": duration,
        "cost_usd": cost
    }).execute()

    return {"status": "ok", "filename": filename}
