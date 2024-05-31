import { Box, CircularProgress, Container } from "@mui/material";
import React from "react";

const Progress = () => {
    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <CircularProgress />
            </Box>
        </Container>
    );
};

export default Progress;
