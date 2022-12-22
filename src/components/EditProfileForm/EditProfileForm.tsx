import { Button, Typography } from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Form } from "formik";
import * as Yup from 'yup';
import { useStore } from "../../stores/store";
import EditProfileTextInput from "../../common/form/EditProfileTextInput/EditProfileTextInput";
import MyTextAreaInput from "../../common/form/MyTextAreaInput/MyTextAreaInput";
import profilePic from '../../assets/profilna.jpg';
import { LoadingButton } from "@mui/lab";
import { Profile } from "../../models/profile";

interface Props {
    setEditMode: (editMode: boolean) => void;
    profile: Profile;
}



function EditProfileForm({ setEditMode, profile }: Props) {
    const { profileStore: { updateProfile } } = useStore();

    if (!profile) return <h2>Problem loading profile</h2>

    return (
        <Formik
            initialValues={{
                displayName: profile?.displayName, 
                bio: profile?.bio || '', error: null
            }}
            onSubmit={(values, { setErrors }) => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                }).catch(error => setErrors({ error: 'Invalid email or password' }));
            }}
            // onSubmit={(values, { setErrors }) => {
            //     console.log(values).catch(error => setErrors({ error }));
            // }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })} 
            >
            {({ isSubmitting, isValid, dirty, errors }) => (
                <Form className="profileInfoContainer">
                    <div className="topPartProfile">
                        <div className="profilna" style={{ backgroundImage: `url(${ profile.image ? profile.image : profilePic })`}}></div>
                        <div className="profileInfo">
                            <div className="displayNameContainer">
                                <EditProfileTextInput
                                    placeholder='Display Name'
                                    name='displayName'
                                />
                            </div>

                            <div className="followInfo">
                                <div className="followCount" style={{ marginRight: "50px" }}>
                                    <p>{profile.followersCount}</p>
                                    <p>followers</p>
                                </div>

                                <div className="followCount">
                                    <p>{profile.followingCount}</p>
                                    <p>following</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ErrorMessage name='error' render={() => 
                        <label style={{ marginBottom: 10 }} color='red'>{errors.error}</label>} />
                    
                    <MyTextAreaInput rows={4} placeholder='Add your bio' name='bio' />

                    <LoadingButton
                        type="submit"
                        loading={isSubmitting}
                        disabled={!isValid || !dirty}
                        variant="contained"
                        color="success"
                        sx={{
                            alignSelf: "flex-end",
                            marginTop: "15px",
                            marginRight: "10px",
                        }}
                    >
                        Update profile
                    </LoadingButton>
                </Form>
            )} 
        </Formik>
    );
}

export default observer(EditProfileForm);