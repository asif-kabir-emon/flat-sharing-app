import { TagTypes } from "../tagTypes";
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
        getAllUsers: builder.query({
            query: (arg: Record<string, any>) => ({
                url: `${USER_URL}`,
                method: "GET",
                params: arg,
            }),
            providesTags: [TagTypes.user],
        }),
        updateUserRole: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/role/${data.id}`,
                method: "PUT",
                data: data.body,
            }),
            invalidatesTags: [TagTypes.user],
        }),
        updateUserStatus: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/status/${data.id}`,
                method: "PUT",
                data: data.body,
            }),
            invalidatesTags: [TagTypes.user],
        }),
        changeEmail: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-email`,
                method: "PUT",
                data,
            }),
        }),
    }),
});

export const {
    useGetMyProfileQuery,
    useGetAllUsersQuery,
    useUpdateUserRoleMutation,
    useUpdateUserStatusMutation,
    useChangeEmailMutation,
} = userApi;
