"use client";
import FSForm from "@/components/Form/FSForm";
import FSInput from "@/components/Form/FSInput";
import FSMultiLineInput from "@/components/Form/FSMultiLineInput";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const BookingPage = () => {
    const router = useRouter();
    const { flatId } = useParams();
    const [createBooking] = useCreateBookingMutation();

    const handleSubmit = async (data: FieldValues) => {
        try {
            const res = await createBooking({
                flatId: flatId,
                ...data,
            }).unwrap();

            if (res?.success) {
                toast.success("Flat booked successfully.");
                router.push("/flats");
            } else {
                throw new Error(res?.message || "Failed to book flat.");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to book flat.");
        }
    };
    return (
        <Container
            sx={{
                margin: "20px auto",
                padding: "20px",
            }}
        >
            <Box
                sx={{
                    border: "2px solid #f6f6f6",
                    borderRadius: "5px",
                    padding: "20px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box
                    sx={{
                        margin: "20px 0",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h4">Book Flat</Typography>
                </Box>
                <FSForm onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FSInput
                                type="text"
                                name="contactNumber"
                                label="Contact Number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FSMultiLineInput name="message" label="Message" />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        sx={{
                            my: 2,
                        }}
                    >
                        Book Now
                    </Button>
                </FSForm>
            </Box>
        </Container>
    );
};

export default BookingPage;
