"use client";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { Box } from "@mui/material";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            sx={{
                maxWidth: "100vw",
                overflowX: "hidden",
            }}
        >
            <Navbar />
            <Box
                sx={{
                    minHeight: "100vh",
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default CommonLayout;
