#!/usr/bin/env python3
import os
import json
import urllib.request
import re
from datetime import datetime

WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxDCHUE8sx7QxCZe7c4LKZZ6f7RRykXUvLleGtwkyTGc-j5Ab9oOpuMDbpg1JDXGBemhg/exec"

def fetch_feedback():
    # Cache buster to bypass CDN/Google cache
    url = f"{WEB_APP_URL}?cb={int(datetime.now().timestamp())}"
    print(f"Pobieranie opinii z Google Sheets...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            return json.loads(response.read().decode('utf-8'))
        else:
            raise Exception(f"Błąd HTTP: {response.status}")

def sync():
    try:
        data = fetch_feedback()
    except Exception as e:
        print(f"Nie udało się pobrać danych: {e}")
        return

    # Group feedback by target news date
    feedback_by_date = {}

    for entry in data:
        title = entry.get('newsTitle', '')
        vote = entry.get('vote', 'NONE')
        comment = entry.get('comment', '').strip()
        timestamp = entry.get('timestamp', '')

        # Try to extract date from prepended title format [YYYY-MM-DD] Title
        match = re.match(r'^\[(\d{4}-\d{2}-\d{2})\]\s*(.*)$', title)
        if match:
            date_str = match.group(1)
            clean_title = match.group(2)
        else:
            # Fallback to timestamp date
            clean_title = title
            try:
                # E.g. 2026-07-28T19:48:42.000Z
                date_str = timestamp.split('T')[0]
            except Exception:
                continue

        if not date_str:
            continue

        if date_str not in feedback_by_date:
            feedback_by_date[date_str] = []

        feedback_by_date[date_str].append({
            'title': clean_title,
            'vote': vote,
            'comment': comment
        })

    # Update journal files
    for date_str, feedbacks in feedback_by_date.items():
        file_path = f"journal/{date_str}.md"
        if not os.path.exists(file_path):
            print(f"Plik {file_path} nie istnieje w journal. Pomijam.")
            continue

        # Format the feedback markdown section
        feedback_md = "\n## Wasze Oceny i Komentarze\n"
        for fb in feedbacks:
            # Format comment if present
            comment_part = f" | Komentarz: *{fb['comment']}*" if fb['comment'] else ""
            feedback_md += f"*   **{fb['title']}** | Ocena: `{fb['vote']}`{comment_part}\n"

        # Read existing file content
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Strip any existing feedback section to prevent duplication
        if "## Wasze Oceny i Komentarze" in content:
            content = content.split("## Wasze Oceny i Komentarze")[0].strip()
        else:
            content = content.strip()

        # Append new feedback section
        new_content = content + "\n\n" + feedback_md.strip() + "\n"

        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Zaktualizowano feedback w {file_path} ✓")

if __name__ == "__main__":
    # Ensure working directory is repo root if executed directly
    repo_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(repo_dir)
    sync()
