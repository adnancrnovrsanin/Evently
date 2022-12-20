import { Typography } from "@mui/material";
import profilePic from "../../assets/profilna.jpg";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import '../../pages/ProfilePage/style.css';

function ProfileInfo() {
    const { profileStore } = useStore();
    const { profile } = profileStore;
    const lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, consequuntur qui ex eum cumque itaque ut magnam obcaecati explicabo doloribus porro, nulla eveniet maxime quam tenetur fugit, blanditiis saepe ducimus?";

    if (!profile) return <h2>Problem loading profile</h2>

    return (
        <div className="profileInfoContainer">
            <div className="topPartProfile">
                <div className="profilna" style={{ backgroundImage: `url(${ profile.image ? profile.image : profilePic })`}}></div>
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
                            fontFamily: "Montserrat, sans-serif"
                        }}>
                            {profile.displayName.split(" ")[1]}
                        </Typography>
                    </div>

                    <div className="followInfo">
                        <div className="followCount" style={{ marginRight: "50px" }}>
                            <p>{profile.followersCount}</p>
                            <p>followers</p>
                        </div>

                        <div className="followCount">
                            <p>{profile.followingCount}</p>
                            <p>following</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Typography sx={{ 
                width: "500px",
                height: "150px",
                border: "1px solid purple",
                padding: "3px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                marginTop: "20px",
            }}>
                {profile.bio ? profile.bio : lorem}
            </Typography>
        </div>
    );
}

export default observer(ProfileInfo);