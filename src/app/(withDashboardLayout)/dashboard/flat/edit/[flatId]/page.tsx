"use client";
import FSForm from "@/components/Form/FSForm";
import FSInput from "@/components/Form/FSInput";
import FSMultiLineInput from "@/components/Form/FSMultiLineInput";
import Progress from "@/components/UI/Progress/Progress";
import { authKey } from "@/constants/authKey";
import {
    useGetFlatByIdQuery,
    useUpdateFlatMutation,
} from "@/redux/api/flatApi";
import { getFromLocalStorage } from "@/utils/localStorage";
import { Box, Button, Container, Grid } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useParams, useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const EditFlatPage = () => {
    const { flatId } = useParams();
    const router = useRouter();
    const token = getFromLocalStorage(authKey);
    const decodedToken = jwtDecode(token as string) as any;

    const [UpdateFlat] = useUpdateFlatMutation();

    const { data, isLoading } = useGetFlatByIdQuery(flatId as string);
    const flat = data?.data;

    const handleSubmit = async (values: FieldValues) => {
        values.totalBedrooms = parseInt(values.totalBedrooms);
        values.totalRooms = parseInt(values.totalRooms);
        values.squareFeet = Number(values.squareFeet);
        values.rent = Number(values.rent);
        values.advanceAmount = Number(values.advanceAmount);

        const payload = {
            id: flatId,
            body: values,
        };

        try {
            const res = await UpdateFlat(payload).unwrap();

            if (res?.success) {
                toast.success("Flat updated successfully");
                if (decodedToken.role === "USER") {
                    router.push("/dashboard/user/my-flats");
                } else {
                    router.push("/dashboard/admin/flats");
                }
            } else {
                throw new Error("Failed to update flat");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update flat");
        }
    };

    return (
        <Container>
            {!isLoading ? (
                <Box>
                    <FSForm onSubmit={handleSubmit} defaultValues={flat}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <FSInput
                                    name="squareFeet"
                                    label="Square Feet"
                                    type="number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <FSInput
                                    name="totalRooms"
                                    label="Total Rooms"
                                    type="number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <FSInput
                                    name="totalBedrooms"
                                    label="Total Bedrooms"
                                    type="number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <FSInput
                                    name="rent"
                                    label="Rent"
                                    type="number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <FSInput
                                    name="advanceAmount"
                                    label="Advance Amount"
                                    type="number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <FSInput
                                    name="location"
                                    label="Location"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FSMultiLineInput
                                    name="utilitiesDescription"
                                    label="Utilities Description"
                                    rows={3}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FSMultiLineInput
                                    name="description"
                                    label="Description"
                                    rows={5}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "16px",
                            }}
                        >
                            <Button type="submit">Update Flat Info</Button>
                        </Box>
                    </FSForm>
                </Box>
            ) : (
                <>
                    <Progress />
                </>
            )}
        </Container>
    );
};

export default EditFlatPage;
