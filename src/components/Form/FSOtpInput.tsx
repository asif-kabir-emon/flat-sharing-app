import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
    name: string;
};

const FSOtpInput = ({ name }: TProps) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const { control, setValue } = useFormContext();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const { value } = e.target;
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Update the form context
            setValue(name, newOtp.join(""));

            // Focus the next input field if there's a value and it's not the last input
            if (value && index < 5) {
                inputs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLDivElement>,
        index: number
    ) => {
        if (e.key === "Backspace") {
            // Focus the previous input field if current field is empty
            if (!otp[index] && index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }
    };

    useEffect(() => {
        // Focus the first input on mount
        inputs.current[0]?.focus();
    }, []);

    return (
        <Controller
            control={control}
            name={name}
            render={({ fieldState: { error } }) => (
                <Box display="flex" justifyContent="center">
                    {otp.map((digit, index) => (
                        <TextField
                            key={index}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: "center" },
                            }}
                            style={{ margin: "0 5px", width: "50px" }}
                            inputRef={(el) => (inputs.current[index] = el)}
                            error={!!error}
                            helperText={
                                index === 0 && error ? error.message : " "
                            }
                        />
                    ))}
                </Box>
            )}
        />
    );
};

export default FSOtpInput;
