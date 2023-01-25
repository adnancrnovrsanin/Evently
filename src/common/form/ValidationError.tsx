import { observer } from "mobx-react-lite";

interface Props {
    errors: any;
}

function ValidationError({ errors }: Props) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {errors && (
                errors.map((err: string, i: number) => (
                    <label style={{ marginBottom: 10, fontSize: "14px", lineHeight: "20px" }} color="red">{err}</label>
                ))
            )}
        </div>
    );
}

export default observer(ValidationError);