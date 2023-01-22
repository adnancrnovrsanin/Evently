import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import InitialLoader from "../../components/InitialLoader/InitialLoader";
import EventHorizontal from "../../components/EventHorizontal/EventHorizontal";
import Grid2 from "@mui/material/Unstable_Grid2";
import heroPic from '../../assets/kelsey-chance-ZrhtQyGFG6s-unsplash.jpg';
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tab, Typography, styled, useMediaQuery } from "@mui/material";
import Calendar from "../../components/Calendar/Calendar";
import React from "react";
import { stringAvatar, stringToColor } from "../../helpers/usefulFunctions";
import userStore from "../../stores/userStore";
import { Link } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProfileEvents from "../../components/ProfileEvents/ProfileEvents";
import ProfileEventsMobile from "../../components/ProfileEventsMobile";
import ProfileFollowings from "../../components/ProfileFollowings/ProfileFollowings";
import ProfilePhotos from "../../components/ProfilePhotos";
import EventCard from "../../components/EventCard/EventCard";

interface Props {
    username: string;
}

interface StyledTabProps {
    label: string;
    value: string;
}

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        minWidth: 0,
        maxWidth: 150,
        padding: "12px 12px",
        [theme.breakpoints.up('sm')]: {
            minWidth: 0,
        },
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(1),
        color: 'rgba(0, 0, 0, 0.85)',
        fontFamily: [
            'Montserrat, sans-serif',
        ].join(','),
        '&:hover': {
            opacity: 1,
        },
        '&.Mui-selected': {
            // color: "nesto",
            fontWeight: theme.typography.fontWeightMedium,
        },
        // '&.Mui-focusVisible': {
        //     backgroundColor: '#d1eaff',
        // },
    }),
);

function UserHomePage({ username }: Props) {
    const { 
        userDashboardStore: { loadEvents, loading, eventsByDate, setPredicate, initialLoad},
        eventStore,
        userStore: { user },
        profileStore: { loadFollowings, followings, profile, loadProfile, loadingProfile, loadingFollowings }
    } = useStore();
    const matchMobile = useMediaQuery('(max-width: 600px)');
    const matchEvents = useMediaQuery('(max-width: 1200px)');
    const [activeTab, setActiveTab] = useState("1");

    useEffect(() => {
        if (username) initialLoad(username);
    }, [initialLoad, username]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    if (loading || !profile) return <InitialLoader adding="dashboard"/>;

    return (
        <Grid2 xs={12} sm={12} md={12} lg={9} alignSelf="center" container marginTop="20px">
            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{
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
                        fontSize: { xs: "25px", sm: "40px", md: "50px", lg: "60px", xl: "70px" },
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        padding: { xs: "20px 40px", sm: "20px 60px", md: "20px 70px", lg: "20px 90px", xl: "20px 100px" },
                        borderRadius: "10px",
                    }}
                >
                    Welcome back, <span style={{ fontStyle: "italic", color: "rgb(177, 19, 101)", fontWeight: "bold" }}>{user?.displayName.split(" ")[0]}</span>!
                </Typography>
            </Grid2>

            {matchMobile ? (
                <Box sx={{ bgcolor: '#fff', marginTop: "50px", border: "1px solid purple", width: "90%", marginInline: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <TabContext value={activeTab}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary" indicatorColor="secondary"
                            scrollButtons variant="scrollable" allowScrollButtonsMobile
                        >
                            <AntTab label="See your upcoming events" value="1" />
                            <AntTab label="See which people you follow" value="2" />
                        </TabList>
                        <Box sx={{ 
                            padding: "30px 0",
                        }}>
                            <TabPanel value="1">
                                {eventsByDate.length > 0 ? (
                                    eventsByDate.map(event => (
                                        <EventCard key={event.id} event={event} />
                                    ))
                                ) : (
                                    <Typography
                                        sx={{
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: 'bold',
                                            fontSize: "1.1rem",
                                            padding: "20px 0px 0px 20px",
                                            marginBottom: "20px",
                                            textAlign: "center",
                                        }}
                                    >
                                        You don't have any upcoming events. <br />
                                        <Link to="/events" style={{ color: "dodgerblue" }}>Check out our events page</Link> to find something to do!
                                    </Typography>
                                )}
                            </TabPanel>

                            <TabPanel value="2">
                                <ProfileFollowings profile={profile}/>
                            </TabPanel>
                        </Box>
                    </TabContext>
                </Box>
            ) : (
                <>
                    <Grid2 xs={12} sm={12} md={12} lg={12}>
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

                    <Grid2 xs={5} sm={6} md={7} lg={8} container>
                        {
                            eventsByDate.length > 0 ? (
                                eventsByDate.map(event => (
                                    matchEvents ? (
                                        <Grid2 xs={12} sm={12} md={12} lg={6} xl={6}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                            }}
                                            key={event.id}
                                        >
                                            <EventCard event={event} />
                                        </Grid2>
                                    ) : (
                                        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} key={event.id}>
                                            <EventHorizontal event={event} />
                                        </Grid2>
                                    )
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

                    <Grid2 xs={7} sm={6} md={5} lg={4} container height="500px">
                        <Grid2 xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="flex-end">
                            <Calendar />
                        </Grid2>

                        <Grid2 xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="flex-end" marginRight="40px">
                            <Typography
                                sx={{ 
                                    fontFamily: 'Playfair Display, serif',
                                    fontWeight: 'bold',
                                    fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.5rem", lg: "1.8rem", xl: "1.8rem" },
                                    marginTop: "60px",
                                    textDecoration: "underline",
                                }}
                            >
                                People you follow:
                            </Typography>
                        </Grid2>

                        <Grid2 xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="flex-end" container marginTop="20px" marginRight="40px">
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
                </>
            )}
        </Grid2>
    );
}

export default observer(UserHomePage);