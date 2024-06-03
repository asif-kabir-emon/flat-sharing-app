"use client";
import FlatForm from "@/app/(withDashboardLayout)/dashboard/user/my-flats/components/FlatForm";
import ImageUploaderWithList from "@/app/(withDashboardLayout)/dashboard/user/my-flats/components/ImageUploaderWithList";
import FSForm from "@/components/Form/FSForm";
import { useAddFlatMutation } from "@/redux/api/flatApi";
import { createFlatSchema } from "@/schemas/flat.schema";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

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

const AddFlatPage = () => {
    const router = useRouter();
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

            if (res?.success) {
                toast.success("Flat added successfully");
                setUploadedFiles([]);
                router.push("/flats");
            } else {
                throw new Error(res?.message);
            }
        } catch (error: any) {
            toast.error(error?.message || "Failed to add flat");
        }
    };

    return (
        <Container
            sx={{
                my: 4,
                py: 4,
            }}
        >
            <FSForm
                onSubmit={handleFormSubmit}
                defaultValues={defaultValues}
                resolver={zodResolver(createFlatSchema)}
                disableReset={true}
            >
                <Box
                    sx={{
                        padding: "40px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
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
                        <Button type="submit" fullWidth>
                            Add Flat
                        </Button>
                    </Box>
                </Box>
            </FSForm>
        </Container>
    );
};

export default AddFlatPage;
