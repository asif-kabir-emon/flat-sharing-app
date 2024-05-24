import { baseApi } from "./baseApi";

const USER_URL = "/user";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: `${USER_URL}/me`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetMyProfileQuery } = userApi;
