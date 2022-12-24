import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { observer } from "mobx-react-lite";
import { IEvent } from "../../models/event";
import { stringToColor, stringAvatar } from "../../helpers/usefulFunctions";
import { ChatComment } from "../../models/comment";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

interface Props {
    comment: ChatComment;
}

function Comment({ comment }: Props) {
    return (
        <Grid2 lg={12} display="flex" flexDirection="column">
            <Divider />
            <Grid2 lg={12} display="flex" alignItems="center">
                <Avatar variant="square" alt="Profile photo" src={comment.image} {...stringAvatar(comment.displayName!)} sx={{
                    bgcolor: stringToColor(comment.username!),
                }} />

                <Typography 
                    sx={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: "800",
                        color: "dodgerblue",
                        marginLeft: "10px",
                        textDecoration: "none",
                    }}
                    component={Link}
                    to={`/profile/${comment.username}`}
                >
                    {comment.displayName}
                </Typography>

                <Typography
                    sx={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: "800",
                        color: "grey",
                        fontSize: "0.8rem",
                        marginLeft: "50px",
                    }}
                >
                    {comment.createdAt && dayjs(comment.createdAt).format('MMMM D, YYYY h:mm A')}
                </Typography>
            </Grid2>

            <Grid2 lg={12}>
                <Typography
                    sx={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: "500",
                        color: "black",
                        fontSize: "1.2rem",
                        marginLeft: "40px",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {comment.body}
                </Typography>
            </Grid2>

            
        </Grid2>
    );
}

export default observer(Comment);