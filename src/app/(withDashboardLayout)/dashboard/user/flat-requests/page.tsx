"use client";
import Progress from "@/components/UI/Progress/Progress";
import {
    useGetBookingRequestsQuery,
    useUpdateBookingStatusMutation,
} from "@/redux/api/bookingApi";
import { Box, Container, MenuItem, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";

const BookingStatus = [
    {
        value: "PENDING",
        label: "PENDING",
    },

    {
        value: "BOOKED",
        label: "BOOKED",
    },
    {
        value: "REJECTED",
        label: "REJECTED",
    },
];

const FlatRequestsPage = () => {
    const [updateBookingStatus] = useUpdateBookingStatusMutation();
    const { data, isLoading } = useGetBookingRequestsQuery({});
    const bookingRequests = data?.data || [];

    const updateStatus = async (flatId: string, status: string) => {
        try {
            const res = await updateBookingStatus({
                id: flatId,
                data: { status },
            }).unwrap();

            if (res?.success) {
                toast.success("Status updated successfully");
            } else {
                throw new Error(res?.message || "Failed to update status");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        }
    };

    const columns: GridColDef[] = [
        { field: "flatId", headerName: "FlatID", flex: 1, minWidth: 200 },
        {
            field: "flatLocation",
            headerName: "Flat Location",
            flex: 1,
            minWidth: 200,
            renderCell: ({ row }) => {
                return `${row?.flat?.location}`;
            },
        },
        // {
        //     field: "name",
        //     headerName: "Name",
        //     flex: 1,
        //     minWidth: 150,
        //     renderCell: ({ row }) => {
        //         return `${row?.user?.userProfile?.name}`;
        //     },
        // },
        // {
        //     field: "email",
        //     headerName: "Email",
        //     flex: 1,
        //     minWidth: 150,
        //     renderCell: ({ row }) => {
        //         return `${row?.user?.email}`;
        //     },
        // },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <TextField
                            select
                            size="small"
                            value={row?.status}
                            disabled={row?.status !== "PENDING" ? true : false}
                            onChange={(e) =>
                                updateStatus(row?.id, e.target.value as string)
                            }
                            sx={{
                                width: "100%",
                                maxWidth: "150px",
                                minWidth: "150px",

                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor:
                                            row?.status === "PENDING"
                                                ? "blue"
                                                : row?.status === "BOOKED"
                                                ? "green"
                                                : "red",
                                    },
                                    "&:hover fieldset": {
                                        borderColor:
                                            row?.status === "PENDING"
                                                ? "blue"
                                                : row?.status === "BOOKED"
                                                ? "green"
                                                : "red",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor:
                                            row?.status === "PENDING"
                                                ? "blue"
                                                : row?.status === "BOOKED"
                                                ? "green"
                                                : "red",
                                    },
                                },
                            }}
                        >
                            {BookingStatus.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                );
            },
        },
    ];

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0",
                }}
            >
                <Typography variant="h5">Booking Requests</Typography>
            </Box>
            {!isLoading ? (
                <Box style={{ width: "100%" }}>
                    <DataGrid
                        rows={bookingRequests || []}
                        columns={columns || []}
                        hideFooter
                    />
                </Box>
            ) : (
                <>
                    <Progress />
                </>
            )}
        </Container>
    );
};

export default FlatRequestsPage;
