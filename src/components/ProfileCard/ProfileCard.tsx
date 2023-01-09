import { observer } from "mobx-react-lite";
import { Profile } from "../../models/profile";
import { Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import profilePic from '../../assets/profilna.jpg';
import { Link } from "react-router-dom";
import { stringAvatar, styleHelper, truncate } from "../../helpers/usefulFunctions";

interface Props {
    profile: Profile;
}

function ProfileCard({ profile }: Props) {
    return (
        <Paper elevation={5} sx={{ height: '100%' }}>
            <Card sx={{ 
                maxWidth: 300, textDecoration: "none", height: "100%"
            }} component={Link} to={`/profile/${profile.username}`}>
                <CardMedia
                    sx={{ 
                        ...styleHelper(profile),
                        height: 140,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    image={profile.image}
                    title="profile image"
                >
                    {!profile.image && <Typography sx={{
                        fontSize: "65px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "white"
                    }}>
                        {profile.displayName.split(' ').length > 1 ? `${profile.displayName.split(' ')[0][0]}${profile.displayName.split(' ')[1][0]}` : `${profile.displayName[0]}`}
                    </Typography>}
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {profile.displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {truncate(profile.bio, 100)}
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    );
}

export default observer(ProfileCard);