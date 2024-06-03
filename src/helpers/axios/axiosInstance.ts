import { authKey } from "@/constants/authKey";
import setAccessToken from "@/services/actions/setAccessToken";
import { generateNewAccessToken } from "@/services/auth.services";
import { IGenericErrorResponse } from "@/types";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem(authKey);
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }

        return config;
    },
    function (error) {
        console.error(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    // @ts-ignore
    function (response) {
        return response;
    },
    async function (error) {
        const config = error.config;
        if (
            (error?.response?.status === 400 ||
                error?.response?.status === 401) &&
            !config.sent
        ) {
            config.sent = true;
            const response = await generateNewAccessToken();
            const accessToken = response?.data?.data?.accessToken;
            config.headers.Authorization = accessToken;

            localStorage.setItem(authKey, accessToken);
            setAccessToken(accessToken);

            return instance(config);
        } else {
            const responseObj: IGenericErrorResponse = {
                statusCode: error?.response?.data?.statusCode || 500,
                message:
                    error?.response?.data?.message || "Something went wrong!!!",
                errorMessages: error?.response?.data?.message,
            };

            return responseObj;
        }
    }
);

export { instance };
