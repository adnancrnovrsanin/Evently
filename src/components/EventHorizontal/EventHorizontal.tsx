import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './style.css';
import { IEvent } from '../../models/event';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';

interface Props {
    event: IEvent;
}

dayjs.extend(relativeTime);

function EventHorizontal ({ event }: Props) {
    return (
        <div className="eventHorizontal">
            <div className="eventImage">

            </div>

            <div className="eventContent">
                <div className="firstRow">
                    <div className="eventProfileSection">
                        <Avatar sx={{ bgcolor: deepPurple[500], width: "25px", height: '25px', fontSize: '11px' }}>OP</Avatar>
                        <p>Name Surname</p>
                    </div>

                    <div className="eventTimePosted">
                        <p>posted: 5h ago</p>
                    </div>

                    <p className={`anonimity ${event.anonimity.toLowerCase()}`}>{event.anonimity}</p>
                </div>

                <p className='eventTitle'>{event.title}</p>

                <div className="thirdRow">
                    <p className="category">
                        Category: {event.category}
                    </p>

                    <div className="eventPlace">
                        <PlaceIcon />
                        <p>{event.venue}, {event.city}, {event.country}</p>
                    </div>
                </div>

                <div className="fourthRow">
                    <p>
                        {event.description}
                    </p>

                    <div className="timeUntil">
                        <AccessTimeIcon sx={{ width: '15px' }} />
                        <p>{event.date?.fromNow()}</p>
                    </div>
                </div>
            </div>
      </div>
    );
}

export default observer(EventHorizontal);