import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            // main: "#1586FD",
            // main: "#78E7A4",
            main: "#01d449",
            // main: "#5ada86",
        },
        secondary: {
            main: "#666F73",
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    padding: "8px 24px",
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: "lg",
            },
        },
    },
    typography: {
        body1: {
            color: "#0B1134CC",
        },
    },
});

theme.shadows[1] = "0px 5px 22px lightgray";
