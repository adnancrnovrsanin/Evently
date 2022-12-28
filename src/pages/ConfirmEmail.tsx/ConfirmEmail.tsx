import { useEffect, useState } from "react";
import useQuery from "../../common/util/hooks";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useStore } from "../../stores/store";
import EmailIcon from '@mui/icons-material/Email';

export default function ConfirmEmail() {
    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;
    const { loginDialogStore: { openLoginDialog } } = useStore();

    const Status = {
        Verifying: 'Verifying',
        Success: 'Success',
        Failed: 'Failed'
    }

    const [status, setStatus] = useState(Status.Verifying);

    function handleConfirmEmailResend() {
        agent.Account.resendEmailConfirmationLink(email).then(() => {
            toast.success("Email confirmation resent - please check your inbox");
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        agent.Account.verifyEmail(token, email).then(() => {
            setStatus(Status.Success);
        }).catch(() => {
            setStatus(Status.Failed);
        })
    }, [Status.Failed, Status.Success, email, token])

    // Test123.

    function getBody() {
        switch (status) {
            case Status.Verifying:
                return (
                    <Grid2 lg={12} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <CircularProgress color="secondary"/>
                        <Typography
                            sx={{
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: "1.75rem",
                                fontWeight: 500,
                                marginBottom: "20px",
                            }}
                        >
                            Verifying...
                        </Typography>
                    </Grid2>
                );
            case Status.Success:
                return (
                    <Grid2 lg={12} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Typography
                            sx={{
                                fontFamily: "Playfair Display, serif",
                                fontSize: "1.75rem",
                                fontStyle: "italic",
                                color: "purple",
                                marginBottom: "20px",
                            }}
                        >
                            You have successfully verified your email! Now you can log in to your account.
                        </Typography>

                        <Button
                            onClick={openLoginDialog}
                            variant="contained"
                            color="secondary"
                        >
                            Log in
                        </Button>
                    </Grid2>
                );
            case Status.Failed:
                return (
                    <Grid2 lg={12} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Typography
                            sx={{
                                fontFamily: "Playfair Display, serif",
                                fontSize: "1.75rem",
                                fontStyle: "italic",
                                color: "purple",
                                marginBottom: "20px",
                            }}
                        >
                            Verification failed. You can try resending the confirmation email.
                        </Typography>

                        <Button
                            onClick={handleConfirmEmailResend}
                            variant="contained"
                            color="secondary"
                        >
                            Resend confirmation email
                        </Button>
                    </Grid2>
                );
            default:
                return null;
        }
    }

    return (
        <Grid2 lg={12} container display="flex" flexDirection="column" justifyContent="center" height="100vh">
            <Grid2 lg={12} display="flex" justifyContent="center">
                <EmailIcon sx={{ fontSize: 100, color: "purple", marginBottom: "150px" }} />
            </Grid2>

            {getBody()}
        </Grid2>
    );
}