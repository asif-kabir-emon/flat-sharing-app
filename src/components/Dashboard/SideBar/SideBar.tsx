import { Box, List, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { UserRole } from "@/types";
import { getUserInfo } from "@/services/auth.services";
import SidebarItem from "./SidebarItem";
import { drawerItems } from "@/utils/drawerItems";

const SideBar = () => {
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        const { role } = getUserInfo();
        setUserRole(role);
    }, []);

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                component={Link}
                href="/"
                gap={1}
                sx={{
                    py: 1,
                    mt: 1,
                    cursor: "pointer",
                }}
            >
                <Image
                    src={assets.icons.logo}
                    alt="logo"
                    width={32}
                    height={32}
                />

                <Typography variant="h6" component="h1">
                    Flat{" "}
                    <Box component="span" color="primary.main">
                        Share
                    </Box>
                </Typography>
            </Stack>
            <List>
                {drawerItems(userRole as UserRole).map((item, index) => (
                    <SidebarItem key={index} item={item} />
                ))}
            </List>
        </Box>
    );
};

export default SideBar;
