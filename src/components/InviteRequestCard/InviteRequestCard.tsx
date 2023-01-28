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
import { InviteRequest } from "../../models/inviteRequest";
import { LoadingButton } from "@mui/lab";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

interface Props {
    inviteRequest: InviteRequest;
}

dayjs.extend(relativeTime);

function InviteRequestCard({ inviteRequest }: Props) {
    const navigate = useNavigate();
    const { eventStore } = useStore();
    const { acceptInviteRequest, removeInviteRequest, loading } = eventStore;

    return (
        <div className="inviteRequestCard">
            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "20px",
                    borderBottom: "1px solid #e6e6e6",
                    '&:hover': {
                        cursor: "pointer",
                        bgcolor: "#e6e6e6"
                    }
                }}
                component="div"
                onClick={() => navigate(`/profile/${inviteRequest.username}`)}
            >
                <Avatar variant="square" alt="Profile photo" src={inviteRequest?.image} {...stringAvatar(inviteRequest.displayName!)} sx={{
                    bgcolor: stringToColor(inviteRequest.username!),
                    width: '30px',
                    height: '30px',
                    fontSize: '0.8rem',
                    marginRight: "10px", 
                }} />
                <Typography
                    sx={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1rem", xl: "1rem" },
                    }}
                >
                    <span style={{
                        fontWeight: "bold",
                        color: "dodgerblue",
                    }}>{inviteRequest.displayName}</span> wants to join your event
                </Typography>
            </Grid2>
            
            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    '&:hover': {
                        cursor: "pointer",
                        bgcolor: "#e6e6e6"
                    }
                }}
                component="div"
                onClick={() => navigate(`/events/${inviteRequest.event.id}`)}
            >
                {inviteRequest.event.isCancelled && (
                    <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                        sx={{
                            backgroundColor: inviteRequest.event.isCancelled ? "red" : "green",
                            marginBottom: "20px",
                        }}
                    >
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
                    </Grid2>
                )}

                <div className="firstRowCard">
                    <div className="eventProfileSectionCard">
                        <Avatar variant="square" alt="Profile photo" src={inviteRequest.event.host?.image} {...stringAvatar(inviteRequest.event.host?.displayName!)} sx={{
                            bgcolor: stringToColor(inviteRequest.event.host?.username!),
                            width: '30px',
                            height: '30px',
                            fontSize: '0.8rem',
                            marginRight: "10px",
                        }} />
                        <p>{inviteRequest.event.host?.displayName}</p>
                    </div>

                    <div className="eventTimePostedCard">
                        <AccessTimeIcon sx={{ width: '15px', marginRight: "5px" }} />
                        <p>{dayjs(inviteRequest.event.date)?.fromNow()}</p>
                    </div>
                </div>

                <h3>
                    {inviteRequest.event.title}
                </h3>

                <p className="categoryCard">
                    Category: {inviteRequest.event.category}
                </p>

                <p className="descriptionCard">
                    {truncate(inviteRequest.event.description, 150)} 
                </p>

                <img src={getCategoryImage(inviteRequest.event.category)} alt="event image" className="eventImageCard" />
            </Grid2>

            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px",
                    borderTop: "1px solid #e6e6e6",
                }}
            >
                <LoadingButton
                    variant="outlined"
                    loadingPosition="center"
                    loading={loading}
                    color="success"
                    onClick={() => acceptInviteRequest(inviteRequest.event.id, inviteRequest.username)}
                >
                    <CheckIcon />
                </LoadingButton>

                <LoadingButton
                    variant="outlined"
                    loading={loading}
                    color="error"
                    onClick={() => removeInviteRequest(inviteRequest.event.id, inviteRequest.username)}
                >
                    <CloseIcon />
                </LoadingButton>
            </Grid2>
        </div>
    );
}

export default observer(InviteRequestCard);