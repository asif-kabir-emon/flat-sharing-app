import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "About",
        url: "/about",
    },
];

const Navbar = (props: Props) => {
    const pathName = usePathname();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const AuthButton = dynamic(
        () => import("@/components/UI/AuthButton/AuthButton"),
        {
            ssr: false,
        }
    );

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
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            sx={{
                                textAlign: "center",
                                backgroundColor:
                                    pathName === item.url
                                        ? "primary.main"
                                        : "white",

                                margin: "0 2px",
                                borderRadius: "5px",
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
                                        pathName === item.url
                                            ? "white"
                                            : "black",
                                    fontSize: "13px",
                                }}
                            >
                                {item.name}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Container>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    component="nav"
                    sx={{
                        backgroundColor: "grey.100",
                        color: "black",
                        boxShadow: "none",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", sm: "block" },
                            }}
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
                        <Box
                            sx={{
                                display: { xs: "none", sm: "block" },
                                mx: {
                                    md: 3,
                                },
                            }}
                        >
                            {navItems.map((item) => (
                                <Typography
                                    key={item.url}
                                    component={Link}
                                    href={item.url}
                                    sx={{
                                        mx: 2,
                                        cursor: "pointer",
                                        color:
                                            pathName === item.url
                                                ? "primary.main"
                                                : "black",
                                        fontWeight: 600,
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                marginLeft: "auto",
                            }}
                        >
                            <AuthButton />
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </Container>
    );
};

export default Navbar;
