import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendOtpInEmail: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/send-verification-email`,
                method: "POST",
                data,
            }),
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/verify-email`,
                method: "POST",
                data,
            }),
        }),
    }),
});

export const { useSendOtpInEmailMutation, useVerifyEmailMutation } = authApi;
