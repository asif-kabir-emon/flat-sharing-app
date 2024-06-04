import { authKey } from "@/constants/authKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwtDecode";
import { getFromLocalStorage } from "@/utils/localStorage";

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

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);

    if (authToken) {
        const decodedData: any = decodedToken(authToken);
        return {
            ...decodedData,
            role: decodedData?.role?.toLowerCase(),
        };
    }
};
