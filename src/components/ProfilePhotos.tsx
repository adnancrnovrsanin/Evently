import { Button, Card, CardActions, CardMedia, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { SyntheticEvent, useState } from "react";
import { Photo, Profile } from "../models/profile";
import PhotoUploadWidget from "./imageUploadComponents/PhotoUploadWidget";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    profile: Profile;
}

function ProfilePhotos({ profile }: Props) {
    const { profileStore } = useStore();
    const {
        isCurrentUser,
        uploadPhoto,
        uploadingPhoto,
        setMainPhoto,
        loading,
        deletePhoto,
    } = profileStore;

    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload (file: any) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMain(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Grid2 lg={12} container>
            <Grid2 lg={12}>
                <Typography
                    component={'h2'}
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'secondary.main',
                        textAlign: 'center',
                        margin: '1rem 0',
                        fontFamily: "Montserrat, sans-serif",
                    }}
                >
                    {profile.displayName}'s Photos
                </Typography>
            </Grid2>

            {isCurrentUser && (
                <Grid2 lg={12}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                        sx={{
                            margin: '2rem 0',
                        }}
                    >
                        {addPhotoMode ? 'Cancel' : 'Add Photo'}
                    </Button>
                </Grid2>
            )}

            <Grid2 lg={12} container>
                {addPhotoMode ? (
                    <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploadingPhoto} />
                ) : (
                    profile.photos?.map((photo: Photo) => (
                        <Grid2 key={photo.id} lg={2}>
                            <Card sx={{ width: "100%" }}>
                                <CardMedia 
                                    sx={{ 
                                        height: "150px",
                                        backgroundSize: 'contain',
                                    }}
                                    image={photo.url}
                                    title={photo.id}
                                />
                                {isCurrentUser && (
                                    <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <LoadingButton
                                            variant="outlined"
                                            color="success"
                                            name={'main' + photo.id}
                                            disabled={photo.isMain}
                                            onClick={e => handleSetMain(photo, e)}
                                            loading={target === 'main' + photo.id && loading}
                                        >
                                            Main
                                        </LoadingButton>

                                        <LoadingButton
                                            loading={loading && photo.id === target}
                                            variant="outlined"
                                            color="error"
                                            name={photo.id}
                                            onClick={e => handleDeletePhoto(photo, e)}
                                            disabled={photo.isMain}
                                        >
                                            <DeleteIcon />
                                        </LoadingButton>
                                    </CardActions>
                                )}
                            </Card>
                        </Grid2>
                    ))
                )}
            </Grid2>
        </Grid2>
    );
}

export default observer(ProfilePhotos);