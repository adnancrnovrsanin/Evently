import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import InitialLoader from "../InitialLoader/InitialLoader";
import { useStore } from "../../stores/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EventFormValues } from "../../models/event";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import './style.css';
import EventFormSelectInput from "../../common/form/EventFormSelectInput/EventFormSelectInput";
import { categoryOptions } from "../../common/options/categoryOptions";
import EventFormTextInput from "../../common/form/EventFormTextInput/EventFormTextInput";
import { anonimityOptions } from "../../common/options/anonimityOptions";
import FormDatePicker from "../../common/form/FormDatePicker/FormDatePicker";
import EventFormTextarea from "../../common/form/EventFormTextarea/EventFormTextarea";
import { LoadingButton } from "@mui/lab";

function EventForm() {
    const { eventStore, userStore: { user } } = useStore();
    const { createEvent, updateEvent, loadingInitial, loadEvent, loading } = eventStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const calendarLabelMatch = useMediaQuery('(max-width: 900px)');

    const [event, setEvent] = useState<EventFormValues>(new EventFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),
        category: Yup.string().required('The event category is required'),
        description: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        country: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
        anonimity: Yup.string().required(),
    });

    useEffect(() => {
        if (id) loadEvent(id).then(event => setEvent(new EventFormValues(event)));
    },[id, loadEvent])

    function handleFormSubmit(event: EventFormValues) {
        if (!event.id) {
            let newEvent = {
                ...event,
                id: uuid()
            }
            createEvent(newEvent).then(() => navigate(`/events/${newEvent.id}`));
        } else {
            updateEvent(event).then(() => navigate(`/events/${event.id}`));
        }
    }

    if (loadingInitial) return <InitialLoader adding="event creator"/>

    return (
        <div className="formAndTitle">
            <h1>Create an unforgettable <span>event</span></h1>

            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={event}
                onSubmit={values =>  handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} className="createEvent" autoComplete='off'>
                        <Box display="flex" flexDirection="column" width={"300px"}
                            sx={{
                                marginTop: calendarLabelMatch ? "40px" : "0px",
                            }}
                        >

                            <EventFormTextInput placeholder="Title of your event" name="title" label="Title" />

                            <EventFormSelectInput placeholder="category" name="category" options={categoryOptions} label="Choose a category for your event" />

                            <EventFormTextInput placeholder="Country" name="country" label="Country" />

                            <EventFormTextInput placeholder="City" name="city" label="City" />

                            <EventFormTextInput placeholder="Venue" name="venue" label="Venue" />

                            <EventFormSelectInput placeholder="Anonimity" name="anonimity" options={anonimityOptions} label="Choose anonimity of your event"/>

                            <EventFormTextarea placeholder="Describe your event..." name="description" rows={4} />

                            <LoadingButton type='submit' 
                                disabled={isSubmitting || !isValid || !dirty}
                                variant="contained"
                                sx={{
                                    padding: "3px 25px",
                                    width: "fit-content",
                                    borderRadius: "7px",
                                    backgroundColor: "white",
                                    fontFamily: "Montserrat, sans-serif",
                                    fontStyle: "italic",
                                    border: "0.5px solid grey",
                                    marginTop: "15px",
                                    alignSelf: "flex-end",
                                    fontWeight: "400",
                                    color: "black",
                                    '&:hover': {
                                        backgroundColor: "rgb(191, 215, 237)",
                                        color: 'black',
                                    },
                                }}
                                loading={isSubmitting || loading}
                            >
                                POST
                            </LoadingButton>
                        </Box>

                        <div className="datePickerForm">
                            <FormDatePicker name="date"/>
                            {!calendarLabelMatch && (
                                <Typography sx={{
                                    padding: { xs: "5px 20px", sm: "5px 20px", md: "5px 20px", lg: "5px 2px", xl: "5px 20px" },
                                    backgroundColor: "rgb(191, 215, 237)",
                                    marginTop: "20px",
                                    // borderRadius: "10px",
                                    fontFamily: "Montserrat, sans-serif",
                                    fontStyle: "italic",
                                    color: "black",
                                    fontWeight: "400",
                                    fontSize: { xs: "10px", sm: "14px", md: "14px", lg: "14px", xl: "14px" },
                                }}>
                                    Pick a date for your event using the calendar above
                                </Typography>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default observer(EventForm);