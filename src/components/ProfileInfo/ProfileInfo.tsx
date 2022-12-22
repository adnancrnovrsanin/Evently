import { Typography } from "@mui/material";
import profilePic from "../../assets/profilna.jpg";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import '../../pages/ProfilePage/style.css';
import FollowButton from "../FollowButton/FollowButton";
import { Profile } from "../../models/profile";
import { stringToColor, styleHelper } from "../../helpers/usefulFunctions";

interface Props {
    profile: Profile;
}

function ProfileInfo({ profile }: Props) {
    const { profileStore } = useStore();
    const { setActiveTab } = profileStore;

    if (!profile) return <h2>Problem loading profile</h2>

    return (
        <div className="profileInfoContainer">
            <div className="topPartProfile">
                <div className="profilna" style={{ 
                    ...styleHelper(profile),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {!profile.image && <Typography sx={{
                        fontSize: "100px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "white"
                    }}>
                        {profile.displayName.split(" ")[0][0]}
                    </Typography>}
                </div>
                <div className="profileInfo">
                    <div className="displayNameContainer">
                        <Typography sx={{
                            borderBottom: "1px solid purple",
                            fontSize: "15px",
                            fontFamily: "Montserrat, sans-serif"
                        }}>
                            {profile.displayName.split(" ")[0]}
                        </Typography>

                        <Typography sx={{
                            borderBottom: "1px solid purple",
                            fontSize: "15px",
                            marginTop: "10px",
                            marginBottom: "20px",
                            fontFamily: "Montserrat, sans-serif"
                        }}>
                            {profile.displayName.split(" ")[1]}
                        </Typography>
                    </div>

                    <div className="followInfo">
                        <div className="followCount" style={{ marginRight: "50px", cursor: "pointer" }} onClick={() => setActiveTab('3')}>
                            <p>{profile.followersCount}</p>
                            <p>followers</p>
                        </div>

                        <div className="followCount" style={{ cursor: "pointer" }} onClick={() => setActiveTab('4')}>
                            <p>{profile.followingCount}</p>
                            <p>following</p>
                        </div>
                    </div>

                    <FollowButton profile={profile} />
                </div>
            </div>
            
            <Typography sx={{ 
                width: "500px",
                height: "150px",
                border: "1px solid purple",
                padding: "3px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: profile.bio ? "500" : "normal",
                marginTop: "20px",
                fontStyle: profile.bio ? "normal" : "italic",
                fontSize: profile.bio ? "15px" : "13px",
                color: profile.bio ? "black" : "gray"
            }}>
                {profile.bio ? profile.bio : "This user has no bio"}
            </Typography>
        </div>
    );
}

export default observer(ProfileInfo);