// import logoutUser from "@/services/actions/logoutUser";
// import { getUserInfo } from "@/services/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
    const userInfo = false;
    const router = useRouter();

    const handleLogout = () => {
        // logoutUser(router);
    };

    return (
        <>
            {userInfo ? (
                <Button
                    onClick={() => {
                        handleLogout();
                    }}
                    color="error"
                >
                    Logout
                </Button>
            ) : (
                <Button component={Link} href="/login">
                    Login
                </Button>
            )}
        </>
    );
};

export default AuthButton;
