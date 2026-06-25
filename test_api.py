import urllib.request
import urllib.error

urls = [
    "https://parivar-rest.vercel.app/api/index",
    "https://parivar-rest.vercel.app/api/backend/app/main",
    "https://parivar-rest.vercel.app/api/index.py"
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            body = response.read().decode('utf-8')
            print(f"URL: {url} - Status Code: {response.getcode()}")
            print(f"Body preview: {body[:200]}\n")
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        print(f"URL: {url} - Status Code: {e.code}")
        print(f"Body preview: {body[:200]}\n")
    except Exception as e:
        print(f"URL: {url} - Error: {e}\n")
