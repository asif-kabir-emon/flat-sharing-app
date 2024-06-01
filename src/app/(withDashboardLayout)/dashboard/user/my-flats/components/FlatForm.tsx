import React from "react";
import { Grid } from "@mui/material";
import FSInput from "@/components/Form/FSInput";
import FSMultiLineInput from "@/components/Form/FSMultiLineInput";

const FlatForm = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
                <FSInput
                    name="squareFeet"
                    label="Square Feet"
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <FSInput
                    name="totalRooms"
                    label="Total Rooms"
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <FSInput
                    name="totalBedrooms"
                    label="Total Bedrooms"
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <FSInput name="rent" label="Rent" type="number" required />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <FSInput
                    name="advanceAmount"
                    label="Advance Amount"
                    type="number"
                    required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <FSInput name="location" label="Location" required />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <FSMultiLineInput
                    name="utilitiesDescription"
                    label="Utilities Description"
                    rows={3}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <FSMultiLineInput
                    name="description"
                    label="Description"
                    rows={5}
                    required
                />
            </Grid>
        </Grid>
    );
};

export default FlatForm;
