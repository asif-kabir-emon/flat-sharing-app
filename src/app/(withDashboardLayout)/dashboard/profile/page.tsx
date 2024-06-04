"use client";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { Container, Grid } from "@mui/material";
import React from "react";
import UserProfilePicture from "./components/UserProfilePicture";
import UserProfileInformation from "./components/UserProfileInformation";

const ProfilePage = () => {
    const { data } = useGetMyProfileQuery({});
    const profileData = data?.data;

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <UserProfilePicture
                        profilePicture={profileData?.profilePicture || null}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <UserProfileInformation profileData={profileData} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
