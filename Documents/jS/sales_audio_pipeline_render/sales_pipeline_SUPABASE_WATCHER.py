
import os
import time
import json
import requests
from datetime import datetime
from supabase import create_client, Client
from mutagen.mp3 import MP3

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
STORAGE_BUCKET = "audiorecordings"
OUTPUT_FOLDER = "./outputs"

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
WHISPER_URL = "https://api.openai.com/v1/audio/transcriptions"
GPT_URL = "https://api.openai.com/v1/chat/completions"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
processed_files = set()

def list_supabase_audio_files():
    print("Checking Supabase Storage for new files...")
    return supabase.storage.from_(STORAGE_BUCKET).list()

def download_file(filename, local_path):
    print(f"Downloading {filename}...")
    res = supabase.storage.from_(STORAGE_BUCKET).download(filename)
    with open(local_path, "wb") as f:
        f.write(res)
    print(f"Downloaded {filename} to {local_path}")

def get_audio_duration(filepath):
    try:
        audio = MP3(filepath)
        return round(audio.info.length, 2)
    except Exception as e:
        print("Could not determine audio duration:", e)
        return None

def transcribe_with_whisper(file_path):
    print("Sending file to OpenAI Whisper for transcription...")
    with open(file_path, "rb") as audio_file:
        headers = { "Authorization": f"Bearer {OPENAI_API_KEY}" }
        files = { "file": audio_file, "model": (None, "whisper-1") }
        response = requests.post(WHISPER_URL, headers=headers, files=files)
        if response.status_code == 200:
            print("Transcription complete.")
            return response.json()["text"]
        else:
            print("Whisper ERROR:", response.status_code, response.text)
            return None

def analyze_with_openai(transcript):
    print("Sending transcript to GPT-4 for analysis...")
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": "You are an expert sales coach. Analyze the following sales call transcript and provide a JSON object with the following fields: summary, tone, objections, follow_up_recommendations, deal_readiness_score (0-100)."
            },
            {
                "role": "user",
                "content": transcript
            }
        ]
    }
    response = requests.post(GPT_URL, headers=headers, json=data)
    if response.status_code == 200:
        print("OpenAI GPT-4 analysis complete.")
        return response.json()
    else:
        print("OpenAI GPT ERROR:", response.status_code, response.text)
        return None

def estimate_cost(duration_sec, transcript_len):
    whisper_cost = (duration_sec / 60) * 0.006
    gpt_tokens = transcript_len / 4
    gpt_cost = (gpt_tokens / 1000) * 0.03
    return round(whisper_cost + gpt_cost, 4)

def upload_to_supabase_table(filename, gpt_response, transcript, duration, cost):
    try:
        content = gpt_response['choices'][0]['message']['content']
        parsed = json.loads(content)
        row = {
            "filename": filename,
            "summary": parsed.get("summary"),
            "tone": parsed.get("tone"),
            "objections": parsed.get("objections"),
            "follow_up": parsed.get("follow_up_recommendations"),
            "score": parsed.get("deal_readiness_score"),
            "transcript": transcript,
            "duration": duration,
            "cost_usd": cost
        }
        supabase.table("call_analysis").insert(row).execute()
        print("Saved analysis to Supabase table.")
    except Exception as e:
        print("Error saving to Supabase:", e)

def process_file(filename):
    local_path = f"./downloads/{filename}"
    os.makedirs("./downloads", exist_ok=True)
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    if filename in processed_files:
        return

    download_file(filename, local_path)
    duration = get_audio_duration(local_path)
    transcript = transcribe_with_whisper(local_path)
    if not transcript:
        return

    analysis = analyze_with_openai(transcript)
    if analysis:
        out_file = os.path.join(OUTPUT_FOLDER, filename.replace(".mp3", ".json"))
        with open(out_file, "w") as f:
            json.dump(analysis, f, indent=2)
        cost = estimate_cost(duration or 60, len(transcript))
        upload_to_supabase_table(filename, analysis, transcript, duration, cost)
        processed_files.add(filename)

def main():
    print("Watching Supabase bucket for new .mp3 files...")
    while True:
        try:
            files = list_supabase_audio_files()
            for file in files:
                if file["name"].endswith(".mp3") and file["name"] not in processed_files:
                    process_file(file["name"])
        except Exception as e:
            print("Error during processing loop:", e)
        time.sleep(10)

if __name__ == "__main__":
    main()
