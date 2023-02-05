import { IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useScrollPosition } from "../common/util/hooks";

function Footer() {
    const scroll = useScrollPosition();
    const scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    return (
        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} container
            sx={{
                bgcolor: "#7C05F2",
            }}
        >
            <Grid2 xs={11} sm={11} md={10} lg={9} xl={9} container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginInline: "auto",
                    padding: "0.8rem 0"
                }}
            >
                <Typography
                    sx={{
                        color: "white",
                        fontFamily: "Playfair Display, serif",
                        fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.3rem", lg: "1.4rem", xl: "1.4rem" },
                        fontWeight: 500,
                        lineHeight: 1.5,
                    }}
                >
                    Evently
                </Typography>

                <Grid2
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "2rem",
                    }}
                >
                    <Typography
                        sx={{
                            color: "white",
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.8rem", lg: "0.9rem", xl: "0.9rem" },
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                        component={Link}
                        to="/"
                    >
                        HOME
                    </Typography>

                    <Typography
                        sx={{
                            color: "white",
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.8rem", lg: "0.9rem", xl: "0.9rem" },
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                        component={Link}
                        to="/events"
                    >
                        FIND EVENTS
                    </Typography>
                </Grid2>

                
            </Grid2>

            <IconButton
                sx={{
                    display: scroll > 50 ? "block" : "none",
                    position: "fixed",
                    bottom: Math.floor(scroll) === scrollMaxY ? "0" : "2rem",
                    right: "1rem",
                    bgcolor: "white",
                    color: "black",
                    "&:hover": {
                        bgcolor: "#7C05F2",
                        color: "white",
                    },
                    borderRadius: "0",
                    padding: "12px 2rem",
                    zIndex: 100,
                    border: "1px solid #7C05F2"
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <ArrowUpwardIcon />
            </IconButton>
        </Grid2>
    );
}

export default Footer;