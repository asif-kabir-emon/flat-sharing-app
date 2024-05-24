import { isLoggedIn } from "@/services/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import AccountMenu from "../AccountMenu/AccountMenu";

const AuthButton = () => {
    const userInfo = isLoggedIn();

    return (
        <>
            {userInfo ? (
                <AccountMenu />
            ) : (
                <Button component={Link} href="/login">
                    Login
                </Button>
            )}
        </>
    );
};

export default AuthButton;
