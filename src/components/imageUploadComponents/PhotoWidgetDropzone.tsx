import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Typography } from '@mui/material';
import '../../App.css';

interface Props {
    setFiles: (files: any) => void;
}

export default function PhotoUploadWidgetDropzone({setFiles}: Props) {
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center' as 'center',
        height: '200px',
    }

    const dzActive = {
        borderColor: 'green',
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} className="flexColumnCenter" style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
            <input {...getInputProps()} />
            <FileUploadIcon sx={{
                fontSize: '3rem',
            }}/>
            <Typography
                sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    color: '#aaa'
                }}
            >
                Click here to add files or drop them here
            </Typography>
        </div>
    )
}

