"use client";
import {
    useDeleteSingleFlatMutation,
    useGetMyFlatsQuery,
} from "@/redux/api/flatApi";
import { Box, Button, Container, Pagination, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

const MyFlatsPage = () => {
    const router = useRouter();

    const query: Record<string, any> = {};
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    query["page"] = page;
    query["limit"] = limit;

    const { data, isLoading } = useGetMyFlatsQuery({
        ...query,
    });
    const [deleteSingleFlat] = useDeleteSingleFlatMutation();

    const flatData = data?.data?.data || [];
    const metaData = data?.data?.meta || {};

    let pageCount: number;

    if (metaData?.total) {
        pageCount = Math.ceil(metaData?.total / limit);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleFlatDelete = async (id: string) => {
        console.log(id);
        try {
            const res = await deleteSingleFlat(id).unwrap();

            if (res?.success) {
                toast.success("Flat deleted successfully");
            } else {
                throw new Error("Failed to delete flat");
            }
        } catch (error: any) {
            toast.error(error?.message || "Failed to delete flat");
        }
    };

    const columns: GridColDef[] = [
        {
            field: "photos",
            headerName: "Photo",
            minWidth: 100,
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box>
                        {row?.photos.length ? (
                            <Image
                                src={row?.photos?.[0]}
                                alt="flat"
                                width={100}
                                height={100}
                            />
                        ) : (
                            <ImageIcon width={100} height={100} />
                        )}
                    </Box>
                );
            },
        },
        { field: "location", headerName: "Location", minWidth: 300, flex: 1 },
        {
            field: "totalRooms",
            headerName: "Total Rooms",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "rent",
            headerName: "Rent",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Action",
            minWidth: 300,
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            gap: "8px",
                        }}
                    >
                        <Button
                            onClick={() => {
                                router.push(
                                    `/dashboard/user/my-flats/${row.id}`
                                );
                            }}
                            sx={{
                                color: "white",
                            }}
                        >
                            View
                        </Button>
                        <Button
                            disabled={row?.availability === false}
                            color="secondary"
                            onClick={() => {
                                router.push(
                                    `/dashboard/user/my-flats/${row.id}/edit`
                                );
                            }}
                        >
                            <EditIcon />
                        </Button>
                        <Button
                            disabled={row?.availability === false}
                            color="error"
                            onClick={() => {
                                handleFlatDelete(row.id);
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Container
            sx={{
                width: "100%",
                overflow: "hidden",
            }}
        >
            <Typography variant="h5" my={3}>
                My Flats List
            </Typography>
            {!isLoading ? (
                <Box
                    my={2}
                    sx={{ maxHeight: 600, width: "100%", overflow: "auto" }}
                >
                    <DataGrid
                        rows={flatData || []}
                        columns={columns || []}
                        loading={isLoading}
                        hideFooterPagination
                        slots={{
                            footer: () => {
                                return (
                                    <Box
                                        sx={{
                                            my: 2,
                                            mx: "auto",
                                        }}
                                    >
                                        <Pagination
                                            count={pageCount}
                                            page={page}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    </Box>
                                );
                            },
                        }}
                    />
                </Box>
            ) : (
                <Box>Loading...</Box>
            )}
        </Container>
    );
};

export default MyFlatsPage;
