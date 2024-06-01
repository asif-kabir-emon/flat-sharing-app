import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import BedIcon from "@mui/icons-material/Bed";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SellIcon from "@mui/icons-material/Sell";
import { useRouter } from "next/navigation";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { toast } from "sonner";

const FlatCard = ({ flat }: any) => {
    const router = useRouter();
    const [createBooking] = useCreateBookingMutation();

    const bookingFlat = async () => {
        try {
            const res = await createBooking({
                flatId: flat?.id,
            }).unwrap();

            if (res?.success) {
                toast.success("Flat booked successfully.");
            } else {
                throw new Error(res?.message || "Failed to book flat.");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to book flat.");
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                {flat?.photos.length > 0 ? (
                    <CardMedia
                        component="img"
                        image={flat?.photos?.[0]}
                        title="Flat Image"
                        sx={{
                            height: 190,
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                        }}
                    />
                ) : (
                    <CardMedia
                        component="div"
                        title="Flat Image"
                        sx={{
                            height: 190,
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontWeight: 200,
                        }}
                    >
                        No Image Found
                    </CardMedia>
                )}
                <CardContent>
                    <Box
                        color="text.secondary"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            marginTop: "5px",
                        }}
                    >
                        <FmdGoodIcon />
                        <Typography variant="body2">
                            {flat?.location}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "5px",
                            marginTop: "17px",
                        }}
                    >
                        <Box
                            color="text.secondary"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <MeetingRoomIcon />
                            <Typography variant="body2">
                                {flat?.totalRooms}
                            </Typography>
                        </Box>
                        <Box
                            color="text.secondary"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <BedIcon />
                            <Typography variant="body2">
                                {flat?.totalBedrooms}
                            </Typography>
                        </Box>
                        <Box
                            color="text.secondary"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                            }}
                        >
                            <SellIcon />
                            <Typography variant="body2">
                                BDT {flat?.rent}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            marginTop: "15px",
                            minHeight: "50px",
                        }}
                    >
                        {flat?.description.substring(0, 100)}
                    </Typography>
                </CardContent>
                <CardActions
                    disableSpacing
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "5px",
                    }}
                >
                    <Button
                        onClick={() => router.push(`/flats/${flat?.id}`)}
                        size="small"
                        fullWidth
                    >
                        View Details
                    </Button>
                    <Button
                        onClick={() => {
                            bookingFlat();
                        }}
                        size="small"
                        fullWidth
                    >
                        Book Now
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default FlatCard;
