"use client";
import {
    useGetAllUsersQuery,
    useUpdateUserRoleMutation,
    useUpdateUserStatusMutation,
} from "@/redux/api/userApi";
import {
    Box,
    Container,
    MenuItem,
    Pagination,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VerifiedIcon from "@mui/icons-material/Verified";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { toast } from "sonner";
import Progress from "@/components/UI/Progress/Progress";

const Role = [
    {
        value: "USER",
        label: "USER",
    },
    {
        value: "ADMIN",
        label: "ADMIN",
    },
];

const Activity = [
    {
        value: true,
        label: "Active",
    },
    {
        value: false,
        label: "Inactive",
    },
];

const UserListPage = () => {
    const query: Record<string, any> = {};
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    query["page"] = page;
    query["limit"] = limit;
    query["searchTerm"] = searchTerm;

    const debounced = useDebounced({ searchQuery: searchTerm, delay: 600 });
    if (!!debounced) {
        query["searchTerm"] = searchTerm;
    }

    const { data, isLoading } = useGetAllUsersQuery({
        ...query,
    });
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [updateUserStatus] = useUpdateUserStatusMutation();

    const userData = data?.data?.data || [];
    const metaData = data?.data?.meta || {};

    let pageCount: number;

    if (metaData?.total) {
        pageCount = Math.ceil(metaData?.total / limit);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const updateRole = async (id: string, role: string) => {
        const payload = {
            id,
            body: {
                role,
            },
        };
        try {
            const res = await updateUserRole(payload).unwrap();

            if (res?.success) {
                toast.success("Role updated successfully!");
            } else {
                throw new Error("Failed to update user role");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update user role");
        }
    };

    const updateStatus = async (id: string, isActive: boolean) => {
        const payload = {
            id,
            body: {
                isActive,
            },
        };
        try {
            const res = await updateUserStatus(payload).unwrap();

            if (res?.success) {
                toast.success("Status updated successfully!");
            } else {
                throw new Error("Failed to update user status");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update user status");
        }
    };

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 150,
            renderCell: ({ row }) => {
                return <Box>{row?.userProfile?.name || ""}</Box>;
            },
        },
        { field: "email", headerName: "Email", flex: 2, minWidth: 200 },
        {
            field: "Verified",
            headerName: "Verified",
            flex: 1,
            minWidth: 80,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <Box>
                        {row?.isVerified ? <VerifiedIcon /> : <GppMaybeIcon />}
                    </Box>
                );
            },
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 120,
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <TextField
                            select
                            size="small"
                            value={row?.isActive}
                            onChange={(e) =>
                                updateStatus(row?.id, Boolean(e.target.value))
                            }
                            sx={{
                                width: "100%",
                                maxWidth: "105px",
                                minWidth: "105px",
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: row?.isActive
                                            ? "green"
                                            : "red",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: row?.isActive
                                            ? "green"
                                            : "red",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: row?.isActive
                                            ? "green"
                                            : "red",
                                    },
                                },
                            }}
                        >
                            {Activity.map((option) => (
                                // @ts-ignore
                                <MenuItem
                                    key={String(option.value)}
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
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            minWidth: 120,
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <TextField
                            select
                            size="small"
                            value={row?.role}
                            onChange={(e) =>
                                updateRole(row?.id, e.target.value)
                            }
                            sx={{
                                width: "100%",
                                maxWidth: "100px",
                                minWidth: "100px",
                            }}
                        >
                            {Role.map((option) => (
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
        <Container
            sx={{
                width: "100%",
                overflow: "hidden",
            }}
        >
            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                justifyContent="space-between"
                gap={2}
                my={2}
            >
                <Typography variant="h4">Users List</Typography>
                <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    placeholder="Search by name or email"
                    fullWidth
                    sx={{
                        width: "100%",
                        maxWidth: "400px",
                    }}
                />
            </Stack>
            {!isLoading ? (
                <Box
                    my={2}
                    sx={{ maxHeight: 600, width: "100%", overflow: "auto" }}
                >
                    <DataGrid
                        rows={userData || []}
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
                <>
                    <Progress />
                </>
            )}
        </Container>
    );
};

export default UserListPage;
