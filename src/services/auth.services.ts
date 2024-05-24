import { authKey } from "@/constants/authKey";
import { getFromLocalStorage } from "@/utils/localStorage";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);

    return !!authToken;
};

export const generateNewAccessToken = async () => {
    return await axiosInstance({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
};

export const sendOtpInEmail = async () => {
    return await axiosInstance({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/send-verification-email`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
};
