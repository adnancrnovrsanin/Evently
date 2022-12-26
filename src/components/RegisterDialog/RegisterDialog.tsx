import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Dialog, DialogContent } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import './style.css';
import MyTextInput from "../../common/form/MyTextInput/MyTextInput";
import { LoadingButton } from "@mui/lab";

function RegisterDialog() {
    const { userStore, registerDialogStore, profileStore } = useStore();
    return (
        <Dialog open={registerDialogStore.registerDialog.open} onClose={() => registerDialogStore.closeRegisterDialog()}>
            <DialogContent sx={{
                width: "350px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "whitesmoke",

            }}>
                <Formik
                    initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
                    onSubmit={(values, { setErrors }) => userStore.register(values)
                        .then(() => {
                            registerDialogStore.closeRegisterDialog();
                            userStore.getUser();
                            if (userStore.user) profileStore.loadProfile(userStore.user.username);
                        })
                        .catch(error => setErrors({ error: error }))}
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
                            <div className="registerHeader">
                                <h1>SIGN UP</h1>
                            </div>

                            <MyTextInput choice="registerTextField" placeholder="example@domain.com" name="email" label="E-mail" />
                            <MyTextInput choice="registerTextField" placeholder="password" name="password" type="password" label="Password" />
                            <MyTextInput choice="registerTextField" placeholder="Name Surname" name="displayName" label="Display Name" />
                            <MyTextInput choice="registerTextField" placeholder="username" name="username" label="Username" />

                            <ErrorMessage name="error" render={() => <label style={{ marginBottom: 10 }} color="red">{errors.error}</label>} />

                            <LoadingButton loading={isSubmitting} sx={{
                                fontFamily: "Playfair Display, serif",
                                backgroundColor: "rgb(190, 242, 255)",
                                padding: "5px 20px",
                                border: "2px solid dodgerblue",
                                fontStyle: "italic",
                                fontSize: "15px",
                                marginTop: "20px",
                                borderRadius: "10px",
                                color: "black",
                                '&:hover': {
                                    backgroundColor: "rgb(190, 242, 255)",   
                                    color: "black",
                                }
                            }} type="submit" variant="contained"
                                disabled={!isValid || !dirty || isSubmitting}
                            >
                                SUBMIT
                            </LoadingButton>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}

export default observer(RegisterDialog);