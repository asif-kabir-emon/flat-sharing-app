"use client";
import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
// import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Container, Stack } from "@mui/material";
import AuthButton from "@/components/UI/AuthButton/AuthButton";

const drawerWidth = 240;
const navItems = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Flats",
        url: "/flats",
    },
    {
        name: "About Us",
        url: "/about",
    },
];

const Navbar = () => {
    const pathName = usePathname();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // const AuthButton = dynamic(
    //     () => import("@/components/UI/AuthButton/AuthButton"),
    //     {
    //         ssr: false,
    //     }
    // );

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Flat{" "}
                <Box component="span" color="primary.main">
                    Share
                </Box>
            </Typography>
            <Divider />
            <List
                sx={{
                    padding: "0 5px",
                }}
            >
                {navItems.map((item) => (
                    <Button
                        key={item.name}
                        fullWidth
                        sx={{
                            textAlign: "center",
                            backgroundColor:
                                pathName === item.url
                                    ? "primary.main"
                                    : "transparent",
                            boxShadow: "none",
                            mb: "2px",

                            "&:hover": {
                                backgroundColor:
                                    pathName === item.url
                                        ? "primary.main"
                                        : "lightgrey",
                                boxShadow: "none",
                            },
                        }}
                    >
                        <Typography
                            key={item.url}
                            component={Link}
                            href={item.url}
                            sx={{
                                mx: 2,
                                cursor: "pointer",
                                color:
                                    pathName === item.url ? "white" : "black",
                                fontSize: "13px",
                            }}
                        >
                            {item.name}
                        </Typography>
                    </Button>
                ))}
            </List>
        </Box>
    );

    return (
        <Container
            sx={{
                backgroundColor: {
                    xs: "grey.100",
                    md: "transparent",
                },
            }}
        >
            <Stack
                py={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h4"
                    component={Link}
                    href="/"
                    display={{ xs: "none", md: "block" }}
                >
                    <Typography
                        variant="h4"
                        component={Link}
                        href="/"
                        fontWeight={600}
                    >
                        Flat{" "}
                        <Box component="span" color="primary.main">
                            Share
                        </Box>
                    </Typography>
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    gap={4}
                    sx={{
                        display: { xs: "none", md: "flex" },
                    }}
                >
                    {navItems.map((item) => (
                        <Typography
                            key={item.url}
                            component={Link}
                            href={item.url}
                            color={
                                pathName === item.url ? "primary.main" : "black"
                            }
                            sx={{
                                cursor: "pointer",
                            }}
                        >
                            {item.name}
                        </Typography>
                    ))}
                </Stack>
                <AuthButton />
            </Stack>
            <Box
                sx={{
                    display: { xs: "block", sm: "none" },
                    width: drawerWidth,
                    flexShrink: 0,
                }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Container>
    );
};

export default Navbar;
