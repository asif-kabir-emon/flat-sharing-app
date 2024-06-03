import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
    name: string;
    type?: string;
    label?: string;
    size?: "small" | "medium";
    placeholder?: string;
    fullWidth?: boolean;
    sx?: SxProps;
    required?: boolean;
    disabled?: boolean;
};

const FSInput = ({
    name,
    type = "Text",
    label,
    size = "small",
    placeholder,
    fullWidth = true,
    sx,
    required,
    disabled = false,
}: TInputProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id={name}
                    type={type}
                    label={label}
                    placeholder={placeholder || label}
                    variant="outlined"
                    size={size}
                    fullWidth={fullWidth}
                    sx={{ ...sx }}
                    error={!!error?.message}
                    helperText={error?.message}
                    required={required}
                    disabled={disabled}
                />
            )}
        />
    );
};

export default FSInput;
