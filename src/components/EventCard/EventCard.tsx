import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import eventImage from '../../assets/elevate-nYgy58eb9aw-unsplash.jpg';
import './style.css';

export default function EventCard() {
    return (
        <div className="eventCard">
            <div className="firstRowCard">
                <div className="eventProfileSectionCard">
                    <Avatar sx={{ bgcolor: deepPurple[500], width: "25px", height: '25px', fontSize: '11px' }}>OP</Avatar>
                    <p>Name Surname</p>
                </div>

                <div className="eventTimePostedCard">
                    <p>5h ago</p>
                </div>
            </div>

            <h3>
                ALISHA'S PARTY
            </h3>

            <p className="categoryCard">
                Category: Party Event
            </p>

            <p className="descriptionCard">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti accusamus consectetur amet natus cupiditate, delectus perferendis ex magnam nam 
            </p>

            <img src={eventImage} alt="event image" className="eventImageCard" />
        </div>
    );
}