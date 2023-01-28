import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useField } from "formik";
import '../../../pages/EventFormPage/style.css';
import { useEffect, useState } from "react";

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function EventFormSelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    const [helperTextValue, setHelperTextValue] = useState<string>("");

    useEffect(() => {
        switch (field.value) {
            case "PUBLIC":
                setHelperTextValue("Other users will be able to search for your event and see it on your profile page.");
                break;
            case "ON INVITE":
                setHelperTextValue("Other users will be able to search for your event and see it on your profile page, but they will have to ask you for your permission to join it.");
                break;
            case "PRIVATE":
                setHelperTextValue("Other users will not be able to search for your event and see it on your profile page. Only those who have a link to your event will be able to see it.");
                break;
            default:
                setHelperTextValue("");
                break;
        }
    }, [field.value])

    return (
        <FormControl variant="standard" sx={{ minWidth: 120, margin: "20px 0 20px 0" }}>
            <InputLabel id="demo-simple-select-helper-label" sx={{ color: "darkblue", fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }}>{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={field.value || ''}
                //@ts-ignore
                onChange={(e, d) => helpers.setValue(d.props.value)}
                label={props.label || "Category of your event"}
            >
                {props.options.map((option: any, x: number) => <MenuItem key={x} value={option.value}>{option.text}</MenuItem>)}
            </Select>
            {props.name === "anonimity" && (
                <FormHelperText>
                    {helperTextValue}
                </FormHelperText>
            )}
        </FormControl>
    );
}