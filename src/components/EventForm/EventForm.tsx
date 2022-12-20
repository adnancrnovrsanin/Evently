import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import InitialLoader from "../InitialLoader/InitialLoader";
import { useStore } from "../../stores/store";
import { useNavigate, useParams } from "react-router-dom";
import EditProfileTextInput from "../../common/form/EditProfileTextInput/EditProfileTextInput";
import { useEffect, useState } from "react";
import { EventFormValues } from "../../models/event";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import './style.css';
import EventFormSelectInput from "../../common/form/EventFormSelectInput/EventFormSelectInput";
import { categoryOptions } from "../../common/options/categoryOptions";

function EventForm() {
    const { eventStore } = useStore();
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
                onSubmit={values =>  handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} className='createEvent' autoComplete='off'>
                        <TextField id="standard-basic" label="Title of the event" variant="standard" sx={{ fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }} />

                        <TextField id="standard-basic" label="Standard" variant="standard"  sx={{ fontFamily: "'Montserrat', sans-serif", fontStyle: "italic", marginTop: '20px' }} />

                        <EventFormSelectInput placeholder="category" name="category" options={categoryOptions} />

                        <TextField
                            id="outlined-multiline-static"
                            label="Describe your event..."
                            multiline
                            rows={4}
                            sx={{ 
                                borderRadius: "1px",
                                backgroundColor: "white"
                            }}
                        />

                        <button type='submit' className="formPostBtn">
                            {isSubmitting ? (
                                <CircularProgress color="secondary"/>
                            ) : "POST"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default observer(EventForm);