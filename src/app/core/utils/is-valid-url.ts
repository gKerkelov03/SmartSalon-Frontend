export function isValidUrl(url: string | null | undefined): boolean {
    if (!url) {
        return false;
    }

    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
