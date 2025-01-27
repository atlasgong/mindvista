/**
 * Validates a URL string with optional protocol
 * Allows:
 * - Optional protocol (http/https)
 * - Domains with hyphens
 * - Subdomains
 * - Path segments with special chars
 * - Query params and fragments
 * - Port numbers
 */
export function validateURL(value: string | null | undefined): true | string {
    if (!value) return true;

    // URL regex that makes protocol optional
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(:\d+)?(\/[-\w\._~:/?#\[\]@!$&'\(\)\*\+,;=\%]*)?$/i;

    if (!urlRegex.test(value)) {
        return "Please provide a valid URL.";
    }
    return true;
}

/**
 * Validates a URL string and ensures it has http/https protocol
 * First checks if the URL starts with http:// or https://
 * Then validates the rest of the URL structure
 */
export function validateURLWithProtocol(value: string | null | undefined): true | string {
    if (!value) return true;

    // First check for http/https protocol
    const protocolRegex = /^https?:\/\//i;
    if (!protocolRegex.test(value)) {
        return "URL must start with http:// or https://";
    }

    // Then validate full URL structure
    const urlRegex = /^https?:\/\/([\w-]+\.)+[a-z]{2,}(:\d+)?(\/[-\w\._~:/?#\[\]@!$&'\(\)\*\+,;=\%]*)?$/i;
    if (!urlRegex.test(value)) {
        return "Please provide a valid URL";
    }
    return true;
}

/**
 * Validates an Instagram URL
 * Allows:
 * - Optional protocol (http/https)
 * - Optional www
 * - Instagram.com domain
 * - Username and optional path
 */
export function validateInstagramURL(value: string | null | undefined): true | string {
    if (!value) return true;

    const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._%+-]+\/?.*$/;
    if (!instagramRegex.test(value)) {
        return "Please provide a valid Instagram URL.";
    }
    return true;
}

/**
 * Validates a Facebook URL
 * Allows:
 * - Optional protocol (http/https)
 * - Optional www
 * - facebook.com or fb.com domain
 * - Username/page name and optional path
 */
export function validateFacebookURL(value: string | null | undefined): true | string {
    if (!value) return true;

    const facebookRegex = /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/[A-Za-z0-9._%+-]+\/?.*$/;
    if (!facebookRegex.test(value)) {
        return "Please provide a valid Facebook URL.";
    }
    return true;
}
