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

interface Props {
    eventId: string;
}

function CommentSection({ eventId }: Props) {
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
        <Grid2 lg={12} container marginTop="50px">
            <Grid2 lg={12}
                component={Paper}
                elevation={3}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: "white",
                    padding: "10px 20px",
                    borderRadius: "10px 10px 0 0",
                    border: "1px solid purple",
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

            <Grid2 lg={12} 
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
                <Formik
                    onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{ body: '' }}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form style={{ width: "100%" }}>
                            <Field name="body">
                                {(props: FieldProps) => (
                                    <div>
                                        {isSubmitting && <CircularProgress color="secondary" sx={{ margin: "20px" }}/>}
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
                                                width: "100%",
                                                border: "1px solid purple",
                                                fontFamily: "Montserrat, sans-serif",
                                                fontWeight: 500,
                                                marginTop: "20px",
                                                borderRadius: "3px",
                                                padding: '20px',
                                            }}

                                            error={props.meta.touched && Boolean(props.meta.error)}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </Grid2>
        </Grid2>
    );
}

export default observer(CommentSection);