"use client";

import Carousel from "@/components/UI/Carousel/Carousel";
import Progress from "@/components/UI/Progress/Progress";
import { useGetFlatByIdQuery } from "@/redux/api/flatApi";
import { Container } from "@mui/material";
import { useParams } from "next/navigation";
import FlatInfo from "./components/FlatInfo";

const FlatDetailPage = () => {
    const { flatId } = useParams();

    const { data, isLoading } = useGetFlatByIdQuery(flatId as string);

    const flat = data?.data;

    return (
        <Container
            sx={{
                my: 2,
            }}
        >
            {!isLoading && flat ? (
                <>
                    <Carousel images={flat?.photos} />
                    <FlatInfo flat={flat} />
                </>
            ) : (
                <Progress />
            )}
        </Container>
    );
};

export default FlatDetailPage;
