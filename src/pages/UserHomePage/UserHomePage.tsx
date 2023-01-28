import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import InitialLoader from "../../components/InitialLoader/InitialLoader";
import EventHorizontal from "../../components/EventHorizontal/EventHorizontal";
import Grid2 from "@mui/material/Unstable_Grid2";
import heroPic from '../../assets/kelsey-chance-ZrhtQyGFG6s-unsplash.jpg';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Tab, Typography, styled, useMediaQuery } from "@mui/material";
import Calendar from "../../components/Calendar/Calendar";
import React from "react";
import { stringAvatar, stringToColor } from "../../helpers/usefulFunctions";
import { Link } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProfileFollowings from "../../components/ProfileFollowings/ProfileFollowings";
import EventCard from "../../components/EventCard/EventCard";
import InviteRequestCard from "../../components/InviteRequestCard/InviteRequestCard";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/bundle';
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";

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
        userDashboardStore: { loadEvents, loading, eventsByDate, setPredicate, initialLoad, getInviteRequestsForUserByDate },
        eventStore,
        userStore: { user },
        profileStore: { loadFollowings, followings, profile, loadProfile, loadingProfile, loadingFollowings }
    } = useStore();
    const matchMobile = useMediaQuery('(max-width: 600px)');
    const matchEvents = useMediaQuery('(max-width: 1200px)');
    const [activeTab, setActiveTab] = useState("1");
    const matchInvites = useMediaQuery('(max-width: 800px)');

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
                            <AntTab label="See your pending requests" value="1" />
                            <AntTab label="See your upcoming events" value="2" />
                            <AntTab label="See which people you follow" value="3" />
                        </TabList>
                        <Box sx={{ 
                            padding: "30px 0",
                        }}>
                            <TabPanel value="1">
                                {getInviteRequestsForUserByDate.length > 0 ? (
                                    <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} container>
                                        {getInviteRequestsForUserByDate.map((inviteRequest, i) => (
                                            <InviteRequestCard key={i} inviteRequest={inviteRequest} />
                                        ))}
                                    </Grid2>
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
                                        You don't have any invite requests.
                                    </Typography>
                                )}
                            </TabPanel>

                            <TabPanel value="2">
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

                            <TabPanel value="3">
                                <ProfileFollowings profile={profile}/>
                            </TabPanel>

                        </Box>
                    </TabContext>
                </Box>
            ) : (
                <>
                    {getInviteRequestsForUserByDate.length > 0 && (
                        <Grid2 xs={12} sm={12} md={12} lg={12}
                            sx={{
                                marginTop: "20px",
                                marginBottom: "10px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontWeight: 'bold',
                                    fontSize: "2rem",
                                    padding: "20px 0px 0px 20px",
                                    marginBottom: "20px",
                                }}
                            >
                                Requests that wait for your response:
                            </Typography>
                        </Grid2>
                    )}

                    {getInviteRequestsForUserByDate.length > 0 && (
                        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} marginBottom="20px">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={50}
                                slidesPerView={matchInvites ? 2 : 3}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                                {getInviteRequestsForUserByDate.map((inviteRequest, i) => (
                                    <SwiperSlide
                                        key={i}
                                    >
                                        <InviteRequestCard inviteRequest={inviteRequest} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Grid2>
                    )}

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