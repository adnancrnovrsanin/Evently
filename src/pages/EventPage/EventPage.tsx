import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader/InitialLoader";
import Grid2 from "@mui/material/Unstable_Grid2";
import './style.css';
import { Avatar, Typography } from "@mui/material";
import eventImage from '../../assets/elevate-nYgy58eb9aw-unsplash.jpg';
import { colorFromAnonimity, makeFirstLetterCapital, stringAvatar, stringToColor } from "../../helpers/usefulFunctions";

function EventPage() {
    const { id } = useParams();
    const { eventStore } = useStore();
    const { selectedEvent, loadEvent, loadingInitial, clearSelectedEvent } = eventStore;

    useEffect(() => {
        if (id) loadEvent(id);
        return () => clearSelectedEvent();
    }, [id, loadEvent, clearSelectedEvent]);

    if (loadingInitial || !selectedEvent) return <InitialLoader adding="event"/>;

    return (
        <div className="eventPageContainer">
            <Grid2 container spacing={3} width="100%">
                <Grid2 xl={12} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '350px',
                        boxShadow: "0 0 10px 10px rgb(240, 240, 240) inset",
                        backgroundImage: `url(${eventImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <Typography variant="h1"
                        sx={{
                            color: 'white',
                            fontFamily: 'Playfair Display, serif',
                            fontStyle: "italic",
                            fontWeight: "300",
                            fontSize: "3rem",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            padding: "20px 100px",
                            borderRadius: "10px",
                        }}
                    >
                        {selectedEvent.title}
                    </Typography>
                </Grid2>

                <Grid2 lg={4}>
                    <Grid2 lg={12} display='flex' alignItems="center">
                        <Avatar variant="square" alt="Profile photo" src={selectedEvent.host?.image} {...stringAvatar(selectedEvent.host?.displayName!)} sx={{
                            bgcolor: stringToColor(selectedEvent.host?.username!),
                            width: "56px",
                            height: '56px',
                        }} />
                        <Typography 
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: "800",
                                color: "dodgerblue",
                                fontSize: "1.5rem",
                                marginLeft: "10px"
                            }}
                        >
                            {selectedEvent.host?.displayName}
                        </Typography>
                    </Grid2>

                    <Grid2 lg={12}>
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'dodgerblue'
                            }}
                        >
                            {"Category: " + makeFirstLetterCapital(selectedEvent.category) + " Event"}
                        </Typography>
                    </Grid2>

                    <Grid2>
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'dodgerblue',
                            }}
                        >
                            Anonimity: 
                            <span style={{
                                color: colorFromAnonimity(selectedEvent.anonimity),
                                fontWeight: "bold",
                            }}>{" " + selectedEvent.anonimity}</span> 
                        </Typography>
                    </Grid2>
                </Grid2>
            </Grid2>
        </div>
    );
}

export default observer(EventPage);