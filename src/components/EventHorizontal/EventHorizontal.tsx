import { Avatar, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
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

interface Props {
    event: IEvent;
}

dayjs.extend(relativeTime);

function EventHorizontal ({ event }: Props) {
    const { userStore } = useStore();
    const navigate = useNavigate();
    return (
        <div className="eventHorizontal"
            style={{
                backgroundColor: event.attendees?.some(a => a.username === userStore.user?.username) ? 'rgba(0, 255, 0, 0.1)' : 'white',
            }}
        >
            <div className="eventImage"
                style={{
                    backgroundImage: `url(${getCategoryImage(event.category)})`,
                }}
            ></div>

            <div className="eventContent">
                <div className="firstRow">
                    <div className="eventProfileSection">
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
    );
}

export default observer(EventHorizontal);