import FSForm from "@/components/Form/FSForm";
import FSInput from "@/components/Form/FSInput";
import FSModal from "@/components/UI/Modal/FSModal";
import { authKey } from "@/constants/authKey";
import {
    useSendOtpInEmailMutation,
    useVerifyUserMutation,
} from "@/redux/api/authApi";
import { decodedToken } from "@/utils/jwtDecode";
import { Button, Grid } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserModal = ({ open, setOpen }: TProps) => {
    const router = useRouter();
    const [verifyUser] = useVerifyUserMutation();
    const token = localStorage.getItem(authKey);
    const decodedToken = jwtDecode(token as string) as any;
    const [sendOtpInEmail] = useSendOtpInEmailMutation();

    if (!decodedToken) {
        setOpen(false);
    }

    const defaultValues = {
        email: decodedToken.email,
        password: "",
    };

    const onSubmit = async (data: FieldValues) => {
        try {
            const res = await verifyUser(data).unwrap();

            if (res?.success) {
                await sendOtpInEmail({}).unwrap();
                router.push("/dashboard/change-email");
                setOpen(false);
            } else {
                throw new Error(res?.message || "Failed to verify user!");
            }
        } catch (error: any) {
            toast.error(
                error.message || "Failed to verify user! Wrong credentials!"
            );
        }
    };

    return (
        <>
            <FSModal open={open} setOpen={setOpen} title="Check User">
                <FSForm onSubmit={onSubmit} defaultValues={defaultValues}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FSInput
                                name="email"
                                type="email"
                                label="Email"
                                fullWidth
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FSInput
                                name="password"
                                type="password"
                                label="Password"
                                fullWidth
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
                        Check User
                    </Button>
                </FSForm>
            </FSModal>
        </>
    );
};

export default UserModal;
