import MultipleImageUploader from "@/components/Form/MultipleImageUploader";
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Box,
    Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";

type TProps = {
    uploadedFiles: File[];
    handleFileUpload: (newFiles: File[]) => void;
    handleRemoveFile: (index: number) => void;
};

const ImageUploaderWithList = ({
    uploadedFiles,
    handleFileUpload,
    handleRemoveFile,
}: TProps) => {
    return (
        <Box>
            {uploadedFiles.length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "100px 20px",
                        border: "2px dashed #ccc",
                        borderRadius: "5px",
                        gap: "10px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "5px",
                            padding: "50px 100px",
                        }}
                    >
                        <CloudUploadIcon sx={{ fontSize: 50 }} />
                        <Typography variant="h6">Upload Images</Typography>
                        <MultipleImageUploader
                            name="flatImages"
                            label="Select Flat Images"
                            accept="image/*"
                            onFileUpload={handleFileUpload}
                        />
                    </Box>
                </Box>
            )}

            {uploadedFiles.length > 0 && (
                <Box
                    sx={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px",
                        }}
                    >
                        {uploadedFiles.length > 0 && (
                            <MultipleImageUploader
                                name="flatImages"
                                label="Add More Flat Images"
                                icon={<AddIcon />}
                                accept="image/*"
                                onFileUpload={handleFileUpload}
                                sx={{
                                    marginTop: "20px",
                                }}
                            />
                        )}
                    </Box>
                    <List>
                        {uploadedFiles.map((file, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "5px",
                                    padding: "5px 10px",
                                    margin: "5px 0",
                                }}
                            >
                                <>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            variant="square"
                                            sx={{ width: 32, height: 32 }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={file.name}
                                        sx={{
                                            marginLeft: 1,
                                            display: {
                                                xs: "none",
                                                md: "inline",
                                            },
                                        }}
                                    />
                                </>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default ImageUploaderWithList;
