import { Avatar, Box, Container, Typography } from "@mui/material";

const clientReviews = [
    {
        name: "Rahim Ahmed",
        testimonial:
            "Finding a flatmate has never been easier! The platform is user-friendly, and I found a great match in just a few days. Highly recommended!",
        rating: 5,
        location: "Dhaka, Bangladesh",
    },
    {
        name: "Mariam Hossain",
        testimonial:
            "I was hesitant about sharing my flat, but this app made the process smooth and stress-free. I now have a fantastic flatmate who shares my interests. Couldn't be happier!",
        rating: 4.5,
        location: "Chittagong, Bangladesh",
    },
    {
        name: "Nusrat Jahan",
        testimonial:
            "This app saved me so much time and effort. I connected with like-minded people and found the perfect flatmate. My living situation has improved dramatically!",
        rating: 5,
        location: "Sylhet, Bangladesh",
    },
];

const Testimonials = () => {
    return (
        <Container
            sx={{
                mb: 20,
            }}
        >
            <Box>
                <Typography
                    variant="h4"
                    component="h1"
                    textAlign="center"
                    sx={{
                        fontWeight: "bold",
                        color: "text.secondary",
                    }}
                >
                    Customer Reviews
                </Typography>
                <Typography
                    variant="h6"
                    component="p"
                    textAlign="center"
                    sx={{
                        color: "text.secondary",
                    }}
                >
                    What our customers say about us
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                    flexWrap: "wrap",
                    mt: 5,
                }}
            >
                {clientReviews.map((review) => (
                    <Box
                        key={review.name}
                        sx={{
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            maxWidth: "300px",
                            textAlign: "center",
                            height: "350px",
                        }}
                    >
                        <Avatar sx={{ width: 56, height: 56, mb: 2 }} />
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                                fontWeight: "bold",
                                color: "text.primary",
                                mb: 1,
                            }}
                        >
                            {review.name}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                color: "text.secondary",
                                mb: 2,
                            }}
                        >
                            {review.testimonial}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="p"
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            {review.location}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default Testimonials;
