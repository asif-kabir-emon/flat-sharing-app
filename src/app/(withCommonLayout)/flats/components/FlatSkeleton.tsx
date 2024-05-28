import { Box, Card, CardActions, CardContent, Skeleton } from "@mui/material";

const FlatSkeleton = () => {
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <Skeleton variant="rectangular" height={190} />
                <CardContent>
                    <Box
                        color="text.secondary"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            marginTop: "5px",
                        }}
                    >
                        <Skeleton width="60%" height="15px" />
                    </Box>

                    <Box
                        color="text.secondary"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            marginTop: "5px",
                        }}
                    >
                        <Skeleton width="100%" height="15px" />
                        <Skeleton width="100%" height="15px" />
                        <Skeleton width="60%" height="15px" />
                    </Box>

                    <Box
                        sx={{
                            gap: "5px",
                            marginTop: "17px",
                        }}
                    >
                        <Skeleton width="100%" height="15px" />
                        <Skeleton width="100%" height="15px" />
                        <Skeleton width="40%" height="15px" />
                    </Box>
                </CardContent>
                <CardActions
                    disableSpacing
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "2px",
                    }}
                >
                    <Skeleton width="100%" height="25px" />
                    <Skeleton width="100%" height="25px" />
                </CardActions>
            </Card>
        </>
    );
};

export default FlatSkeleton;
