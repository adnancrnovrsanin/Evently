import { Dialog, DialogContent, Divider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import './style.css';
import MyTextInput from "../../common/form/MyTextInput/MyTextInput";
import LoadingButton from "@mui/lab/LoadingButton";

function LoginDialog() {
    const { userStore, loginDialogStore, profileStore } = useStore();
    return (
        <Dialog open={loginDialogStore.loginDialog.open} onClose={() => loginDialogStore.closeLoginDialog()}>
            <DialogContent sx={{ 
                width: "350px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "whitesmoke",
                border: "3px solid purple",
             }}>
                <Formik
                    initialValues={{ email: '', password: '', error: null }}
                    onSubmit={(values, { setErrors }) => userStore.login(values)
                        .catch(error => setErrors({ error: 'Invalid email or password' }))}
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
                                backgroundColor: "purple",
                                color: "white",
                                padding: "5px 20px",
                                border: "2px solid rgb(203, 58, 255)",
                                fontStyle: "italic",
                                fontSize: "15px",
                                marginTop: "20px",
                                borderRadius: "10px",
                                '&:hover': {
                                    backgroundColor: "purple",
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