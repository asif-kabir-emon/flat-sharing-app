"use server";

import { FieldValues } from "react-hook-form";

export const userRegistration = async (payload: FieldValues) => {
    console.log(payload);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/create-user`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        }
    );

    const patientInfo = await res.json();
    console.log(patientInfo);

    return patientInfo;
};
