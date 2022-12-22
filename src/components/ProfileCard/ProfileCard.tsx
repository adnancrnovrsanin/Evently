import { observer } from "mobx-react-lite";
import { Profile } from "../../models/profile";
import { Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import profilePic from '../../assets/profilna.jpg';
import { Link } from "react-router-dom";

interface Props {
    profile: Profile;
}

function ProfileCard({ profile }: Props) {
    function truncate(str: string | undefined) {
        if (str) {
            return str.length > 40 ? str.substring(0, 37) + '...' : str;
        }
    }

    return (
        <Paper elevation={5} sx={{ height: '100%' }}>
            <Card sx={{ 
                maxWidth: 300, textDecoration: "none", height: "100%",
            }} component={Link} to={`/profile/${profile.username}`}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={profile.image || profilePic}
                    title="profile image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {profile.displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {truncate(profile.bio)}
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    );
}

export default observer(ProfileCard);