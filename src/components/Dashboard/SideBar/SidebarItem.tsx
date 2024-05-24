import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { DrawerItems } from "@/types";
import { usePathname } from "next/navigation";

type TProps = {
    item: DrawerItems;
};

const SidebarItem = ({ item }: TProps) => {
    const linkPath = `/dashboard/${item.path}`;
    const pathName = usePathname();

    return (
        <Link href={linkPath}>
            <ListItem
                disablePadding
                sx={{
                    ...(pathName === linkPath
                        ? {
                              borderRight: "3px solid #01d449",
                              "& svg": {
                                  color: "#01d449",
                              },
                          }
                        : {}),
                    mb: 1,
                }}
            >
                <ListItemButton>
                    <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            </ListItem>
        </Link>
    );
};

export default SidebarItem;
