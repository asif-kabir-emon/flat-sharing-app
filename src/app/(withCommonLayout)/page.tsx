import FlatSection from "@/components/UI/HomePage/FlatSection/FlatSection";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import Testimonials from "@/components/UI/HomePage/Testimonials/Testimonials";
import { Box, Button } from "@mui/material";

const HomePage = () => {
    return (
        <Box>
            <HeroSection />
            <FlatSection />
            <Testimonials />
            <HowItWorks />
        </Box>
    );
};

export default HomePage;
