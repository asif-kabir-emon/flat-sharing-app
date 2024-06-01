"use client";
import {
    useDeleteSingleFlatMutation,
    useGetMyFlatsQuery,
} from "@/redux/api/flatApi";
import {
    Avatar,
    Box,
    Button,
    Container,
    Pagination,
    Stack,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import AddIcon from "@mui/icons-material/Add";
import AddFlatModal from "./components/AddFlatModal";
import Progress from "@/components/UI/Progress/Progress";

const MyFlatsPage = () => {
    const router = useRouter();
    const [isAddFlatModalOpen, setIsAddFlatModalOpen] =
        useState<boolean>(false);

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
                        <Avatar
                            src={row?.photos[0] || "Flat Image"}
                            alt="flat-image"
                            variant="square"
                            sx={{ width: 32, height: 32, borderRadius: "5px" }}
                        />
                    </Box>
                );
            },
        },
        { field: "location", headerName: "Location", minWidth: 300, flex: 1 },
        {
            field: "totalBedrooms",
            headerName: "Total Bedrooms",
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
                                router.push(`/flats/${row.id}`);
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
                                    `/dashboard/user/my-flats/edit/${row.id}`
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
            <Stack
                spacing={2}
                direction="row"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" my={3}>
                    My Flats List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddFlatModalOpen(true)}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    Add Flat
                </Button>
                <AddFlatModal
                    open={isAddFlatModalOpen}
                    setOpen={setIsAddFlatModalOpen}
                />
            </Stack>
            {!isLoading ? (
                <Box
                    my={2}
                    sx={{ maxHeight: 600, width: "100%", overflow: "auto" }}
                >
                    {flatData?.length ? (
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
                    ) : (
                        <Typography
                            variant="body1"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100px",
                                width: "100%",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        >
                            No flats found
                        </Typography>
                    )}
                </Box>
            ) : (
                <>
                    <Progress />
                </>
            )}
        </Container>
    );
};

export default MyFlatsPage;
