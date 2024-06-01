import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const FLAT_URL = "/flats";

const flatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addFlat: builder.mutation({
            query: (data) => ({
                url: `${FLAT_URL}/add-flat`,
                method: "POST",
                contentType: "multipart/form-data",
                data,
            }),
            invalidatesTags: [TagTypes.flat],
        }),
        getMyFlats: builder.query({
            query: (arg: Record<string, any>) => ({
                url: `${FLAT_URL}/my-flats`,
                method: "GET",
                params: arg,
            }),
            providesTags: [TagTypes.flat],
        }),
        deleteSingleFlat: builder.mutation({
            query: (id: string) => ({
                url: `${FLAT_URL}/delete-flat/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TagTypes.flat],
        }),
        getAllFlats: builder.query({
            query: (arg: Record<string, any>) => ({
                url: `${FLAT_URL}/get-all-flats`,
                method: "GET",
                params: arg,
            }),
            providesTags: [TagTypes.flat],
        }),
        getFlatById: builder.query({
            query: (id: string) => ({
                url: `${FLAT_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [TagTypes.flat],
        }),
        updateFlat: builder.mutation({
            query: (data: any) => ({
                url: `${FLAT_URL}/update-flat/${data.id}`,
                method: "PUT",
                data: data.body,
            }),
            invalidatesTags: [TagTypes.flat],
        }),
    }),
});

export const {
    useGetMyFlatsQuery,
    useDeleteSingleFlatMutation,
    useGetAllFlatsQuery,
    useGetFlatByIdQuery,
    useAddFlatMutation,
    useUpdateFlatMutation,
} = flatApi;
