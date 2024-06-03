import Flats from "@/components/Flats/Flats";
import { Box, Container } from "@mui/material";
import React from "react";

const FlatSection = () => {
    return (
        <Box
            sx={{
                my: 10,
                py: 20,
                backgroundColor: "rgba(20, 20, 20, 0.1)",
                clipPath: {
                    xs: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)",
                    md: "polygon(0 0, 100% 15%, 100% 100%, 0 85%)",
                },
            }}
        >
            <Flats isFlatsPage={false} />
        </Box>
    );
};

export default FlatSection;
