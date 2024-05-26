import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { theme } from "@/lib/theme/theme";

const StyledInformationBox = styled(Box)({
    background: "#f4f7fe70",
    borderRadius: theme.spacing(1),
    width: "100%",
    padding: "8px 16px",
    "& p": {
        fontWeight: "600",
    },
    "& sm": {
        width: "100%",
    },
});

const UserProfileInformation = ({ profileData }: any) => {
    return (
        <>
            <Box>
                <Typography
                    variant="h4"
                    mb={2}
                    color="primary.main"
                    textAlign={{
                        xs: "center",
                        md: "left",
                    }}
                >
                    Personal Information
                </Typography>
                <Stack
                    direction={{ xs: "column" }}
                    flexWrap={{ xs: "nowrap", sm: "wrap" }}
                    gap={2}
                >
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Role
                        </Typography>
                        <Typography>
                            {profileData?.role === "ADMIN" ? "Admin" : "User"}
                        </Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Email
                        </Typography>
                        <Typography>{profileData?.email}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Name
                        </Typography>
                        <Typography>{profileData?.name}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Bio
                        </Typography>
                        <Typography>{profileData?.bio || "N/A"}</Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Profession
                        </Typography>
                        <Typography>
                            {profileData?.profession || "N/A"}
                        </Typography>
                    </StyledInformationBox>
                    <StyledInformationBox>
                        <Typography variant="caption" color="secondary">
                            Address
                        </Typography>
                        <Typography>{profileData?.address || "N/A"}</Typography>
                    </StyledInformationBox>
                </Stack>
            </Box>
        </>
    );
};

export default UserProfileInformation;
