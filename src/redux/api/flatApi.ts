import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const USER_URL = "/flats";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyFlats: builder.query({
            query: (arg: Record<string, any>) => ({
                url: `${USER_URL}/my-flats`,
                method: "GET",
                params: arg,
            }),
            providesTags: [TagTypes.flat],
        }),
        deleteSingleFlat: builder.mutation({
            query: (id: string) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TagTypes.flat],
        }),
        getAllFlats: builder.query({
            query: (arg: Record<string, any>) => ({
                url: `${USER_URL}`,
                method: "GET",
                params: arg,
            }),
            providesTags: [TagTypes.flat],
        }),
    }),
});

export const {
    useGetMyFlatsQuery,
    useDeleteSingleFlatMutation,
    useGetAllFlatsQuery,
} = userApi;
