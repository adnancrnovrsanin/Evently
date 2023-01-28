import { LoadingButton } from "@mui/lab";
import { Paper, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Field, FieldProps, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import logo from "../assets/LogoBlack.png";
import { useStore } from "../stores/store";

function EmailSubmit() {
    const { userStore: { requestPasswordReset } } = useStore();

    return (
        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} container
            sx={{
                height: "100vh",
            }}
        >
            <Grid2
                component={Paper}
                elevation={3}
                sx={{
                    padding: "20px",
                    height: "fit-content",
                    width: "fit-content",
                    maxWidth: "100%",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <img src={logo} alt="logo" style={{ width: "130px", margin: "20px auto", display: "block" }} />

                <Typography
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                    }}
                >
                    Enter your email and we will send you a link to reset your password
                </Typography>
                
                <Formik
                    onSubmit={(values) => requestPasswordReset(values.email)}
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().required("Email is required").email("Email is invalid"),
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit, dirty }) => (
                        <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                            <Field name="email">
                                {(props: FieldProps) => (
                                    <TextField 
                                        {...props.field}
                                        label="Email"
                                        variant="outlined"
                                        sx={{
                                            width: "100%",
                                            fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                                        }}
                                        error={props.meta.touched && Boolean(props.meta.error)}
                                        helperText={props.meta.touched && props.meta.error}

                                    />
                                )}
                            </Field>

                            <LoadingButton
                                variant="contained"
                                color="secondary"
                                loading={isSubmitting}
                                disabled={!isValid || isSubmitting || !dirty}
                                type="submit"
                                sx={{
                                    width: "100%",
                                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                                    marginTop: "15px",
                                }}
                            >
                                SUBMIT
                            </LoadingButton>
                        </Form>
                    )}
                </Formik>
            </Grid2>
        </Grid2>
    );
}

export default observer(EmailSubmit);