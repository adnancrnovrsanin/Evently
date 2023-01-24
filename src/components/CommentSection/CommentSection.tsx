import { Textarea } from "@mui/joy";
import { Paper, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Formik, Field, FieldProps } from "formik";
import { Form } from "react-router-dom";
import commentStore from "../../stores/commentStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../stores/store";
import * as Yup from "yup";
import Comment from "../Comment/Comment";
import { LoadingButton } from "@mui/lab";

interface Props {
    eventId: string;
    isJoined: boolean;
    isCancelled?: boolean;
}

function CommentSection({ eventId, isJoined, isCancelled }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (eventId) {
            commentStore.createHubConnection(eventId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, eventId]);
    return (
        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}  container marginTop="50px">
            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                component={Paper}
                elevation={3}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: "white",
                    padding: "10px 20px",
                    borderRadius: "10px 10px 0 0",
                    border: "2px solid rgb(179, 11, 179)",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Playfair Display, serif",
                        color: "darkblue",
                        fontSize: "1.5rem",
                    }}
                >
                    Chat about this event
                </Typography>
            </Grid2>

            {(isJoined && !isCancelled) ? (
                <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                    sx={{
                        bgcolor: "background.paper",
                        padding: "20px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: "2px solid lightgrey",
                        borderTop: "none",
                    }}
                >
                    <Formik
                        onSubmit={(values, { resetForm }) => {
                            if (values.body.trim() !== "") {
                                commentStore.addComment(values).then(() => resetForm())
                            } else {
                                resetForm();
                            }
                        }}
                        initialValues={{ body: '' }}
                        validationSchema={Yup.object({
                            body: Yup.string().required()
                        })}
                    >
                        {({ isSubmitting, isValid, handleSubmit, dirty }) => (
                            <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                                <Field name="body">
                                    {(props: FieldProps) => (
                                        <div>
                                            <Textarea
                                                color="info"
                                                variant="outlined"
                                                {...props.field}
                                                placeholder="Write your comment here..."
                                                minRows={4}
                                                maxRows={5}
                                                onKeyUp={(e: any) => {
                                                    if (e.key === 'Enter' && e.shiftKey) {
                                                        return;
                                                    } 

                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        isValid && handleSubmit();
                                                    }
                                                }}

                                                sx={{
                                                    border: "1px solid purple",
                                                    fontFamily: "Montserrat, sans-serif",
                                                    fontWeight: 500,
                                                    marginTop: "20px",
                                                    borderRadius: "3px",
                                                    padding: '20px',
                                                }}
                                                
                                                error={props.meta.touched && Boolean(props.meta.error)}
                                            />
                                            
                                            {isSubmitting && <CircularProgress color="secondary" sx={{ margin: "20px" }}/>}
                                        </div>
                                    )}
                                </Field>

                                <LoadingButton
                                    variant="contained"
                                    color="secondary"
                                    loading={isSubmitting}
                                    disabled={!isValid || isSubmitting || !dirty}
                                    type="submit"
                                    sx={{
                                        float: "right",
                                        margin: "10px",
                                    }}
                                >
                                    POST
                                </LoadingButton>
                            </Form>
                        )}
                    </Formik>
                    {commentStore.comments.length > 0 ? (
                        commentStore.comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <Typography
                            sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: 'darkblue',
                                fontWeight: "bold",
                                margin: "50px",
                                textAlign: "center",
                            }}
                        >
                            No comments yet
                        </Typography>
                    )}
                </Grid2>
            ) : (
                <Grid2 xs={12} sm={12} md={12} lg={12} 
                    sx={{
                        bgcolor: "rgba(181, 154, 216, 0.464)",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Playfair Display, serif",
                            color: "darkblue",
                            fontSize: "1.5rem",
                            textAlign: "center",
                            margin: "50px",
                        }}
                    >
                        Comment section is not available <br />
                        {isCancelled ? "This event has been cancelled" : "You need to join this event to comment"}
                    </Typography>
                </Grid2>
            )}
        </Grid2>
    );
}

export default observer(CommentSection);