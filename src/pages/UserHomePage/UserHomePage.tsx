import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader/InitialLoader";
import EventHorizontal from "../../components/EventHorizontal/EventHorizontal";
import Grid2 from "@mui/material/Unstable_Grid2";
import heroPic from '../../assets/kelsey-chance-ZrhtQyGFG6s-unsplash.jpg';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";
import Calendar from "../../components/Calendar/Calendar";
import React from "react";
import { stringAvatar, stringToColor } from "../../helpers/usefulFunctions";
import userStore from "../../stores/userStore";
import { Link } from "react-router-dom";

interface Props {
    username: string;
}

function UserHomePage({ username }: Props) {
    const { 
        userDashboardStore: { loadEvents, loading, eventsByDate, setPredicate, initialLoad},
        eventStore,
        userStore: { user },
        profileStore: { loadFollowings, followings, profile, loadProfile, loadingProfile, loadingFollowings }
    } = useStore();

    useEffect(() => {
        if (username) initialLoad(username);
    }, [initialLoad, username]);

    if (loading) return <InitialLoader adding="dashboard"/>;

    return (
        <Grid2 lg={9} alignSelf="center" container marginTop="20px">
            <Grid2 xl={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '350px',
                    boxShadow: "0 0 10px 10px rgb(240, 240, 240) inset",
                    backgroundImage: `url(${heroPic})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <Typography variant="h1"
                    sx={{
                        color: 'black',
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 'bold',
                        fontSize: "3rem",
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        padding: "20px 100px",
                        borderRadius: "10px",
                    }}
                >
                    Welcome back, <span style={{ fontStyle: "italic", color: "rgb(177, 19, 101)", fontWeight: "bold" }}>{user?.displayName.split(" ")[0]}</span>!
                </Typography>
            </Grid2>

            <Grid2 lg={12}>
                <Typography
                    sx={{
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 'bold',
                        fontSize: "2rem",
                        padding: "20px 0px 0px 20px",
                        marginBottom: "20px",
                    }}
                >
                    Your upcoming events:
                </Typography>
            </Grid2>

            <Grid2 lg={8}>
                {
                    eventsByDate.length > 0 ? (
                        eventsByDate.map(event => (
                            <EventHorizontal key={event.id} event={event} />
                        ))
                    ) : (
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 'bold',
                                fontSize: "1.3rem",
                                padding: "20px 0px 0px 20px",
                                marginBottom: "20px",
                                textAlign: "center",
                            }}
                        >
                            You don't have any upcoming events. <br />
                            <Link to="/events" style={{ color: "dodgerblue" }}>Check out our events page</Link> to find something to do!
                        </Typography>
                    )
                }
            </Grid2>

            <Grid2 lg={4} container height="500px">
                <Grid2 lg={12} display="flex" justifyContent="flex-end">
                    <Calendar />
                </Grid2>

                <Grid2 lg={12} display="flex" justifyContent="flex-end" marginRight="40px">
                    <Typography
                        sx={{ 
                            fontFamily: 'Playfair Display, serif',
                            fontWeight: 'bold',
                            fontSize: "2rem",
                            marginTop: "60px",
                            textDecoration: "underline",
                        }}
                    >
                        People you follow:
                    </Typography>
                </Grid2>

                <Grid2 lg={12} display="flex" justifyContent="flex-end" container marginTop="20px" marginRight="40px">
                    {
                        followings.length > 0 ? (
                            <List>
                                {followings.map(following => (
                                    <ListItem key={following.username}>
                                        <ListItemAvatar>
                                            <Avatar variant="square" alt="Profile photo" src={following.image} {...stringAvatar(following.displayName!)} sx={{
                                                bgcolor: stringToColor(following.username!),
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
                                                            '&:hover': {
                                                                color: "dodgerblue",
                                                            }
                                                        }}
                                                        component={Link}
                                                        to={`/profile/${following.username}`}
                                                    >
                                                        {following.displayName}
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
                                                        to={`/profile/${following.username}`}
                                                    >
                                                        {following.username}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                ))}
                                
                            </List>
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: "1.3rem",
                                    marginBottom: "20px",
                                    textAlign: "right",
                                }}
                            >
                                You don't follow anyone yet.
                            </Typography>
                        )
                    }
                </Grid2>
            </Grid2>
        </Grid2>
    );
}

export default observer(UserHomePage);