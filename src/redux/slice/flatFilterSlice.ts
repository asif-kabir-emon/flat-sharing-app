import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TFlatFilter = {
    minRent: string;
    maxRent: string;
    minBedrooms: string;
    maxBedrooms: string;
};

interface FlatState {
    flatFilter: TFlatFilter;
}

const initialState: FlatState = {
    flatFilter: {
        minRent: "",
        maxRent: "",
        minBedrooms: "",
        maxBedrooms: "",
    },
};

export const flatFilterSlice = createSlice({
    name: "flat",
    initialState,
    reducers: {
        setFlatFilter: (state, action: PayloadAction<TFlatFilter>) => {
            state.flatFilter = action.payload;
        },
    },
});

export const { setFlatFilter } = flatFilterSlice.actions;

export const selectFlatFilter = (state: RootState) => state.flat.flatFilter;

export default flatFilterSlice.reducer;
