import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { observer } from "mobx-react-lite"
import { useEffect } from "react";
import { useStore } from "../../stores/store";
import React from "react";
import { stringAvatar, stringToColor } from "../../helpers/usefulFunctions";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

function AdminDashboard() {
    const { adminStore: { getReportedUsers, users, deleteReportedUser } } = useStore();

    useEffect(() => {
        getReportedUsers();
    }, [getReportedUsers]);

    return (
        <Grid2 lg={6} container sx={{ marginInline: "auto" }}>
            <Grid2 lg={12}>
                <Typography
                    sx={{
                        fontSize: 32,
                        fontWeight: 600,
                        color: "#000000",
                        marginTop: 2,
                        marginBottom: 2,
                        textAlign: "center",
                    }}
                >
                    List of reported users
                </Typography>

                {users.length === 0 ? (
                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 400,
                            color: "#000000",
                            marginTop: 2,
                            marginBottom: 2,
                        }}
                    >
                        There are no reported users
                    </Typography>
                ) : (
                    <List>
                        {users.map(user => (
                            <ListItem key={user.username}>
                                <ListItemAvatar>
                                    <Avatar variant="square" alt="Profile photo" src={user.image} {...stringAvatar(user.displayName!)} sx={{
                                        bgcolor: stringToColor(user.username!),
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
                                                }}
                                                component={Link}
                                                to={`/profile/${user.username}`}
                                            >
                                                {user.displayName}
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
                                                to={`/profile/${user.username}`}
                                            >
                                                {user.username}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete"
                                        onClick={() => deleteReportedUser(user.username)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        
                    </List>
                )}
            </Grid2>
        </Grid2>
    )
}

export default observer(AdminDashboard);