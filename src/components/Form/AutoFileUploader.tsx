import React, { ReactElement } from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Input, SvgIconProps } from "@mui/material";

type TProps = {
    name: string;
    label?: string;
    accept?: string;
    sx?: SxProps;
    icon?: ReactElement<SvgIconProps>;
    variant?: "contained" | "text";
    onFileUpload: (file: File) => void;
};

const AutoFileUploader = ({
    name,
    label,
    accept,
    sx,
    icon,
    variant = "contained",
    onFileUpload,
}: TProps) => {
    return (
        <Box>
            <Button
                component="label"
                role={undefined}
                variant={variant}
                tabIndex={-1}
                startIcon={icon ? icon : <CloudUploadIcon />}
                sx={{ ...sx }}
            >
                {label || "Upload file"}
                <Input
                    type="file"
                    inputProps={{ accept: accept }}
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const fileInput = e.target as HTMLInputElement;
                        const file = fileInput.files?.[0];
                        if (file) {
                            onFileUpload(file);
                        }
                    }}
                />
            </Button>
        </Box>
    );
};

export default AutoFileUploader;
