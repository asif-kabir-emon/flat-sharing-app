import { Box, Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import assets from "@/assets";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import KeyIcon from "@mui/icons-material/Key";
import { useRouter } from "next/navigation";

type TProps = {
    profilePicture: string | null;
};

const UserProfilePicture = ({ profilePicture }: TProps) => {
    const router = useRouter();

    return (
        <>
            {profilePicture ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Image
                        src={profilePicture}
                        alt="Profile Picture"
                        width={300}
                        height={400}
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            border: "2px solid gray",
                            padding: "10px 5px",
                            borderRadius: "5px",
                        }}
                    >
                        <Image
                            src={assets.icons.user}
                            alt="Profile Picture"
                            width={300}
                            height={400}
                        />
                    </Box>
                </Box>
            )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "15px",
                }}
            >
                <Button
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                    }}
                >
                    Update Profile Picture
                </Button>
                <Button
                    color="primary"
                    startIcon={<KeyIcon />}
                    fullWidth
                    onClick={() => {
                        router.push("/dashboard/change-password");
                    }}
                    sx={{
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                    }}
                >
                    Update Password
                </Button>
            </Box>
        </>
    );
};

export default UserProfilePicture;
