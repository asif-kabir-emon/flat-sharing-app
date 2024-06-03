"use client";
import FSForm from "@/components/Form/FSForm";
import FSInput from "@/components/Form/FSInput";
import FSOtpInput from "@/components/Form/FSOtpInput";
import {
    useSendOtpInEmailMutation,
    useVerifyEmailMutation,
} from "@/redux/api/authApi";
import { useChangeEmailMutation } from "@/redux/api/userApi";
import userLogout from "@/services/actions/userLogout";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ChangeEmailPage = () => {
    const router = useRouter();
    const [sendOtpInEmail] = useSendOtpInEmailMutation();
    const [changeEmail] = useChangeEmailMutation();
    const [resendTimer, setResendTimer] = useState<number>(60);
    const [sendingOTP, setSendingOTP] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleResendOTP = async () => {
        if (!sendingOTP) {
            try {
                setSendingOTP(true);
                const res = await sendOtpInEmail({}).unwrap();
                if (res?.success) {
                    toast.success("OTP has been resent successfully!");
                    setResendTimer(60);
                } else {
                    throw new Error(res?.message || "Failed to Send OTP!");
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setSendingOTP(false);
            }
        }
    };

    const handleSubmit = async (values: FieldValues) => {
        try {
            const res = await changeEmail(values).unwrap();

            if (res?.success) {
                userLogout(router);
                router.push("/login");
                toast.success(res?.message || "Email changed Successfully!");
            } else {
                throw new Error(res?.message || "Failed to changed Email!");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to changed Email!");
        }
    };

    return (
        <Container
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
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                    boxShadow: 1,
                    borderRadius: "10px",
                    padding: "20px",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        my: 2,
                    }}
                >
                    Change Email Address
                </Typography>
                <Typography
                    sx={{
                        mb: 3,
                    }}
                >
                    Check your email for the OTP
                </Typography>
                <FSForm onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FSInput
                                name="newEmail"
                                label="New Email"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FSInput
                                name="otp"
                                label="OTP"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {resendTimer === 0 ? (
                                <Button
                                    onClick={handleResendOTP}
                                    disabled={sendingOTP}
                                    sx={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    Resend OTP
                                </Button>
                            ) : (
                                <Typography>
                                    {`Resend OTP in ${resendTimer} seconds`}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        sx={{
                            my: 2,
                            textTransform: "capitalize",
                        }}
                    >
                        Change Email
                    </Button>
                </FSForm>
            </Box>
        </Container>
    );
};

export default ChangeEmailPage;
