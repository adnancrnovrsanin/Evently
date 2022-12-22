import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Grid2 from "@mui/material/Unstable_Grid2";
import ProfileCard from "../ProfileCard/ProfileCard";
import { Profile } from "../../models/profile";
import { CircularProgress, Typography } from "@mui/material";

interface Props {
    profile: Profile;
}

function ProfileFollowings({ profile }: Props) {
    const {profileStore} = useStore();
    const { followings, loadingFollowings, activeTab } = profileStore;
    
    return (
        <Grid2 container spacing={3} width="100%" maxHeight={"100%"}>
            <Grid2 xl={12} md={12} xs={12} sm={12} sx={{ lineHeight: '40px' }}>
                <h1>{profile.displayName}'s {activeTab === '3' ? 'Followers' : 'Followings'}</h1>
            </Grid2>
            {loadingFollowings ? (
                <CircularProgress sx={{ 
                    margin: 'auto',
                 }} color="secondary" />
            ) : (
                followings.length > 0 ? (
                    followings.map((following: Profile) => (
                        <Grid2 key={following.username} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <ProfileCard profile={following} /> 
                        </Grid2>
                    ))
                ) : (
                    <Grid2 xl={12}>
                        <Typography variant="body1" gutterBottom>No {activeTab === '3' ? 'followers' : 'followings'} found</Typography>
                    </Grid2>
                )
            )}
        </Grid2>
    );
}

export default observer(ProfileFollowings);