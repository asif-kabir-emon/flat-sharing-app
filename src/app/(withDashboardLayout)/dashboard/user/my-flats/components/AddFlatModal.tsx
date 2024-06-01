import FSForm from "@/components/Form/FSForm";
import FSFullScreenModal from "@/components/UI/Modal/FSFullScreenModal";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFlatSchema } from "@/schemas/flat.schema";
import FlatForm from "./FlatForm";
import ImageUploaderWithList from "./ImageUploaderWithList";
import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";
import { useAddFlatMutation } from "@/redux/api/flatApi";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues = {
    totalBedrooms: "0",
    totalRooms: "0",
    squareFeet: "0",
    rent: "0",
    advanceAmount: "0",
    location: "",
    utilitiesDescription: "",
    description: "",
};

const AddFlatModal = ({ open, setOpen }: TProps) => {
    const [addFlat] = useAddFlatMutation();
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleFileUpload = (newFiles: File[]) => {
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (index: number) => {
        setUploadedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index)
        );
    };

    const handleFormSubmit = async (values: FieldValues) => {
        values.totalBedrooms = parseInt(values.totalBedrooms);
        values.totalRooms = parseInt(values.totalRooms);
        values.squareFeet = Number(values.squareFeet);
        values.rent = Number(values.rent);
        values.advanceAmount = Number(values.advanceAmount);

        const payload = {
            ...values,
            files: uploadedFiles,
        };

        const data = modifyPayload(payload);
        console.log(data);

        try {
            const res = await addFlat(data).unwrap();
            console.log(res);

            if (res?.success) {
                toast.success("Flat added successfully");
                setUploadedFiles([]);
                setOpen(false);
            } else {
                throw new Error(res?.message);
            }
        } catch (error: any) {
            toast.error(error?.message || "Failed to add flat");
        }
    };

    return (
        <>
            <FSFullScreenModal open={open} setOpen={setOpen} title="Add Flat">
                <FSForm
                    onSubmit={handleFormSubmit}
                    defaultValues={defaultValues}
                    resolver={zodResolver(createFlatSchema)}
                    disableReset={true}
                >
                    <Box
                        sx={{
                            padding: "30px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            margin: "10px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <FlatForm />
                        <Box
                            sx={{
                                marginTop: "20px",
                            }}
                        >
                            <ImageUploaderWithList
                                uploadedFiles={uploadedFiles}
                                handleFileUpload={handleFileUpload}
                                handleRemoveFile={handleRemoveFile}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "50px",
                            }}
                        >
                            <Button
                                type="submit"
                                sx={{
                                    width: "100%",
                                    maxWidth: "200px",
                                    padding: "10px",
                                }}
                            >
                                Add Flat
                            </Button>
                        </Box>
                    </Box>
                </FSForm>
            </FSFullScreenModal>
        </>
    );
};

export default AddFlatModal;
