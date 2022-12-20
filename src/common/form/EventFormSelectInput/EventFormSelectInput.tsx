import { optionClasses } from "@mui/joy";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useField } from "formik";
import '../../../pages/EventFormPage/style.css';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function EventFormSelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <FormControl variant="standard" sx={{ minWidth: 120, margin: "20px 0 30px 0" }}>
            <InputLabel id="demo-simple-select-standard-label" sx={{ color: "darkblue", fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }}>Category of your event</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={field.value || ''}
                //@ts-ignore
                onChange={(e, d) => helpers.setValue(d.props.value)}
                label={props.label || "Category of your event"}
            >
                {props.options.map((option: any, x: number) => <MenuItem key={x} value={option.value}>{option.text}</MenuItem>)}
            </Select>
        </FormControl>
    );
}