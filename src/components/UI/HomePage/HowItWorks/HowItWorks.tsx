import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
} from "@mui/material";

const tipsData = [
    {
        tip: "Complete Your Profile",
        description:
            "Make sure to fill out your profile completely with accurate information and a friendly photo. This helps potential flatmates get to know you better and increases your chances of finding a compatible match.",
    },
    {
        tip: "Be Clear About Preferences",
        description:
            "Clearly state your preferences regarding cleanliness, noise levels, and lifestyle habits in your profile. Being upfront about your expectations helps avoid misunderstandings and ensures a smoother living arrangement.",
    },
    {
        tip: "Communicate Openly",
        description:
            "Use the app's messaging feature to communicate openly and honestly with potential flatmates. Discuss important details such as rent, utility bills, and shared responsibilities before making a commitment.",
    },
    {
        tip: "Meet in Person",
        description:
            "If possible, arrange to meet potential flatmates in person before finalizing any agreements. Meeting face-to-face helps establish trust and gives you a better sense of whether you’ll be compatible as flatmates.",
    },
];

const HowItWorks = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Container
                sx={{
                    py: 10,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        textAlign="center"
                        fontWeight="bold"
                        mb={4}
                    >
                        Tips for Using the Flat-Sharing App
                    </Typography>
                    <Grid container spacing={3}>
                        {tipsData.map((tip, index) => (
                            <Grid item key={index} md={6}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "10px",
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        transition: "transform 0.2s",
                                        cursor: "pointer",
                                        "&:hover": {
                                            boxShadow:
                                                "0 6px 12px rgba(0, 0, 0, 0.1)",
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            fontWeight="bold"
                                            color="primary.main"
                                            mb={2}
                                        >
                                            {tip.tip}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            color="text.secondary"
                                        >
                                            {tip.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default HowItWorks;
