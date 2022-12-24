import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import React, { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader/InitialLoader";
import Grid2 from "@mui/material/Unstable_Grid2";
import './style.css';
import { Avatar, Button, CircularProgress, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from "@mui/material";
import { colorFromAnonimity, getCategoryImage, makeFirstLetterCapital, stringAvatar, stringToColor } from "../../helpers/usefulFunctions";
import { LoadingButton } from "@mui/lab";
import Comment from "../../components/Comment/Comment";
import { ChatComment } from "../../models/comment";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextAreaInput from "../../common/form/MyTextAreaInput/MyTextAreaInput";
import { Textarea } from "@mui/joy";
import CommentSection from "../../components/CommentSection/CommentSection";
import DeleteIcon from '@mui/icons-material/Delete';

function EventPage() {
    const { id } = useParams();
    const { eventStore, userStore } = useStore();
    const { 
        selectedEvent, 
        loadEvent, 
        loadingInitial, 
        clearSelectedEvent,
        loading,
        cancelEventToggle,
        updateAttendeance,
    } = eventStore;

    useEffect(() => {
        if (id) {
            loadEvent(id);
        }
        return () => {
            clearSelectedEvent();
        }
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
                        backgroundImage: `url(${getCategoryImage(selectedEvent.category!)})`,
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

                <Grid2 lg={3}>
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
                                marginLeft: "10px",
                                textDecoration: "none",
                            }}
                            component={Link}
                            to={`/profile/${selectedEvent.host?.username}`}
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

                    <Grid2 lg={12}>
                        <Typography
                            sx={{
                                fontFamily: "Playfair Display, serif",
                                textDecoration: "underline",
                                fontSize: "1.5rem",
                            }}
                        >
                            <span style={{ fontWeight: "bold", fontSize: "2rem" }}>{selectedEvent.attendees.length}</span> {selectedEvent.attendees.length === 1 ? "person" : "people"} comming
                        </Typography>
                    </Grid2>

                    <Grid2 lg={12}>
                        <List>
                            {selectedEvent.attendees.map(attendee => (
                                <ListItem key={attendee.username}>
                                    <ListItemAvatar>
                                        <Avatar variant="square" alt="Profile photo" src={attendee.image} {...stringAvatar(attendee.displayName!)} sx={{
                                            bgcolor: stringToColor(attendee.username!),
                                            width: "56px",
                                            height: '56px',
                                        }} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'Montserrat, sans-serif',
                                                        fontWeight: "800",
                                                        fontSize: "1.125rem",
                                                        marginLeft: "10px",
                                                        textDecoration: "none",
                                                        color: "black",
                                                    }}
                                                    component={Link}
                                                    to={`/profile/${attendee.username}`}
                                                >
                                                    {attendee.displayName}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'Montserrat, sans-serif',
                                                        marginLeft: "10px",
                                                        textDecoration: "none",
                                                        color: "gray",
                                                        fontWeight: "500",
                                                    }}
                                                    component={Link}
                                                    to={`/profile/${attendee.username}`}
                                                >
                                                    {attendee.username}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    {selectedEvent.isHost && (attendee.username !== userStore.user?.username) && (
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete"
                                                // onClick={() => updateAttendeance(selectedEvent, attendee)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    )}
                                </ListItem>
                            ))}
                            
                        </List>
                    </Grid2>
                </Grid2>

                <Grid2 lg={9}>
                    <Grid2 lg={12} container
                        sx={{
                            display: 'flex',
                            justifyContent: selectedEvent.isHost ? 'space-between' : 'flex-end',
                        }}
                    >
                        {
                            selectedEvent.isHost ? (
                                <>
                                    <LoadingButton
                                        component={Link}
                                        to={`/events/manage/${selectedEvent.id}`}
                                        loading={loading}
                                        variant="contained"
                                        sx={{
                                            fontFamily: 'Montserrat, sans-serif',
                                            color: "white",
                                            backgroundColor: "purple",
                                            fontStyle: "italic",
                                            padding: "5px 50px",
                                            fontSize: "1.125rem",
                                            '&:hover': {
                                                backgroundColor: "rgb(81, 0, 81)"
                                            }
                                        }}
                                    >
                                        Manage Event
                                    </LoadingButton>

                                    <LoadingButton
                                        loading={loading}
                                        onClick={cancelEventToggle}
                                        variant="contained"
                                        sx={{
                                            fontFamily: 'Montserrat, sans-serif',
                                            color: "white",
                                            backgroundColor: selectedEvent.isCancelled ? "green" : "red",
                                            fontStyle: "italic",
                                            padding: "5px 50px",
                                            fontSize: "1.125rem",
                                            '&:hover': {
                                                backgroundColor: selectedEvent.isCancelled ? "darkgreen" : "darkred"
                                            }
                                        }}
                                    >
                                        {selectedEvent.isCancelled ? 'Re-activate event' : 'Cancel event'}
                                    </LoadingButton>
                                </>
                            ) : selectedEvent.isGoing ? (
                                <LoadingButton
                                    loading={loading}
                                    onClick={updateAttendeance}
                                    variant="contained"
                                    sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        color: "white",
                                        backgroundColor: "red",
                                        fontStyle: "italic",
                                        padding: "5px 50px",
                                        fontSize: "1.125rem",
                                        '&:hover': {
                                            backgroundColor: "darkred"
                                        },
                                        float: "right"
                                    }}
                                >
                                    Cancel attendance
                                </LoadingButton>
                            ) : (
                                <LoadingButton
                                    loading={loading}
                                    disabled={selectedEvent.isCancelled}
                                    variant="contained"
                                    sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        color: "white",
                                        backgroundColor: "green",
                                        fontStyle: "italic",
                                        padding: "5px 50px",
                                        fontSize: "1.125rem",
                                        '&:hover': {
                                            backgroundColor: "darkgreen"
                                        },
                                        float: "right"
                                    }}

                                    onClick={updateAttendeance}
                                >
                                    Join Event
                                </LoadingButton>
                            )
                        }
                    </Grid2>

                    <Grid2 lg={12}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'darkblue',
                                fontWeight: "bold",
                                textAlign: "center",
                                marginTop: "50px",
                            }}
                        >
                            Description
                        </Typography>
                    </Grid2>

                    <Grid2 lg={12}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                bgcolor: "rgb(222, 239, 255)",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "1px solid purple",
                            }}
                            component={Paper}
                            elevation={3}
                        >
                            {selectedEvent.description}
                        </Typography>
                    </Grid2>

                    <CommentSection eventId={selectedEvent.id} isJoined={selectedEvent.attendees.some(a => a.username === userStore.user?.username)} />
                </Grid2>
            </Grid2>
        </div>
    );
}

export default observer(EventPage);