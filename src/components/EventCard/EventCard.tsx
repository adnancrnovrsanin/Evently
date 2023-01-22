import { Avatar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { IEvent } from "../../models/event";
import './style.css';
import { getCategoryImage, stringToColor, stringAvatar, truncate } from "../../helpers/usefulFunctions";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2";

interface Props {
    event: IEvent;
    style?: any;
}

dayjs.extend(relativeTime);

export default function EventCard({ event, style }: Props) {
    const navigate = useNavigate();

    return (
        <div className="eventCard"
            style={{
                backgroundColor: event.isGoing ? '#ACCAF2' : 'white',
                ...style
            }}
            onClick={() => navigate(`/events/${event.id}`)}
        >
            <Grid2 width="100%"
                sx={{
                    backgroundColor: event.isCancelled ? "red" : "green",
                    marginBottom: "20px",
                }}
            >
                {event.isCancelled ? (
                    <Typography
                        sx={{
                            fontFamily: 'Playfair Display, serif',
                            fontStyle: "italic",
                            color: "white",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Cancelled
                    </Typography>
                ) : (event.isGoing && (
                    <Typography
                        sx={{
                            fontFamily: 'Playfair Display, serif',
                            fontStyle: "italic",
                            color: "white",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Booked
                    </Typography>
                ))}
            </Grid2>

            <div className="firstRowCard">
                <div className="eventProfileSectionCard">
                    <Avatar variant="square" alt="Profile photo" src={event.host?.image} {...stringAvatar(event.host?.displayName!)} sx={{
                        bgcolor: stringToColor(event.host?.username!),
                        width: '30px',
                        height: '30px',
                        fontSize: '0.8rem',
                    }} />
                    <p>{event.host?.displayName}</p>
                </div>

                <div className="eventTimePostedCard">
                    <AccessTimeIcon sx={{ width: '15px' }} />
                    <p>{dayjs(event.date)?.fromNow()}</p>
                </div>
            </div>

            <h3>
                {event.title}
            </h3>

            <p className="categoryCard">
                Category: {event.category}
            </p>

            <p className="descriptionCard">
                {truncate(event.description, 150)} 
            </p>

            <img src={getCategoryImage(event.category)} alt="event image" className="eventImageCard" />
        </div>
    );
}