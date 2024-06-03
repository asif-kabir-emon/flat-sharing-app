export const setToLocalStorage = (key: string, token: string) => {
    if (typeof window === "undefined" || !key) {
        return "";
    }

    localStorage.setItem(key, token);
    return token; // Optionally return the token for confirmation
};

export const getFromLocalStorage = (key: string) => {
    if (typeof window === "undefined" || !key) {
        return "";
    }

    return localStorage.getItem(key) || "";
};

export const removeFromLocalStorage = (key: string) => {
    if (typeof window === "undefined" || !key) {
        return "";
    }

    localStorage.removeItem(key);
    return ""; // Optionally return a confirmation message or status
};
