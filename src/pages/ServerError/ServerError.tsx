import { Typography } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

function ServerError() {
    const { commonStore } = useStore();
    return (
        <div className="serverErrorContainer">
            <Typography variant='h1'>Server Error</Typography>
            <Typography variant="h5" color={"red"}>{commonStore.error?.message}</Typography>
            {commonStore.error?.details && (
                <div className="errorContent">
                    <Typography variant="h4">Stack trace</Typography>
                    <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
                </div>
            )}
        </div>
    );
}

export default observer(ServerError);