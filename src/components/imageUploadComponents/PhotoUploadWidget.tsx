import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import PhotoUploadWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper)
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files]);

    return (
        <Grid2 xs={12} sm={12} md={12} lg={12} spacing={3} container>
            <Grid2 xs={12} sm={12} md={12} lg={4}>
                <Typography
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: 'secondary.main',
                        textAlign: 'center',
                    }}
                >
                    Step 1 - Add Photo
                </Typography>

                <PhotoUploadWidgetDropzone setFiles={setFiles}/>
            </Grid2>

            <Grid2 xs={12} sm={12} md={12} lg={4}>
                <Typography
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: 'secondary.main',
                        textAlign: 'center',
                        margin: '1rem 0',
                    }}
                >
                    Step 2 - Resize image
                </Typography>

                {files && files.length > 0 &&
                    <PhotoWidgetCropper imagePreview={files[0].preview} setCropper={setCropper}/>
                }
            </Grid2>

            <Grid2 xs={12} sm={12} md={12} lg={4} container>
                <Grid2 xs={12} sm={12} md={12} lg={12}>
                    <Typography
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: 'secondary.main',
                            textAlign: 'center',
                            margin: '1rem 0',
                        }}
                    >
                        Step 3 - Preview & Upload
                    </Typography>
                </Grid2>

                <Grid2 xs={12} sm={12} md={12} lg={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className="img-preview"
                        style={{
                            minHeight: 200,
                            minWidth: 200,
                            overflow: 'hidden',
                        }}
                    />
                </Grid2>

                {files && files.length > 0 && 
                    <Grid2 xs={12} sm={12} md={12} lg={12} spacing={3} 
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <LoadingButton
                            disabled={loading}
                            onClick={onCrop}
                            variant="contained"
                            color="success"
                            loading={loading}
                            aria-label="upload picture"
                            sx={{
                                padding: '0.5rem 2rem',
                            }}
                        >
                            <CheckIcon 
                                sx={{
                                    width: '1.5rem',
                                    height: '1.5rem',
                                }}
                            />
                        </LoadingButton>

                        <Button
                            disabled={loading}
                            onClick={() => setFiles([])}
                            variant="contained"
                            color="error"
                            sx={{
                                padding: '0.5rem 2rem',
                            }}
                        >
                            <CloseIcon 
                                sx={{
                                    width: '1.5rem',
                                    height: '1.5rem',
                                }}
                            />
                        </Button>
                    </Grid2>
                }
            </Grid2>
        </Grid2>
    );
}

export default observer(PhotoUploadWidget);