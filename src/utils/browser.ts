export function getCookie(key: string) {
    const regex = new RegExp(`(?:^|;\\s*)${key}\\s*=\\s*([^;]*)`);
    const match = document.cookie.match(regex);
    return match ? match[1] : undefined;
}

export function setCookie(key: string, value: string) {
    document.cookie = `${key}=${value};`;
}

export function generateUUID() {
    // Public Domain/MIT
    let d = new Date().getTime(); // Timestamp
    let d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0; // Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        let r = Math.random() * 16; // random number between 0 and 16
        if (d > 0) {
            // Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            // Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
}

export function generateFingerprint() {
    let visitorId = window.localStorage.getItem("visitorId");
    if (!visitorId) {
        visitorId = generateUUID();
        window.localStorage.setItem("visitorId", visitorId);
    }
    return visitorId;
}
