import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
    name: string;
    label?: string;
    size?: "small" | "medium";
    placeholder?: string;
    fullWidth?: boolean;
    sx?: SxProps;
    required?: boolean;
    rows?: number;
};

const FSMultiLineInput = ({
    name,
    label,
    size = "small",
    placeholder,
    fullWidth = true,
    sx,
    required,
    rows = 4,
}: TProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id={name}
                    label={label}
                    placeholder={placeholder || label}
                    variant="outlined"
                    size={size}
                    fullWidth={fullWidth}
                    sx={{ ...sx }}
                    error={!!error?.message}
                    helperText={error?.message}
                    multiline // Enable multiline mode
                    rows={rows} // Set the number of rows
                />
            )}
        />
    );
};

export default FSMultiLineInput;
