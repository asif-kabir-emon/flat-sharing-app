"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import { useRouter } from "next/navigation";

const HeroSection = () => {
    const router = useRouter();

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: {
                    xs: "column-reverse",
                    md: "row",
                },
                my: 16,
                gap: 10,
            }}
        >
            <Box
                sx={{
                    flex: {
                        xs: 1,
                        md: 1.5,
                    },
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: "700%",
                        top: "-90px",
                        left: "-120px",
                    }}
                >
                    <Image src={assets.svgs.grid} alt="grid" />
                </Box>
                <Typography variant="h3" component="h1" fontWeight={600}>
                    Find Your
                </Typography>
                <Typography variant="h3" component="h1" fontWeight={600}>
                    Perfect Flat-mate
                </Typography>
                <Typography
                    color="primary.main"
                    variant="h3"
                    component="h1"
                    fontWeight={600}
                >
                    Today!
                </Typography>
                <Typography
                    variant="h6"
                    component="p"
                    fontWeight={400}
                    sx={{
                        my: 2,
                    }}
                >
                    Discover the ideal living companion with our flat-sharing
                    platform! Connect with like-minded individuals, explore
                    diverse options, and make your living experience enjoyable
                    and hassle-free. Start your search now and find the perfect
                    match for your home sweet home!
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                    }}
                >
                    <Button onClick={() => router.push("/flats/add-flat")}>
                        Share Your Flat
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    flex: {
                        xs: 1,
                        md: 1,
                    },
                    display: {
                        xs: "none",
                        md: "flex",
                    },
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "300px",
                        position: "relative",
                    }}
                >
                    <Image src={assets.icons.shardFlat} alt="shared-flat" />
                </Box>
            </Box>
        </Container>
    );
};

export default HeroSection;
