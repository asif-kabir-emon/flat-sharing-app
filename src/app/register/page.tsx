"use client";
import FSForm from "@/components/Form/FSForm";
import FSInput from "@/components/Form/FSInput";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form";
import assets from "@/assets/index";

const RegisterPage = () => {
    const handleSubmit = (values: FieldValues) => {};

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100vh",
                    padding: {
                        xs: "10px 0px",
                        md: "100px 0px",
                    },
                }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    sx={{
                        width: "100%",
                        maxWidth: "800px",
                        boxShadow: 1,
                        borderRadius: "10px",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: { xs: "100%", md: "50%" },
                            height: { xs: "200px", sm: "300px", md: "auto" },
                            borderRadius: {
                                xs: "10px 10px 0 0",
                                md: "10px 0 0 10px",
                            },
                            backgroundColor: "#cdd1da5c",
                        }}
                    >
                        <Image
                            src={assets.images.register}
                            alt="login"
                            fill
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            padding: "20px",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                my: 3,
                            }}
                        >
                            Register
                        </Typography>
                        <FSForm onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FSInput
                                        name="userName"
                                        label="User Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FSInput name="email" label="Email" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FSInput name="password" label="Password" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FSInput
                                        name="confirmPassword"
                                        label="Confirm Password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                sx={{
                                    my: 2,
                                }}
                            >
                                Register
                            </Button>
                        </FSForm>
                        <Typography>
                            Already have an account?{" "}
                            <Typography
                                component={Link}
                                href={"/login"}
                                sx={{
                                    color: "primary.main",
                                    opacity: 0.9,
                                    cursor: "pointer",
                                    textDecoration: "underline",

                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                Login
                            </Typography>
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Container>
    );
};

export default RegisterPage;
