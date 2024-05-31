"use client";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import {
    Button,
    Container,
    Grid,
    Stack,
    TablePagination,
    TextField,
} from "@mui/material";
import { useState } from "react";
import FlatCard from "./FlatCard";
import FlatSkeleton from "./FlatSkeleton";
import TuneIcon from "@mui/icons-material/Tune";
import FilterModal from "./FilterModal";
import { useSelector } from "react-redux";
import { selectFlatFilter, TFlatFilter } from "@/redux/slice/flatFilterSlice";
import { useDebounced } from "@/redux/hooks";
import { useRouter } from "next/navigation";

type TProps = {
    isFlatsPage: boolean;
};

const Flats = ({ isFlatsPage }: TProps) => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const currentFlatFilter = useSelector(selectFlatFilter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const query: Record<string, any> = {};
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    query["page"] = page;
    query["limit"] = limit;

    const debounced = useDebounced({ searchQuery: searchTerm, delay: 700 });
    if (!!debounced) {
        if (searchTerm) {
            query["searchTerm"] = searchTerm;
        }
        if (currentFlatFilter && typeof currentFlatFilter === "object") {
            Object.keys(currentFlatFilter).forEach((key) => {
                if (currentFlatFilter[key as keyof TFlatFilter] !== "") {
                    query[key] = Number(
                        currentFlatFilter[key as keyof TFlatFilter]
                    );
                }
            });
        }
    } else {
        if (currentFlatFilter && typeof currentFlatFilter === "object") {
            Object.keys(currentFlatFilter).forEach((key) => {
                if (currentFlatFilter[key as keyof TFlatFilter] !== "") {
                    query[key] = Number(
                        currentFlatFilter[key as keyof TFlatFilter]
                    );
                }
            });
        }
    }

    const { data, isLoading, isFetching } = useGetAllFlatsQuery({
        ...query,
    });

    const flats = data?.data?.data;
    const meta = data?.data?.meta;

    // let pageCount: number;

    // if (meta?.total) {
    //     pageCount = Math.ceil(meta?.total / limit);
    // }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(1);
    };

    return (
        <Container>
            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                justifyContent="space-between"
                gap={2}
                my={3}
            >
                <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    placeholder="Search by location"
                    fullWidth
                    sx={{
                        width: "100%",
                    }}
                />
                <Button
                    startIcon={<TuneIcon />}
                    onClick={() => setIsModalOpen(true)}
                    sx={{
                        textTransform: "capitalize",
                    }}
                >
                    Filters
                </Button>
                <FilterModal open={isModalOpen} setOpen={setIsModalOpen} />
            </Stack>

            <Stack>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mx: "auto",
                        mb: "30px",
                    }}
                >
                    {!isLoading && !isFetching ? (
                        <>
                            {flats.length > 0 && (
                                <>
                                    {flats?.map((flat: any) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={flat.id}
                                        >
                                            <FlatCard flat={flat} />
                                        </Grid>
                                    ))}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={index}
                                >
                                    <FlatSkeleton />
                                </Grid>
                            ))}
                        </>
                    )}
                </Grid>
                {flats?.length === 0 && !isLoading && !isFetching && (
                    <Stack
                        sx={{
                            textAlign: "center",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "text.secondary",
                            borderRadius: "10px",
                            border: "1px solid red",
                            height: "50vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        No flats found
                    </Stack>
                )}
                {isFlatsPage &&
                    flats?.length > 0 &&
                    !isLoading &&
                    !isFetching && (
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{
                                mt: 2,
                            }}
                        >
                            <TablePagination
                                component="div"
                                count={meta?.total}
                                page={page - 1}
                                onPageChange={handleChangePage}
                                rowsPerPage={limit}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Stack>
                    )}
                {!isFlatsPage && (
                    <Stack
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 2,
                        }}
                    >
                        <Button
                            onClick={() => router.push("/flats")}
                            sx={{
                                width: "100%",
                                maxWidth: "200px",
                            }}
                        >
                            View More
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Container>
    );
};

export default Flats;
