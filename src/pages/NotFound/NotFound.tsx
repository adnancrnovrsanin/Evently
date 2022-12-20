import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: 'whitesmoke',
            }}
        >
            <Typography variant="h1" sx={{ color: "black" }}>404</Typography>

            <Typography variant="h3" sx={{ color: "black" }}>Page not found</Typography>

            <Typography variant="h5" sx={{ color: "black" }}>Sorry, the page you are looking for does not exist.</Typography>

            <Button variant="contained" component={Link} to={'/'}>Go Back Home</Button>
        </Box>
    )
}