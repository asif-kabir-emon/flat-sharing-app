"use client";
import FSForm from "@/components/Form/FSForm";
import FSInput from "@/components/Form/FSInput";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form";
import assets from "@/assets/index";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { loginSchema } from "@/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendOtpInEmailMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [sendOtpInEmail] = useSendOtpInEmailMutation();
    const router = useRouter();

    const handleSubmit = async (values: FieldValues) => {
        try {
            const res = await userLogin(values);
            if (res?.success && res?.data?.token) {
                if (res?.data?.isEmailVerified === false) {
                    await sendOtpInEmail({}).unwrap();
                    router.push("/email-verification");
                } else {
                    toast.success("Login successfully");
                    router.push("/");
                }
            } else {
                throw new Error(res?.message || "Invalid credentials!");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

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
                            height: { xs: "200px", md: "auto" },
                            borderRadius: {
                                xs: "10px 10px 0 0",
                                md: "10px 0 0 10px",
                            },
                            backgroundColor: "#cdd1da5c",
                        }}
                    >
                        <Image
                            src={assets.images.login}
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
                            Sign In
                        </Typography>
                        <FSForm
                            onSubmit={handleSubmit}
                            resolver={zodResolver(loginSchema)}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FSInput
                                        type="text"
                                        name="email"
                                        label="Email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FSInput
                                        type="password"
                                        name="password"
                                        label="Password"
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
                                Login
                            </Button>
                        </FSForm>
                        <Typography>
                            Don`t have an account?{" "}
                            <Typography
                                component={Link}
                                href={"/register"}
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
                                Register
                            </Typography>
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Container>
    );
};

export default LoginPage;
