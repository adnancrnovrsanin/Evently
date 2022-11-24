import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import eventImage from '../../assets/elevate-nYgy58eb9aw-unsplash.jpg';
import { IEvent } from "../../models/event";
import './style.css';

interface Props {
    event: IEvent;
}

export default function EventCard({ event }: Props) {
    return (
        <div className="eventCard">
            <div className="firstRowCard">
                <div className="eventProfileSectionCard">
                    <Avatar sx={{ bgcolor: deepPurple[500], width: "25px", height: '25px', fontSize: '11px' }}>OP</Avatar>
                    <p>Name Surname</p>
                </div>

                <div className="eventTimePostedCard">
                    <p>posted: 5h ago</p>
                </div>
            </div>

            <h3>
                {event.title}
            </h3>

            <p className="categoryCard">
                Category: {event.category}
            </p>

            <p className="descriptionCard">
                {event.description} 
            </p>

            <img src={eventImage} alt="event image" className="eventImageCard" />
        </div>
    );
}