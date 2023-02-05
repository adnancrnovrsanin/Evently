import { Avatar, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './style.css';
import { IEvent } from '../../models/event';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { getCategoryImage, makeFirstLetterCapital, stringAvatar, stringToColor, truncate } from '../../helpers/usefulFunctions';
import { useStore } from '../../stores/store';
import Grid2 from '@mui/material/Unstable_Grid2';

interface Props {
    event: IEvent;
}

dayjs.extend(relativeTime);

function EventHorizontal ({ event }: Props) {
    const { userStore } = useStore();
    const navigate = useNavigate();
    return (
        <Grid2 width="662px" container>
            {event.isCancelled && (
                <Grid2 lg={12}
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
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                        }}
                    >
                        Canceled
                    </Typography>
                </Grid2>
            )}

            <Grid2 lg={12}>
                <div className="eventHorizontal"
                    style={{
                        backgroundColor: event.attendees?.some(a => a.username === userStore.user?.username) ? '#BCE0FD' : 'white',
                    }}
                >
                    <div className="eventImage"
                        style={{
                            backgroundImage: `url(${getCategoryImage(event.category)})`,
                        }}
                    ></div>

                    <div className="eventContent">
                        <div className="firstRow">
                            <div className="eventProfileSection"
                                onClick={() => navigate(`/profile/${event.host?.username}`)}
                            >
                                <Avatar variant="square" alt="Profile photo" src={event.host?.image} {...stringAvatar(event.host?.displayName!)} sx={{
                                    bgcolor: stringToColor(event.host?.username!),
                                    width: '30px',
                                    height: '30px',
                                    fontSize: '0.8rem',
                                }} />
                                <p>{event.host?.displayName}</p>
                            </div>

                            {event.attendees?.some(a => a.username === userStore.user?.username) && (
                                <Typography
                                    sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: "800",
                                        color: "green",
                                        fontSize: "0.8rem",
                                        alignSelf: "flex-start"
                                    }}
                                >
                                    BOOKED
                                </Typography>
                            )}
                            
                            <p className={`anonimity ${event.anonimity.toLowerCase()}`}>{event.anonimity}</p>
                        </div>

                        <p className='eventTitle' onClick={() => navigate(`/events/${event.id}`)}>{event.title}</p>

                        <div className="thirdRow">
                            <p className="category">
                                Category: {makeFirstLetterCapital(event.category)}
                            </p>

                            <div className="eventPlace">
                                <PlaceIcon />
                                <p>{event.venue}, {event.city}, {event.country}</p>
                            </div>
                        </div>

                        <div className="fourthRow">
                            <p>
                                {truncate(event.description, 150)}
                            </p>
                        </div>

                        <div className="timeUntil">
                            <AccessTimeIcon sx={{ width: '15px' }} />
                            <p>{dayjs(event.date)?.fromNow()}</p>
                        </div>
                    </div>
            </div>
            </Grid2>
        </Grid2>
    );
}

export default observer(EventHorizontal);