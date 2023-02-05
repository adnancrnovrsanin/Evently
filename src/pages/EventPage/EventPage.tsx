import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import React, { useEffect, useState } from "react";
import InitialLoader from "../../components/InitialLoader/InitialLoader";
import Grid2 from "@mui/material/Unstable_Grid2";
import './style.css';
import { Avatar, Button, Dialog, DialogActions, DialogTitle, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Paper, Slide, Typography, useMediaQuery } from "@mui/material";
import { colorFromAnonimity, getCategoryImage, makeFirstLetterCapital, stringAvatar, stringToColor } from "../../helpers/usefulFunctions";
import { LoadingButton } from "@mui/lab";
import CommentSection from "../../components/CommentSection/CommentSection";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagIcon from '@mui/icons-material/Flag';
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionProps } from "@mui/material/transitions";
import { WhatsappShareButton, WhatsappIcon, FacebookMessengerShareButton, FacebookMessengerIcon, LinkedinShareButton, LinkedinIcon, TelegramShareButton, TwitterShareButton, TelegramIcon, TwitterIcon, FacebookShareButton, EmailShareButton, FacebookIcon, EmailIcon } from "react-share";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
    children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function EventPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { eventStore, userStore } = useStore();
    const { 
        selectedEvent, 
        loadEvent, 
        loadingInitial, 
        clearSelectedEvent,
        loading,
        cancelEventToggle,
        updateAttendeance,
        reportHost,
        deleteEvent,
        requestAnInvite,
    } = eventStore;
    const mobileMatch = useMediaQuery('(max-width: 1200px)');
    const [attendeesOpened, setAttendeesOpened] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        if (id) {
            loadEvent(id);
        }
        return () => {
            clearSelectedEvent();
        }
    }, [id, loadEvent, clearSelectedEvent]);

    // logika menija

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (loadingInitial || !selectedEvent) return <InitialLoader adding="event"/>;

    return (
        <div className="eventPageContainer">
            <Grid2 container spacing={3} xs={12} sm={12} md={12} lg={12} xl={12}>
                {selectedEvent.isCancelled && 
                    <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                        sx={{
                            backgroundColor: "red",
                            textAlign: "center",
                            borderRadius: "10px 10px 0 0",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: 'Playfair Display, serif',
                                fontStyle: "italic",
                                color: "white",
                                fontSize: "1.5rem",
                            }}
                        >
                            Canceled
                        </Typography>
                    </Grid2>
                }

                <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        justifyContent: 'space-between',
                        height: '350px',
                        boxShadow: "0 0 10px 10px rgb(240, 240, 240) inset",
                        backgroundImage: `url(${getCategoryImage(selectedEvent.category!)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div></div>
                    
                    <Typography variant="h1"
                        sx={{
                            color: 'white',
                            fontFamily: 'Playfair Display, serif',
                            fontStyle: "italic",
                            fontWeight: "300",
                            fontSize: { xs: "2rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.5rem" },
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            padding: { xs: "10px 40px", sm: "10px 60px", md: "10px 80px", lg: "10px 100px", xl: "10px 120px" },
                            borderRadius: "10px",
                            alignSelf: "center",
                        }}
                    >
                        {selectedEvent.title}
                    </Typography>

                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        sx={{
                            border: "2px solid white",
                            margin: "20px 20px 0 0",
                            padding: "3px",
                            alignSelf: "flex-end",
                        }}
                    >
                        <MoreVertIcon 
                            sx={{
                                color: "white",
                                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "2.75rem", xl: "3rem" },
                            }}
                        />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {
                            handleClose();
                            reportHost(selectedEvent.id);
                        }}>
                            <FlagIcon sx={{ marginRight: "10px" }} /> Report the host
                        </MenuItem>

                        {selectedEvent.isHost && (
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    setOpenDeleteDialog(true);
                                }}
                            >
                                <DeleteIcon sx={{ marginRight: "10px" }} /> Delete event
                            </MenuItem>
                        )}
                    </Menu>
                    <Dialog
                        open={openDeleteDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setOpenDeleteDialog(false)}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Are you sure you want to delete this event?"}</DialogTitle>
                        <DialogActions sx={{ display: "flex", justifyContent: "space-between"}}>
                            <Button onClick={() => setOpenDeleteDialog(false)} variant="contained" color='primary'>Cancel</Button>
                            <Button variant="outlined" color="error"
                                onClick={() => {
                                    deleteEvent(selectedEvent.id);
                                    handleClose();
                                    navigate('/');
                                }}
                            >DELETE</Button>
                        </DialogActions>
                    </Dialog>
                </Grid2>

                <Grid2 xs={12} sm={12} md={12} lg={3} xl={3}>
                    <Grid2 xs={12} sm={12} md={12} lg={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: mobileMatch ? 'center' : 'flex-start',
                        }}
                    >
                        <Avatar variant="square" alt="Profile photo" src={selectedEvent.host?.image} {...stringAvatar(selectedEvent.host?.displayName!)} sx={{
                            bgcolor: stringToColor(selectedEvent.host?.username!),
                            width: { xs: "35px", sm: "40px", md: "45px", lg: "50px", xl: "56px" },
                            height: { xs: "35px", sm: "40px", md: "45px", lg: "50px", xl: "56px" },
                        }} />
                        <Typography 
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: "800",
                                color: "dodgerblue",
                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                                marginLeft: "10px",
                                textDecoration: "none",
                            }}
                            component={Link}
                            to={`/profile/${selectedEvent.host?.username}`}
                        >
                            {selectedEvent.host?.displayName}
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'dodgerblue',
                                textAlign: mobileMatch ? "center" : "left",
                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                            }}
                        >
                            Date: <span style={{ color: "purple", fontStyle: "italic", fontWeight: "bold" }}>{dayjs(selectedEvent.date).format('MMMM D, YYYY')}</span>
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'dodgerblue',
                                textAlign: mobileMatch ? "center" : "left",
                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                            }}
                        >
                            Time: <span style={{ color: "purple", fontStyle: "italic", fontWeight: "bold" }}>{dayjs(selectedEvent.date).format('h:mm A')}</span>
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'dodgerblue',
                                textAlign: mobileMatch ? "center" : "left",
                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                            }}
                        >
                            Location: <span style={{ color: "purple", fontStyle: "italic", fontWeight: "bold" }}>{`${selectedEvent.venue}, ${selectedEvent.city}, ${selectedEvent.country}`}</span>
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'dodgerblue',
                                textAlign: mobileMatch ? "center" : "left",
                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                            }}
                        >
                            {"Category: " + makeFirstLetterCapital(selectedEvent.category) + " Event"}
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'dodgerblue',
                                textAlign: mobileMatch ? "center" : "left",
                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                            }}
                        >
                            Anonimity: 
                            <span style={{
                                color: colorFromAnonimity(selectedEvent.anonimity),
                                fontWeight: "bold",
                                fontSize: mobileMatch ? "0.8rem" : "1.2rem"
                            }}>{" " + selectedEvent.anonimity}</span> 
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: "800",
                                textAlign: mobileMatch ? "center" : "left",
                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                            }}
                        >
                            Invite your friends via:
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}
                        sx={{
                            maxWidth: mobileMatch ? "none" : "300px",
                            display: "flex",
                            justifyContent: mobileMatch ? "center" : "flex-start",
                            alignItems: "center",
                            gap: "20px",
                            flexWrap: "wrap",
                        }}
                    >
                        <WhatsappShareButton children={<WhatsappIcon size={50} round={true}/>} url={`https://evently.herokuapp.com/events/${selectedEvent.id}`} />
                        <FacebookMessengerShareButton children={<FacebookMessengerIcon size={50} round={true} />} url={`https://evently.herokuapp.com/events/${selectedEvent.id}`} appId={"1177619656526747"} />
                        <LinkedinShareButton children={<LinkedinIcon size={50} round={true} />} url={`https://evently.herokuapp.com/events/${selectedEvent.id}`} />
                        <TelegramShareButton children={<TelegramIcon size={50} round={true} />} url={`https://evently.herokuapp.com/events/${selectedEvent.id}`} />
                        <TwitterShareButton children={<TwitterIcon size={50} round={true} />} url={`https://evently.herokuapp.com/events/${selectedEvent.id}`} />
                        <FacebookShareButton children={<FacebookIcon size={50} round={true} />} url={`https://evently.herokuapp.com/events/${selectedEvent.id}`} />
                        
                        <EmailShareButton children={<EmailIcon size={50} round={true} />} url={`https://evently.herokuapp.com/events/${selectedEvent.id}`} />
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}
                        sx={{
                            display: "flex",
                            justifyContent: mobileMatch ? "center" : "flex-start",
                            '&:hover': {
                                cursor: mobileMatch ? "pointer" : "default",
                            },
                        }}
                        component="div"
                        onClick={() => {
                            if (mobileMatch)
                                setAttendeesOpened(true);  
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Playfair Display, serif",
                                textDecoration: "underline",
                                fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                            }}
                        >
                            <span style={{ fontWeight: "bold", fontSize: mobileMatch ? "1.5rem" : "2rem" }}>{selectedEvent.attendees.length}</span> {selectedEvent.attendees.length === 1 ? "person" : "people"} comming
                        </Typography>
                    </Grid2>

                    <Drawer
                        anchor="bottom"
                        open={attendeesOpened}
                        onClose={() => setAttendeesOpened(false)}
                    >
                        <Grid2 xs={12} sm={12} md={12} lg={12} container>
                            <Grid2 xs={12} sm={12} md={12} lg={12}
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                    borderBottom: "1px solid black",
                                    padding: "10px 0",
                                    marginBottom: "10px",
                                }}
                            >
                                <IconButton
                                    sx={{
                                        alignSelf: "flex-start",
                                        padding: "5px",
                                    }}
                                >
                                    <CloseIcon onClick={() => setAttendeesOpened(false)} 
                                        sx={{
                                            fontSize: "2rem",
                                            color: "black",
                                        }}
                                    />
                                </IconButton>

                                <Typography
                                    sx={{
                                        fontFamily: "Playfair Display, serif",
                                        fontSize: "1.75rem",
                                        alignSelf: "center",
                                    }}
                                >
                                    List of people comming
                                </Typography>
                            </Grid2>

                            <Grid2 xs={12} sm={12} md={12} lg={12}>
                                <List>
                                    {selectedEvent.attendees.map(attendee => (
                                        <ListItem key={attendee.username}
                                            sx={{
                                                marginInline: "auto",
                                            }}
                                        >
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
                                                                fontSize: "1rem",
                                                                marginLeft: "10px",
                                                                textDecoration: "none",
                                                                color: "black",
                                                                textAlign: "left",
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
                                            {/* {selectedEvent.isHost && (attendee.username !== userStore.user?.username) && (
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete"
                                                        // onClick={() => updateAttendeance(selectedEvent, attendee)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            )} */}
                                        </ListItem>
                                    ))}
                                </List>

                            </Grid2>
                        </Grid2>
                    </Drawer>

                    {!mobileMatch && (
                        <Grid2 xs={12} sm={12} md={12} lg={12}>
                            <List>
                                {selectedEvent.attendees.map(attendee => (
                                    <ListItem key={attendee.username}
                                        sx={{
                                            padding: "0px",
                                        }}
                                    >
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
                                                            fontSize: "1rem",
                                                            marginLeft: "10px",
                                                            textDecoration: "none",
                                                            color: "black",
                                                            textAlign: "left",
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
                                        {/* {selectedEvent.isHost && (attendee.username !== userStore.user?.username) && (
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete"
                                                    // onClick={() => updateAttendeance(selectedEvent, attendee)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        )} */}
                                    </ListItem>
                                ))}
                                
                            </List>
                        </Grid2>
                    )}
                </Grid2>

                <Grid2 xs={12} sm={12} md={12} lg={9} xl={9}>
                    <Grid2 xs={12} sm={12} md={12} lg={12} container
                        sx={{
                            display: 'flex',
                            justifyContent: mobileMatch ? "center" : (selectedEvent.isHost ? 'space-between' : 'flex-end'),
                            gap: { xs: "20px" },
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
                                            '&:hover': {
                                                backgroundColor: "rgb(81, 0, 81)"
                                            },
                                            fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
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
                                            fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
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
                                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                                        '&:hover': {
                                            backgroundColor: "darkred"
                                        },
                                        float: "right"
                                    }}
                                >
                                    Cancel attendance
                                </LoadingButton>
                            ) : selectedEvent?.inviteRequests.some(r => r.username === userStore.user?.username) ? (
                                <LoadingButton
                                    loading={loading}
                                    disabled={true}
                                    variant="contained"
                                    sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        color: "white",
                                        backgroundColor: "gray",
                                        fontStyle: "italic",
                                        padding: "5px 50px",
                                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                                        '&:hover': {
                                            backgroundColor: "gray"
                                        },
                                        float: "right"
                                    }}
                                >
                                    Request Pending
                                </LoadingButton>
                            ) : (
                                <LoadingButton
                                    loading={loading}
                                    disabled={selectedEvent?.isCancelled}
                                    variant="contained"
                                    sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        color: "white",
                                        backgroundColor: "#189C5A",
                                        fontStyle: "italic",
                                        padding: "5px 50px",
                                        fontSize: "1.5rem",
                                        '&:hover': {
                                            backgroundColor: "darkgreen"
                                        },
                                        float: "right"
                                    }}

                                    onClick={() => {
                                        if (selectedEvent?.anonimity === "ON INVITE")
                                            requestAnInvite(selectedEvent?.id);
                                        else
                                            updateAttendeance();
                                    }}
                                >
                                    Join Event
                                </LoadingButton>
                            )
                        }
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'darkblue',
                                fontWeight: "bold",
                                textAlign: "center",
                                marginTop: "50px",
                                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.1rem", lg: "1.2rem", xl: "1.3rem" },
                            }}
                        >
                            Description
                        </Typography>
                    </Grid2>

                    <Grid2 xs={12} sm={12} md={12} lg={12}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                bgcolor: "rgb(222, 239, 255)",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "1px solid purple",
                                fontSize: { xs: "0.7rem", sm: "0.7rem", md: "0.8rem", lg: "0.9rem", xl: "1rem" },
                            }}
                            component={Paper}
                            elevation={3}
                        >
                            {selectedEvent.description}
                        </Typography>
                    </Grid2>

                    <CommentSection eventId={selectedEvent.id} isJoined={selectedEvent.attendees.some(a => a.username === userStore.user?.username)} isCancelled={selectedEvent.isCancelled} />
                </Grid2>
            </Grid2>
        </div>
    );
}

export default observer(EventPage);