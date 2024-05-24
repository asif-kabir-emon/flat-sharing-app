"use server";

import { authKey } from "@/constants/authKey";
import { cookies } from "next/headers";

const setAccessToken = (accessToken: string, option?: any) => {
    cookies().set(authKey, accessToken);
};

export default setAccessToken;
