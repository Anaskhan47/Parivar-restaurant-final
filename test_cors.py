import requests

url = "https://parivar-backend.onrender.com/"

try:
    response = requests.get(url, timeout=10)
    print("Status Code:", response.status_code)
    print("Body:", response.text)
except Exception as e:
    print("Error:", e)
