import { TextField } from "@mui/material";
import { useField } from "formik";
import '../../../components/EventForm/style.css'

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}

export default function EventFormTextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <TextField 
            {...props}
            {...field}
            error={meta.touched && !!meta.error}
            color={meta.touched && !!meta.error ? "error" : "secondary"}
            id="standard-error-helper-text"
            variant="standard"
            helperText={meta.touched && meta.error}
            sx={{ fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }}
        />
    );
}