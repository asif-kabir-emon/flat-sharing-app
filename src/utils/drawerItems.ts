import { USER_ROLE } from "@/constants/role";
import { DrawerItems, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TryIcon from "@mui/icons-material/Try";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";

export const drawerItems = (role: UserRole) => {
    const roleMenus: DrawerItems[] = [];

    const defaultRoutesB = [
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

    const defaultRoutesA = [
        {
            title: "Profile",
            path: `profile`,
            icon: PersonIcon,
        },
        // {
        //     title: "Change Password",
        //     path: `change-password`,
        //     icon: KeyIcon,
        // },
    ];

    switch (role) {
        case USER_ROLE.ADMIN:
            roleMenus.push(
                {
                    title: "Users",
                    path: `${role}/users`,
                    icon: TryIcon,
                },
                {
                    title: "Flats",
                    path: `${role}/flats`,
                    icon: MedicalInformationIcon,
                }
            );
            break;
        case USER_ROLE.USER:
            roleMenus.push(
                {
                    title: "My Flats",
                    path: `${role}/my-flats`,
                    icon: CalendarMonthIcon,
                },
                {
                    title: "Flat Requests",
                    path: `${role}/flat-requests`,
                    icon: CalendarMonthIcon,
                }
            );
            break;
        default:
            break;
    }

    return [...defaultRoutesB, ...roleMenus];
};
