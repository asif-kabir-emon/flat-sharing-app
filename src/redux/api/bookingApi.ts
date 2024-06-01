import { TagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/bookings";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => ({
                url: `${BOOKING_URL}/booking-application`,
                method: "POST",
                data,
            }),
            invalidatesTags: [TagTypes.booking, TagTypes.flat],
        }),
        getBookingRequests: builder.query({
            query: () => ({
                url: `${BOOKING_URL}/booking-requests`,
                method: "GET",
            }),
            providesTags: [TagTypes.booking],
        }),
        updateBookingStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `${BOOKING_URL}/booking-requests/${id}`,
                method: "PUT",
                data,
            }),
            invalidatesTags: [TagTypes.booking, TagTypes.flat],
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetBookingRequestsQuery,
    useUpdateBookingStatusMutation,
} = bookingApi;
