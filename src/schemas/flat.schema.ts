import { z } from "zod";

export const createFlatSchema = z.object({
    totalBedrooms: z.string({
        required_error: "Total bedrooms is required!",
    }),
    totalRooms: z.string({
        required_error: "Total rooms is required!",
    }),
    squareFeet: z.string({
        required_error: "Square feet is required!",
    }),
    rent: z.string({
        required_error: "Rent is required!",
    }),
    advanceAmount: z.string({
        required_error: "Advance amount is required!",
    }),
    location: z
        .string({
            required_error: "Location is required!",
        })
        .min(3, {
            message: "Location must be at least 3 characters long!",
        }),
    utilitiesDescription: z
        .string({
            required_error: "Utilities description is required!",
        })
        .min(10, {
            message:
                "Utilities description must be at least 10 characters long!",
        }),
    description: z
        .string({
            required_error: "Description is required!",
        })
        .min(10, {
            message: "Description must be at least 10 characters long!",
        }),
    photos: z.array(z.string()).default([]).optional(),
});
