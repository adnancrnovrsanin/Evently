import { CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import './style.css';

function InitialLoader({ adding }: { adding: string}) {
    return (
        <div className="initialLoader">
            <CircularProgress color='secondary'/>
            <Typography sx={{
                fontSize: "20px",
                fontWeight: 600,
                color: "black",
                marginTop: "10px",
                fontFamily: "Montserrat, sans-serif"
            }}>Loading {adding}...</Typography>
        </div>
    );
}

export default observer(InitialLoader);