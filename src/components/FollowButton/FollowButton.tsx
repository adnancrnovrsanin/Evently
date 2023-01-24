import { observer } from "mobx-react-lite";
import { Profile } from "../../models/profile";
import { useStore } from "../../stores/store";
import { SyntheticEvent, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
    profile: Profile;
}

function FollowButton({ profile }: Props) {
    const {profileStore, userStore} = useStore();
    const {updateFollowing, loading} = profileStore;

    if (userStore.user?.username === profile?.username) return null;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        profile?.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }
    
    return (
        <Paper elevation={profile?.following ? 0 : 3} sx={{ borderRadius: "10px", marginTop: '20px' }}>
            <LoadingButton sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: profile?.following ? '1.5px solid #ff0000' : '1.5px solid #00ff00',
                    padding: '3px 20px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    outline: 'none',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease-in-out',
                    width: '100%',
                    textTransform: 'none',
                }}
                loading={loading}
                onClick={(e) => handleFollow(e, profile?.username!)}
            >
                {profile?.following ? 'Unfollow' : 'Follow'}
            </LoadingButton>
        </Paper>
    );
}

export default observer(FollowButton);