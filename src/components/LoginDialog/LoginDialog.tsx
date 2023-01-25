import { Dialog, DialogContent, Divider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import './style.css';
import MyTextInput from "../../common/form/MyTextInput/MyTextInput";
import LoadingButton from "@mui/lab/LoadingButton";

function LoginDialog() {
    const { userStore, loginDialogStore } = useStore();
    return (
        <Dialog open={loginDialogStore.loginDialog.open} onClose={() => loginDialogStore.closeLoginDialog()}>
            <DialogContent sx={{ 
                width: { xs: "250px", sm: "250px", md: "300px", lg: "350px", xl: "350px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "whitesmoke",
                border: "1px solid #7C05F2",
             }}>
                <Formik
                    initialValues={{ email: '', password: '', error: null }}
                    onSubmit={(values, { setErrors }) => userStore.login(values)
                        .catch(error => setErrors({ error: "Invalid email or password" }))}
                >
                    {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off'
                            style={{ 
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                fontFamily: "Montserrat, serif"
                            }}
                        >
                            <div className="loginHeader">
                                <h1>LOGIN</h1>
                            </div>

                            <MyTextInput choice="loginTextField" placeholder="example@domain.com" name='email' label="E-mail" />
                            <MyTextInput choice="loginTextField" placeholder="password" name="password" type="password" label="Password" />
                            <ErrorMessage name="error" render={() => <label style={{ marginBottom: 10 }} color="red">{errors.error}</label>}/>
                            <LoadingButton disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} sx={{
                                fontFamily: "Playfair Display, serif",
                                backgroundColor: "#7C05F2",
                                color: "white",
                                padding: "5px 20px",
                                border: "2px solid #7C05F2",
                                fontStyle: "italic",
                                fontSize: { xs: "12px", sm: "12px", md: "14px", lg: "16px", xl: "16px" },
                                marginTop: "20px",
                                borderRadius: "10px",
                                '&:hover': {
                                    backgroundColor: "#410a78",
                                },
                            }} type="submit" variant="contained">SUBMIT</LoadingButton>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}

export default observer(LoginDialog);