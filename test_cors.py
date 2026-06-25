import requests

url = "https://parivar-backend.onrender.com/api/v1/menu"
headers = {
    "Origin": "https://parivar-rest.vercel.app",
    "Access-Control-Request-Method": "GET"
}

try:
    response = requests.options(url, headers=headers, timeout=10)
    print("Status Code:", response.status_code)
    print("CORS Headers:", {k: v for k, v in response.headers.items() if 'access-control' in k.lower()})
except Exception as e:
    print("Error:", e)
