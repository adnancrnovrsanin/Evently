import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

export default function EventFormTextarea(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <TextField
            id="outlined-multiline-static"
            {...field}
            {...props}
            multiline
            rows={props.rows}
            sx={{ 
                borderRadius: "1px",
                backgroundColor: "white",
                marginTop: "20px"
            }}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
        />
    );
}