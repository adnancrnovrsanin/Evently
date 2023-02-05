import { toast } from "react-toastify";
import agent from "../../api/agent";
import Grid2 from "@mui/material/Unstable_Grid2";
import CheckIcon from '@mui/icons-material/Check';
import { Typography } from "@mui/material";
import { useQuery } from "../../common/util/hooks";

export default function RegisterSuccess() {
    const email = useQuery().get("email") as string;

    function handleConfirmEmailResend() {
        agent.Account.resendEmailConfirmationLink(email).then(() => {
            toast.success("Email confirmation resent - please check your inbox");
        }).catch(error => console.log(error));
    }

    return (
        <Grid2 container lg={12} height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Grid2 lg={12} textAlign="center">
                <CheckIcon sx={{ fontSize: 100, color: "purple" }} />
                <Typography
                    sx={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
                        fontStyle: "italic",
                        color: "purple",
                        marginTop: "20px",
                    }}
                >
                    Thank you for registering! Please check your email to confirm your account.
                </Typography>
            </Grid2>
            <Grid2 lg={12} textAlign="center">
                <Typography
                    sx={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: { xs: "1rem", sm: "1rem", md: "1.25rem", lg: "1.5rem" },
                    }}
                >
                    Didn't receive the email? Click <span onClick={handleConfirmEmailResend} style={{color: "blue", cursor: "pointer"}}>here</span> to resend.
                </Typography>
            </Grid2>
        </Grid2>
    );
}