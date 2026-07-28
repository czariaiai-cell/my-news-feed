import urllib.request
import json
import os

url = "https://script.google.com/macros/s/AKfycbxDCHUE8sx7QxCZe7c4LKZZ6f7RRykXUvLleGtwkyTGc-j5Ab9oOpuMDbpg1JDXGBemhg/exec?cb=999"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    
    os.makedirs('journal', exist_ok=True)
    with open('journal/2026-07-28.md', 'w', encoding='utf-8') as f:
        f.write("---\ndate: 2026-07-28\ntype: feedback\n---\n\n")
        f.write("# Feedback z dnia 2026-07-28\n\n")
        for item in data:
            f.write(f"- **Title:** {item.get('newsTitle')}\n")
            f.write(f"  **Vote:** {item.get('vote')}\n")
            f.write(f"  **Comment:** {item.get('comment')}\n\n")
    print("SUCCESS")
except Exception as e:
    print(f"ERROR: {e}")
