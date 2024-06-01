import React, { ReactElement } from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Box, Input, SvgIconProps } from "@mui/material";

type TProps = {
    name: string;
    label?: string;
    accept?: string;
    sx?: SxProps;
    icon?: ReactElement<SvgIconProps>;
    variant?: "contained" | "text";
    onFileUpload: (files: File[]) => void;
};

const MultipleImageUploader = ({
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
                startIcon={icon ? icon : ""}
                sx={{ ...sx }}
            >
                {label || "Upload files"}
                <Input
                    type="file"
                    inputProps={{ accept: accept, multiple: true }}
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const fileInput = e.target as HTMLInputElement;
                        const files = fileInput.files;
                        if (files) {
                            onFileUpload(Array.from(files));
                        }
                    }}
                />
            </Button>
        </Box>
    );
};

export default MultipleImageUploader;
