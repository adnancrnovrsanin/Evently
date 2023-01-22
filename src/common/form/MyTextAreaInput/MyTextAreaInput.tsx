import { Textarea } from "@mui/joy";
import {useField} from "formik";

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
    sx?: any;
}

export default function MyTextAreaInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Textarea 
            color="info"
            minRows={props.rows}
            maxRows={props.rows + 1}
            variant="outlined"
            {...field}
            {...props}
            sx={{
                width: { xs: "100%", sm: "350px", md: "400px", lg: "508px", xl: "508px" },
                height: "158px",
                border: "1px solid purple",
                padding: "3px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                marginTop: "20px",
                borderRadius: "0px",
                ...props.sx
            }}
            error={meta.touched && !!meta.error}
        />
    )
}