"use client";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import FlatCard from "./components/FlatCard";
import FlatSkeleton from "./components/FlatSkeleton";
import TuneIcon from "@mui/icons-material/Tune";
import FilterModal from "./components/FilterModal";
import { useSelector } from "react-redux";
import { selectFlatFilter, TFlatFilter } from "@/redux/slice/flatFilterSlice";
import { useDebounced } from "@/redux/hooks";

const FlatsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const currentFlatFilter = useSelector(selectFlatFilter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const query: Record<string, any> = {};
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
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

    let pageCount: number;

    if (meta?.total) {
        pageCount = Math.ceil(meta?.total / limit);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
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
                px={2}
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
            </Stack>
        </Container>
    );
};

export default FlatsPage;
