import { useGetMyProfileQuery } from "@/redux/api/userApi";
import userLogout from "@/services/actions/userLogout";
import PersonIcon from "@mui/icons-material/Person";
import { Logout } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

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
    console.log(myProfile, isLoading);

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
            <button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {myProfile?.data?.profilePhoto ? (
                    <Avatar
                        src={myProfile?.data?.profilePhoto}
                        alt={myProfile?.data?.name || "Profile Photo"}
                    />
                ) : (
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                        }}
                    >
                        {myProfile?.data?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                )}
            </button>
            <Box>
                <Menu
                    id="basic-menu"
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
                        marginTop: "5px",
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            router.push(`/profile`);
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
