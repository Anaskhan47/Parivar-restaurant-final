import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # We want to import the helper if we need to replace
    needs_import = False
    
    # Replace src={item.image_url || item.img}
    if re.search(r'src=\{([^}]*?\.image_url\b[^}]*?)\}', content):
        content = re.sub(
            r'src=\{([^}]*?)\.image_url\s*\|\|\s*\1\.img\s*(?:\|\|\s*["\']/parivar-logo\.png["\'])?\}',
            r'src={resolveImageUrl(\1.image_url || \1.img, \1.category?.name || "", \1.name)}',
            content
        )
        needs_import = True
        
    # Replace src={addon.image_url || addon.img}
    if re.search(r'src=\{([^}]*?)\.image_url\s*\|\|\s*\1\.img\}', content):
        content = re.sub(
            r'src=\{([^}]*?)\.image_url\s*\|\|\s*\1\.img\}',
            r'src={resolveImageUrl(\1.image_url || \1.img, \1.category?.name || "", \1.name)}',
            content
        )
        needs_import = True

    # For CartDrawer where it's item.image_url || item.img
    if re.search(r'src=\{([^}]*?)\.image_url\s*\|\|\s*\1\.img(?:[^}]*)\}', content):
        content = re.sub(
            r'src=\{([^}]*?)\.image_url\s*\|\|\s*\1\.img(?:[^}]*)\}',
            r'src={resolveImageUrl(\1.image_url || \1.img, \1.category?.name || "", \1.name)}',
            content
        )
        needs_import = True

    if needs_import and 'resolveImageUrl' not in content:
        # Add import at the top
        content = 'import { resolveImageUrl } from "@/utils/imageUrl";\n' + content

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')) and file != 'imageUrl.ts':
            process_file(os.path.join(root, file))
