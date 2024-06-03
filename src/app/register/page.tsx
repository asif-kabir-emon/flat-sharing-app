"use client";
import FSForm from "@/components/Form/FSForm";
import FSInput from "@/components/Form/FSInput";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form";
import assets from "@/assets/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/schemas/auth.schemas";
import { toast } from "sonner";
import { userRegistration } from "@/services/actions/userRegistration";
import { userLogin } from "@/services/actions/userLogin";
import { useSendOtpInEmailMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const [sendOtpInEmail] = useSendOtpInEmailMutation();
    const router = useRouter();

    const handleSubmit = async (values: FieldValues) => {
        try {
            if (values.password !== values.confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const data = {
                name: values.name,
                email: values.email,
                password: values.password,
            };

            const res = await userRegistration(data);

            if (res?.success) {
                toast.success("Registration successful!");

                const loginData = {
                    email: values.email,
                    password: values.password,
                };

                const res = await userLogin(loginData);
                if (res?.success && res?.data?.token) {
                    if (res?.data?.isEmailVerified === false) {
                        await sendOtpInEmail({}).unwrap();
                        router.push("/email-verification");
                    } else {
                        toast.success("Login successfully!");
                        router.push("/");
                    }
                } else {
                    throw new Error(res?.message || "Invalid credentials!");
                }
            } else {
                throw new Error(res?.message || "Registration failed!");
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
                        <FSForm
                            onSubmit={handleSubmit}
                            resolver={zodResolver(registrationSchema)}
                            disableReset={true}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FSInput
                                        type="text"
                                        name="name"
                                        label="Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FSInput
                                        type="email"
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
                                <Grid item xs={12}>
                                    <FSInput
                                        type="password"
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
