import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";

export const userLogin = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    const userInfo = await res.json();

    const accessToken = userInfo?.data?.token;
    const isEmailVerified = userInfo?.data?.isEmailVerified;

    if (userInfo && accessToken && isEmailVerified !== undefined) {
        setAccessToken(accessToken, {
            isEmailVerified,
        });
    }

    return userInfo;
};
