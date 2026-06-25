export function resolveImageUrl(url?: string, categoryName?: string, itemName?: string): string {
    if (!url) return '/parivar-logo.png';
    
    // Fix database images that point to localhost or default logo
    if (url.includes('/src/assets/parivar-logo') || url.includes('localhost:8000')) {
        if (categoryName && itemName) {
            const cleanCat = categoryName === 'Entrée' ? 'Entree' : categoryName;
            return `/menu-images/${cleanCat}/${itemName.toLowerCase()}.png`;
        }
        return '/parivar-logo.png';
    }
    
    // Fix uploaded images that might be relative
    if (url.startsWith('/uploads')) {
        return (import.meta.env.VITE_API_URL || '') + url;
    }
    
    return url;
}
