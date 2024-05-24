import { useGetMyProfileQuery } from "@/redux/api/userApi";
import userLogout from "@/services/actions/userLogout";
import PersonIcon from "@mui/icons-material/Person";
import { Logout } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const menuStyles = {
    paper: {
        elevation: 0,
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 1.5,

        "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
        },
    },
};

const AccountMenu = () => {
    const { data: myProfile, isLoading } = useGetMyProfileQuery({});
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        userLogout(router);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 1,
                }}
            >
                <Avatar
                    alt={myProfile?.data?.name}
                    src={myProfile?.data?.profilePhoto}
                />
                <IconButton
                    onClick={handleClick}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    //   size='small'
                    sx={{
                        background: "#ffffff",
                        "& svg": {
                            color: "primary.main",
                        },
                    }}
                >
                    <KeyboardArrowDownIcon />
                </IconButton>
            </Box>
            <Box>
                <Menu
                    id="account-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    sx={{
                        ...menuStyles,
                        marginTop: "10px",
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            router.push(`/dashboard/profile`);
                        }}
                    >
                        <ListItemIcon>
                            <PersonIcon
                                fontSize="small"
                                sx={{ color: "secondary.main" }}
                            />
                        </ListItemIcon>
                        Profile
                    </MenuItem>

                    <Divider />

                    <MenuItem
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        <ListItemIcon>
                            <Logout
                                fontSize="small"
                                sx={{ color: "error.main" }}
                            />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default AccountMenu;
