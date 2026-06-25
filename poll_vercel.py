import time
import requests

url = "https://parivar-rest.vercel.app/api/v1/menu"
print(f"Polling {url}...")

for i in range(15):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            print("\nSUCCESS! Vercel backend is fully deployed.")
            print("Response:", response.text[:200])
            break
        else:
            print(f"Status: {response.status_code}. Waiting 10s...")
            time.sleep(10)
    except Exception as e:
        print("Error:", e)
        time.sleep(10)
