import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Grid2 from "@mui/material/Unstable_Grid2";
import ProfileCard from "../ProfileCard/ProfileCard";
import { Profile } from "../../models/profile";

interface Props {
    profile: Profile;
}

function ProfileFollowings({ profile }: Props) {
    const {profileStore} = useStore();
    const { followings, loadingFollowings, activeTab } = profileStore;
    
    return (
        <Grid2 container spacing={3} width="100%" maxHeight={"100%"}>
            {followings.map((following: Profile) => (
                <Grid2 key={following.username} xs={12} sm={6} md={4} lg={3}>
                    <ProfileCard profile={following} /> 
                </Grid2>
            ))}
        </Grid2>
    );
}

export default observer(ProfileFollowings);