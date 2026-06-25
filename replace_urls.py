import os

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'http://localhost:8000' not in content and 'ws://localhost:8000' not in content:
        return False
        
    # Replace template literals
    content = content.replace('`http://localhost:8000', '`${import.meta.env.VITE_API_URL || "http://localhost:8000"}')
    content = content.replace('`ws://localhost:8000', '`${import.meta.env.VITE_WS_URL || "ws://localhost:8000"}')
    
    # Replace double quotes (string concatenation)
    content = content.replace('"http://localhost:8000', '(import.meta.env.VITE_API_URL || "http://localhost:8000") + "')
    content = content.replace('"ws://localhost:8000', '(import.meta.env.VITE_WS_URL || "ws://localhost:8000") + "')

    # Replace single quotes (string concatenation)
    content = content.replace("'http://localhost:8000", "(import.meta.env.VITE_API_URL || 'http://localhost:8000') + '")
    content = content.replace("'ws://localhost:8000", "(import.meta.env.VITE_WS_URL || 'ws://localhost:8000') + '")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    return True

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            filepath = os.path.join(root, file)
            if process_file(filepath):
                print(f"Updated {filepath}")
