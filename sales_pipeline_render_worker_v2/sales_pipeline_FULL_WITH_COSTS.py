
import os
import time
import json
import requests
from datetime import datetime
from supabase import create_client, Client
import mutagen

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
AUDIO_FOLDER = "/Users/jasonsmacbookpro2022/Documents/Audio to Supabase"
OUTPUT_FOLDER = "./outputs"
STORAGE_BUCKET = "audiorecordings"

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
WHISPER_URL = "https://api.openai.com/v1/audio/transcriptions"
GPT_URL = "https://api.openai.com/v1/chat/completions"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
processed_files = set()

def get_audio_duration(filepath):
    try:
        audio = mutagen.File(filepath)
        return round(audio.info.length, 2)
    except Exception as e:
        print("Could not determine audio duration:", e)
        return None

def upload_file_to_supabase(file_path, file_name):
    with open(file_path, "rb") as f:
        print(f"Uploading {file_name} to Supabase...")
        res = supabase.storage.from_(STORAGE_BUCKET).upload(file_name, f, {"content-type": "audio/mpeg", "x-upsert": "true"})
        print("Upload complete.")
        return res

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

def save_output(data, filename):
    with open(filename, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Output saved to: {filename}")

def process_file(mp3_file):
    full_path = os.path.join(AUDIO_FOLDER, mp3_file)
    duration = get_audio_duration(full_path)

    try:
        upload_file_to_supabase(full_path, mp3_file)
    except Exception as e:
        print(f"Upload failed: {e}")
        return

    transcript = transcribe_with_whisper(full_path)
    if not transcript:
        return

    analysis = analyze_with_openai(transcript)
    if analysis:
        if not os.path.exists(OUTPUT_FOLDER):
            os.makedirs(OUTPUT_FOLDER)
        out_file = os.path.join(OUTPUT_FOLDER, mp3_file.replace(".mp3", ".json"))
        save_output(analysis, out_file)
        cost = estimate_cost(duration or 60, len(transcript))
        upload_to_supabase_table(mp3_file, analysis, transcript, duration, cost)

def main():
    print(f"Watching folder: {AUDIO_FOLDER}")
    while True:
        mp3s = [f for f in os.listdir(AUDIO_FOLDER) if f.endswith(".mp3")]
        for mp3_file in mp3s:
            if mp3_file not in processed_files:
                print(f"Found new file: {mp3_file}")
                process_file(mp3_file)
                processed_files.add(mp3_file)
        time.sleep(5)

if __name__ == "__main__":
    main()
