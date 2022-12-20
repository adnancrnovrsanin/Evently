import { useField } from "formik";
import './style.css';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    choice?: string;
}

export default function MyTextInput(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <div className="textField">
            <label htmlFor={props.name}>{props.label}</label>
            <input {...field} {...props} className={"myTextField " + props.choice} />
            {meta.touched && meta.error ? (
                <label htmlFor={props.name} color='red'>{meta.error}</label>
            ) : null}
        </div>
    );
}