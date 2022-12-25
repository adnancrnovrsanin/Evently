import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import InitialLoader from "../InitialLoader/InitialLoader";
import { useStore } from "../../stores/store";
import { useNavigate, useParams } from "react-router-dom";
import EditProfileTextInput from "../../common/form/EditProfileTextInput/EditProfileTextInput";
import { useEffect, useState } from "react";
import { EventFormValues } from "../../models/event";
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import './style.css';
import EventFormSelectInput from "../../common/form/EventFormSelectInput/EventFormSelectInput";
import { categoryOptions } from "../../common/options/categoryOptions";
import EventFormTextInput from "../../common/form/EventFormTextInput/EventFormTextInput";
import Calendar from "../Calendar/Calendar";
import Grid2 from "@mui/material/Unstable_Grid2";
import { anonimityOptions } from "../../common/options/anonimityOptions";
import FormDatePicker from "../../common/form/FormDatePicker/FormDatePicker";
import EventFormTextarea from "../../common/form/EventFormTextarea/EventFormTextarea";
import { Profile } from "../../models/profile";

function EventForm() {
    const { eventStore, userStore: { user } } = useStore();
    const { createEvent, updateEvent, loadingInitial, loadEvent } = eventStore;
    const { id } = useParams();
    const navigate = useNavigate();

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
                        <Box display="flex" flexDirection="column" width={"300px"}>

                            <EventFormTextInput placeholder="Title of your event" name="title" label="Title" />

                            <EventFormSelectInput placeholder="category" name="category" options={categoryOptions} label="Choose a category for your event" />

                            <EventFormTextInput placeholder="Country" name="country" label="Country" />

                            <EventFormTextInput placeholder="City" name="city" label="City" />

                            <EventFormTextInput placeholder="Venue" name="venue" label="Venue" />

                            <EventFormSelectInput placeholder="Anonimity" name="anonimity" options={anonimityOptions} label="Choose anonimity of your event"/>

                            <EventFormTextarea placeholder="Describe your event..." name="description" rows={4} />

                            <button type='submit' className="formPostBtn" disabled={isSubmitting || !isValid || !dirty}>
                                POST
                            </button>
                        </Box>

                        <div className="datePickerForm">
                            <FormDatePicker name="date"/>
                            <Typography sx={{
                                padding: "5px 70px",
                                backgroundColor: "rgb(191, 215, 237)",
                                marginTop: "20px",
                                borderRadius: "10px",
                                fontFamily: "Montserrat, sans-serif",
                                fontStyle: "italic",
                                color: "darkblue",
                                fontWeight: "400",
                            }}>
                                Pick a date for your event
                            </Typography>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default observer(EventForm);