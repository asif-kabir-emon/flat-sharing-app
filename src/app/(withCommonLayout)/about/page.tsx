/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import Link from "next/link";
import { socialMediaLinks } from "@/constants/socialMedia";

const contactInfo = [
    {
        title: "Email",
        value: "share.flat@gmail.com",
        icon: <EmailIcon />,
    },
    {
        title: "Phone",
        value: "+880 123 456 789",
        icon: <PhoneIcon />,
    },
    {
        title: "Address",
        value: "FlatShare App, 1234 Main Street, Dhaka, Bangladesh",
        icon: <BusinessIcon />,
    },
];

const AboutPage = () => {
    return (
        <Container>
            {/* <Box
                sx={{
                    my: 4,
                }}
            >
                <Typography
                    component="h2"
                    sx={{
                        fontSize: 24,
                        fontWeight: 500,
                        mt: 2,
                        mb: 2,
                        textAlign: "center",
                    }}
                >
                    About FlatShare App
                </Typography>
            </Box> */}

            <Box
                sx={{
                    backgroundColor: "primary.main",
                    borderRadius: 4,
                    padding: 4,
                    mt: 6,
                }}
            >
                <Typography
                    component="h2"
                    sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        mt: 2,
                        mb: 2,
                        textAlign: "center",
                    }}
                >
                    Our Mission
                </Typography>
                <Typography
                    component="p"
                    sx={{
                        fontSize: 16,
                        mt: 2,
                        mb: 2,
                        textAlign: "center",
                    }}
                >
                    Welcome to FlatShare App, your ultimate solution for finding
                    the perfect apartment to rent! Our mission is to make the
                    process of finding a new home as easy and enjoyable as
                    possible. We want to help you find the perfect apartment
                    that fits your lifestyle and budget.
                </Typography>
            </Box>
            <Box
                sx={{
                    borderRadius: 4,
                    padding: 4,
                    mt: 5,
                }}
            >
                <Typography
                    component="h2"
                    sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        mt: 2,
                        mb: 2,
                        textAlign: "center",
                    }}
                >
                    Our Team
                </Typography>
                <Typography
                    component="p"
                    sx={{
                        fontSize: 16,
                        mt: 2,
                        mb: 2,
                        textAlign: "center",
                    }}
                >
                    Our team is made up of a group of passionate individuals who
                    are dedicated to helping you find the perfect apartment. We
                    are committed to providing you with the best possible
                    experience and are here to help you every step of the way.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            border: "1px solid",
                            borderRadius: "5px",
                            padding: "10px 5px",
                            mt: 4,
                        }}
                    >
                        <PersonIcon
                            sx={{
                                fontSize: 200,
                            }}
                        />
                        <Typography>Md Asif Kabir Emon</Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    borderRadius: 4,
                    border: "1px solid lightgray",
                    padding: 4,
                    my: 6,
                }}
            >
                <Typography
                    component="h2"
                    sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        mt: 2,
                        mb: 2,
                        textAlign: "center",
                    }}
                >
                    Contact Us
                </Typography>
                <Typography
                    component="p"
                    sx={{
                        fontSize: 16,
                        mt: 2,
                        mb: 2,
                        textAlign: "center",
                    }}
                >
                    If you have any questions or need help finding an apartment,
                    please don't hesitate to contact us. We are here to help you
                    and are committed to providing you with the best possible
                    experience.
                </Typography>

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
                                        backgroundColor: "lightgray",
                                        padding: "10px 5px",

                                        "&:hover": {
                                            backgroundColor: "grey.100",
                                        },
                                    }}
                                >
                                    {item.icon}
                                </Button>
                            </Typography>
                        </Box>
                    ))}
                </Stack>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            backgroundColor: "grey.100",
                            borderRadius: 4,
                            padding: "20px 30px",
                        }}
                    >
                        {contactInfo.map((item) => (
                            <Box
                                key={item.title}
                                sx={{
                                    display: "flex",
                                    mt: 2,
                                    gap: 2,
                                }}
                            >
                                {item.icon}
                                <Typography
                                    component="span"
                                    sx={{
                                        fontSize: 16,
                                    }}
                                >
                                    {item.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default AboutPage;
