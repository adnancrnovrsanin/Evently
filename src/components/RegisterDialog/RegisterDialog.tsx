import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Dialog, DialogContent } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import './style.css';
import MyTextInput from "../../common/form/MyTextInput/MyTextInput";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import ValidationError from "../../common/form/ValidationError";
import { ErrorSharp } from "@mui/icons-material";

function RegisterDialog() {
    const { userStore, registerDialogStore, profileStore } = useStore();
    return (
        <Dialog open={registerDialogStore.registerDialog.open} onClose={() => registerDialogStore.closeRegisterDialog()}>
            <DialogContent sx={{
                width: { xs: "250px", sm: "250px", md: "300px", lg: "350px", xl: "350px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "whitesmoke",
                border: "2px solid #BCE0FD",
            }}>
                <Formik
                    initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
                    onSubmit={(values, { setErrors }) => userStore.register(values)
                        .catch(error => setErrors({ error: error }))}
                    validationSchema={Yup.object({
                        displayName: Yup.string().required(),
                        username: Yup.string().required(),
                        email: Yup.string().required(),
                        password: Yup.string().required(),
                    })}
                >
                    {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off'
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                fontFamily: "Montserrat, serif",
                            }}
                        >
                            <div className="registerHeader">
                                <h1>SIGN UP</h1>
                            </div>

                            <MyTextInput choice="registerTextField" placeholder="example@domain.com" name="email" label="E-mail" />
                            <MyTextInput choice="registerTextField" placeholder="password" name="password" type="password" label="Password" />
                            <MyTextInput choice="registerTextField" placeholder="Name Surname" name="displayName" label="Display Name" />
                            <MyTextInput choice="registerTextField" placeholder="username" name="username" label="Username" />

                            <ErrorMessage name="error" render={() => <ValidationError errors={errors.error} />} />

                            <LoadingButton loading={isSubmitting} sx={{
                                fontFamily: "Playfair Display, serif",
                                backgroundColor: "#BCE0FD",
                                padding: "5px 20px",
                                border: "2px solid dodgerblue",
                                fontStyle: "italic",
                                fontSize: "15px",
                                marginTop: "20px",
                                borderRadius: "10px",
                                color: "black",
                                '&:hover': {
                                    backgroundColor: "#BCE0FD",   
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