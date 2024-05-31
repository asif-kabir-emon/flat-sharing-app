import FSForm from "@/components/Form/FSForm";
import FSInput from "@/components/Form/FSInput";
import FSResetButton from "@/components/Form/FSResetButton";
import FSModal from "@/components/UI/Modal/FSModal";
import {
    selectFlatFilter,
    setFlatFilter,
    TFlatFilter,
} from "@/redux/slice/flatFilterSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterModal = ({ open, setOpen }: TProps) => {
    const dispatch = useDispatch();
    const currentFlatFilter = useSelector(selectFlatFilter);

    const [defaultValues, setDefaultValues] = useState({
        minRent: "",
        maxRent: "",
        minBedrooms: "",
        maxBedrooms: "",
    });

    useEffect(() => {
        if (open) {
            setDefaultValues(currentFlatFilter);
        }
    }, [open, currentFlatFilter]);

    const handleFormSubmit = async (values: FieldValues) => {
        try {
            dispatch(setFlatFilter(values as TFlatFilter));
            setOpen(false);
        } catch (error: any) {
            console.log(error);
        }
    };

    const handleReset = () => {
        const values = {
            minRent: "",
            maxRent: "",
            minBedrooms: "",
            maxBedrooms: "",
        };
        dispatch(setFlatFilter(values as TFlatFilter));
        setDefaultValues(values);
    };

    return (
        <>
            <FSModal title="Filters" open={open} setOpen={setOpen}>
                <FSForm
                    onSubmit={handleFormSubmit}
                    defaultValues={defaultValues}
                >
                    <Box
                        sx={{
                            mb: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                mb: 1,
                            }}
                        >
                            Filter by Price
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <FSInput
                                name="minRent"
                                label="Min Rent"
                                fullWidth={true}
                            />
                            <FSInput
                                name="maxRent"
                                label="Max Rent"
                                fullWidth={true}
                            />
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            mb: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                mb: 1,
                            }}
                        >
                            Filter by Bed Room
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <FSInput
                                name="minBedrooms"
                                label="Min Bedroom"
                                fullWidth={true}
                            />
                            <FSInput
                                name="maxBedrooms"
                                label="Max Bedroom"
                                fullWidth={true}
                            />
                        </Stack>
                    </Box>

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        justifyContent="flex-end"
                        spacing={2}
                        sx={{
                            borderTop: "1px solid #E0E0E0",
                            paddingTop: 2,
                        }}
                    >
                        <FSResetButton onReset={handleReset} />
                        <Button
                            type="submit"
                            sx={{
                                textTransform: "capitalize",
                                color: "white",
                            }}
                        >
                            Apply
                        </Button>
                    </Stack>
                </FSForm>
            </FSModal>
        </>
    );
};

export default FilterModal;
