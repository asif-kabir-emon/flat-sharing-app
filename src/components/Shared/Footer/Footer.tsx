import {
    Box,
    Button,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import { socialMediaLinks } from "@/constants/socialMedia";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                padding: "30px 0",
            }}
        >
            <Container>
                <Stack
                    direction={"row"}
                    spacing={2}
                    sx={{
                        justifyContent: "center",
                        paddingBottom: "30px",
                    }}
                >
                    {socialMediaLinks.map((item) => (
                        <Box key={item.name}>
                            <Typography
                                variant="h3"
                                component={Link}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                sx={{
                                    color: "white",
                                }}
                            >
                                <Button
                                    sx={{
                                        borderRadius: "5px",
                                        backgroundColor: "white",
                                        padding: "5px",

                                        "&:hover": {
                                            backgroundColor: "lightgray",
                                        },
                                    }}
                                >
                                    {item.icon}
                                </Button>
                            </Typography>
                        </Box>
                    ))}
                </Stack>
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={{
                        xs: "5px",
                        sm: "15px",
                    }}
                    divider={
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                color: "white",
                                backgroundColor: "white",
                                fontWeight: "bold",
                            }}
                        />
                    }
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    <Box>
                        <MailIcon />
                        <Typography
                            component="span"
                            sx={{
                                color: "white",
                                marginLeft: "10px",
                            }}
                        >
                            share.flat@gmail.com
                        </Typography>
                    </Box>
                    <Box>
                        <PhoneIcon />
                        <Typography
                            component="span"
                            sx={{
                                color: "white",
                                marginLeft: "10px",
                            }}
                        >
                            +880 123 456 789
                        </Typography>
                    </Box>
                </Stack>
                <Box my={2}>
                    <Stack
                        direction={"row"}
                        spacing={2}
                        sx={{
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            component={Link}
                            href="/"
                            sx={{
                                color: "white",
                                fontSize: "13px",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Privacy Policy
                        </Typography>
                        <Typography
                            component={Link}
                            href="/"
                            sx={{
                                color: "white",
                                fontSize: "13px",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Copy Rights
                        </Typography>
                    </Stack>
                    <Typography
                        sx={{
                            color: "white",
                            fontSize: "13px",
                            marginTop: "3px",
                        }}
                    >
                        © 2021 Flat Share. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
