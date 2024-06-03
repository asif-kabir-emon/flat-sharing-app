export const setToLocalStorage = (key: string, token: string): void => {
    if (!key || typeof window === "undefined") {
        return;
    }

    try {
        localStorage.setItem(key, token);
    } catch (e) {
        console.error("Error setting to localStorage", e);
    }
};

export const getFromLocalStorage = (key: string): string | null => {
    if (!key || typeof window === "undefined") {
        return null;
    }

    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.error("Error getting from localStorage", e);
        return null;
    }
};

export const removeFromLocalStorage = (key: string): void => {
    if (!key || typeof window === "undefined") {
        return;
    }

    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error("Error removing from localStorage", e);
    }
};
