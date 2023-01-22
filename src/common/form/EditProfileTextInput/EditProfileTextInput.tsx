import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}

function EditProfileTextInput(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <TextField 
            sx={{
                borderBottom: "1px solid purple",
                fontSize: "15px",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: { xs: "30px", sm: "30px" },
            }}
            id="standard-error-helper-text"
            variant="standard"
            error={meta.touched && !!meta.error}
            {...field}
            {...props}
            helperText={meta.touched && meta.error}
        />
    );
}

export default EditProfileTextInput;