import { USER_ROLE } from "@/constants/role";
import { DrawerItems, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";

export const drawerItems = (role: UserRole) => {
    const roleMenus: DrawerItems[] = [];

    const defaultRoutes = [
        {
            title: "Dashboard",
            path: ``,
            icon: DashboardIcon,
        },
        {
            title: "Profile",
            path: `profile`,
            icon: PersonIcon,
        },
    ];

    switch (role) {
        case USER_ROLE.ADMIN:
            roleMenus.push(
                {
                    title: "Users",
                    path: `${role}/users`,
                    icon: BadgeIcon,
                },
                {
                    title: "Flats",
                    path: `${role}/flats`,
                    icon: ApartmentIcon,
                }
            );
            break;
        case USER_ROLE.USER:
            roleMenus.push(
                {
                    title: "My Flats",
                    path: `${role}/my-flats`,
                    icon: ApartmentIcon,
                },
                {
                    title: "Flat Requests",
                    path: `${role}/flat-requests`,
                    icon: BusinessIcon,
                }
            );
            break;
        default:
            break;
    }

    return [...defaultRoutes, ...roleMenus];
};
