import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { theme } from "@/lib/theme/theme";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import BedIcon from "@mui/icons-material/Bed";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import SellIcon from "@mui/icons-material/Sell";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { useRouter } from "next/navigation";

const StyledInformationBox = styled(Box)({
    background: "#f4f7fe70",
    borderRadius: theme.spacing(1),
    width: "100%",
    padding: "8px 16px",
    marginTop: "1rem",
    marginBottom: "1rem",
    "& p": {
        fontWeight: "600",
    },
    "& sm": {
        width: "100%",
    },
});

const FlatInfo = ({ flat }: { flat: any }) => {
    const router = useRouter();

    return (
        <Box my={2}>
            <Box
                color="text.secondary"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "5px",
                    border: "1px solid #ddd",
                    padding: "1rem",
                    borderRadius: "5px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "1.2rem",
                    }}
                >
                    <FmdGoodIcon />
                    {flat?.location}
                </Box>
                <Box>
                    <Button
                        disabled={!flat?.availability}
                        onClick={() => {
                            router.push(`/booking/${flat?.id}`);
                        }}
                    >
                        Book Now
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    border: "1px solid #ddd",
                    padding: "1rem",
                    marginTop: "1rem",
                    borderRadius: "5px",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <StyledInformationBox>
                            <Typography variant="caption" color="secondary">
                                Total Rooms
                            </Typography>
                            <Typography>
                                <MeetingRoomIcon /> {flat?.totalRooms}
                            </Typography>
                        </StyledInformationBox>
                        <StyledInformationBox>
                            <Typography variant="caption" color="secondary">
                                Bed Rooms
                            </Typography>
                            <Typography>
                                <BedIcon /> {flat?.totalBedrooms}
                            </Typography>
                        </StyledInformationBox>
                        <StyledInformationBox>
                            <Typography variant="caption" color="secondary">
                                Square Feet
                            </Typography>
                            <Typography>
                                <SquareFootIcon /> {flat?.squareFeet}
                            </Typography>
                        </StyledInformationBox>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <StyledInformationBox>
                            <Typography variant="caption" color="secondary">
                                Rent (Per Month)
                            </Typography>
                            <Typography>
                                <SellIcon /> {flat?.rent}
                            </Typography>
                        </StyledInformationBox>
                        <StyledInformationBox>
                            <Typography variant="caption" color="secondary">
                                Advance Amount
                            </Typography>
                            <Typography>
                                <AccountBalanceWalletIcon />{" "}
                                {flat?.advanceAmount}
                            </Typography>
                        </StyledInformationBox>
                        <StyledInformationBox>
                            <Typography variant="caption" color="secondary">
                                Availability
                            </Typography>
                            <Typography>
                                <GppGoodIcon />{" "}
                                {flat?.availability ? "Yes" : "No"}
                            </Typography>
                        </StyledInformationBox>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    border: "1px solid #ddd",
                    padding: "1rem",
                    marginTop: "1rem",
                    borderRadius: "5px",
                }}
            >
                <StyledInformationBox>
                    <Typography variant="caption" color="secondary">
                        Utilities Included
                    </Typography>
                    <Typography>{flat?.utilitiesDescription}</Typography>
                </StyledInformationBox>
                <StyledInformationBox>
                    <Typography variant="caption" color="secondary">
                        Description
                    </Typography>
                    <Typography>{flat?.description}</Typography>
                </StyledInformationBox>
            </Box>
        </Box>
    );
};

export default FlatInfo;
