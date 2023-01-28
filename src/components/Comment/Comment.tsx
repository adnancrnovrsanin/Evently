import { Avatar, Divider, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { observer } from "mobx-react-lite";
import { stringToColor, stringAvatar } from "../../helpers/usefulFunctions";
import { ChatComment } from "../../models/comment";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

interface Props {
    comment: ChatComment;
}

function Comment({ comment }: Props) {
    return (
        <Grid2 xs={12} sm={12} md={12} lg={12} display="flex" flexDirection="column">
            <Divider />
            <Grid2 xs={12} sm={12} md={12} lg={12} display="flex" alignItems="center">
                <Avatar variant="square" alt="Profile photo" src={comment.image} {...stringAvatar(comment.displayName!)} sx={{
                    bgcolor: stringToColor(comment.username!),
                    width: { xs: "30px", sm: "40px", md: "40px", lg: "50px" },
                    height: { xs: "30px", sm: "40px", md: "40px", lg: "50px" },
                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1.2rem" },
                }} />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        marginLeft: "20px",
                    }}
                >
                    <Typography 
                        sx={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: "800",
                            color: "dodgerblue",
                            textDecoration: "none",
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" },
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
                            fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem", lg: "0.9rem" },
                        }}
                    >
                        {comment.createdAt && dayjs(comment.createdAt).format('MMMM D, YYYY h:mm A')}
                    </Typography>
                </div>
            </Grid2>

            <Grid2 xs={12} sm={12} md={12} lg={12}>
                <Typography
                    sx={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: "500",
                        color: "black",
                        fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" },
                        marginInline: "auto",
                        whiteSpace: "pre-wrap",
                        maxWidth: { xs: "300px", sm: "500px", md: "700px", lg: "850px", xl: "850px" },
                    }}
                >
                    {comment.body}
                </Typography>
            </Grid2>

            
        </Grid2>
    );
}

export default observer(Comment);