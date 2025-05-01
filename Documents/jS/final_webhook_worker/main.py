import os
import json
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from supabase import create_client, Client
from mutagen.mp3 import MP3

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
STORAGE_BUCKET = "audiorecordings"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
app = FastAPI()

class WebhookPayload(BaseModel):
    filename: str

@app.post("/webhook")
async def webhook(payload: WebhookPayload):
    filename = payload.filename
    print(f"Received: {filename}")
    os.makedirs("downloads", exist_ok=True)
    local_path = f"./downloads/{filename}"

    # Download
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

    # GPT-4
    gpt_res = requests.post(
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
    if gpt_res.status_code != 200:
        return {"error": "gpt-4 failed"}
    parsed = json.loads(gpt_res.json()["choices"][0]["message"]["content"])
    cost = round((duration / 60) * 0.006 + (len(transcript)/4 / 1000 * 0.03), 4) if duration else None

    supabase.table("call_analysis").insert({
        "filename": filename,
        "summary": parsed.get("summary"),
        "tone": parsed.get("tone"),
        "objections": parsed.get("objections"),
        "follow_up": parsed.get("follow_up_recommendations"),
        "score": parsed.get("deal_readiness_score"),
        "transcript": transcript,
        "duration": duration,
        "cost_usd": cost
    }).execute()

    return {"status": "ok", "filename": filename}
