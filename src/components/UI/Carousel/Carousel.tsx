import { Box, Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type TProps = {
    images: string[];
};

const Carousel = ({ images }: TProps) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === images.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? images.length - 1 : slide - 1);
    };

    return (
        <>
            {images.length > 0 ? (
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: {
                            xs: 300,
                            sm: 400,
                            md: 500,
                            lg: 600,
                            xl: 700,
                        },
                        overflow: "hidden",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    <KeyboardArrowLeftIcon
                        onClick={prevSlide}
                        sx={{
                            position: "absolute",
                            left: "1rem",
                            filter: "drop-shadow(0px 0px 5px #555)",
                            width: "2rem",
                            height: "2rem",
                            color: "white",
                            cursor: "pointer",
                            "&:hover": { color: "#ddd" },
                        }}
                    />
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt={`Slide ${index}`}
                            width={600}
                            height={400}
                            style={{
                                borderRadius: "0.5rem",
                                boxShadow: "0px 0px 7px #666",
                                display: slide === index ? "block" : "none",
                            }}
                        />
                    ))}
                    <KeyboardArrowRightIcon
                        onClick={nextSlide}
                        sx={{
                            position: "absolute",
                            right: "1rem",
                            filter: "drop-shadow(0px 0px 5px #555)",
                            width: "2rem",
                            height: "2rem",
                            color: "white",
                            cursor: "pointer",
                            "&:hover": { color: "#ddd" },
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            position: "absolute",
                            bottom: "1rem",
                        }}
                    >
                        {images.map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => setSlide(index)}
                                sx={{
                                    backgroundColor:
                                        slide === index ? "white" : "grey",
                                    height: "0.5rem",
                                    width: "0.5rem",
                                    borderRadius: "50%",
                                    minWidth: "unset",
                                    padding: 0,
                                    margin: "0 0.2rem",
                                    "&:hover": {
                                        backgroundColor:
                                            slide === index ? "white" : "grey",
                                    },
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        height: {
                            xs: 300,
                            sm: 400,
                            md: 500,
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                    }}
                >
                    No Image Found
                </Box>
            )}
        </>
    );
};

export default Carousel;
