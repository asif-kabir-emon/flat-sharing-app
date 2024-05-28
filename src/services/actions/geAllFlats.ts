import { FieldValues } from "react-hook-form";

export const getAllFlatsData = async (data: FieldValues) => {
    const query = new URLSearchParams();

    Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value !== "" && value !== undefined && value !== null) {
            query.append(key, value.toString());
        }
    });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/flats?${query.toString()}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    console.log(res);

    const flats = await res.json();

    return flats;
};
