import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import Grid2 from "@mui/material/Unstable_Grid2";
import EventPlaceholder from "../../components/EventPlaceholder/EventPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import EventList from "../../components/EventList/EventList";
import { PagingParams } from "../../models/pagination";
import { Field, FieldProps, Form, Formik } from "formik";
import { IconButton, TextField, Typography } from "@mui/material";
import './style.css';
import Calendar from "../../components/Calendar/Calendar";
import SortIcon from '@mui/icons-material/Sort';

function SearchPage() {
    const { eventStore } = useStore();
    const { loadEvents, setPagingParams, pagination, setPredicate, predicate, eventsByDate } = eventStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadEvents().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    return (
        <Grid2 lg={9} container
            sx={{
                alignSelf: "center",
                marginTop: "50px",
            }}
        >
            <Grid2 lg={9} container>
                <Grid2 lg={12} display="flex" container>
                    <Grid2 lg={9}>
                        <Formik
                            onSubmit={(values, { resetForm }) => {
                                setPredicate('searchQuery', values.searchQuery);
                                resetForm();
                            }}
                            initialValues={{ searchQuery: '' }}
                        >
                            {({ isSubmitting }) => (
                                <Form style={{ width: "92.5%" }}>
                                    <Field name="searchQuery">
                                        {(props: FieldProps) => (
                                            <input
                                                {...props.field}
                                                placeholder="Search for events by name, category, location, host..."
                                                id="searchBox"
                                            />
                                        )}
                                    </Field>
                                </Form>
                            )}
                        </Formik>
                    </Grid2>
                    
                    <Grid2 lg={3} display="flex" alignItems="flex-start" justifyContent="flex-start">
                        <IconButton
                            sx={{
                                color: "black",
                                marginTop: "10px"
                            }}
                        >
                            <SortIcon />
                        </IconButton>

                        <Typography
                            sx={{
                                padding: "20px",
                                fontSize: "14px",
                                fontWeight: "800",
                                color: "#000000",
                                '&:hover': {
                                    cursor: "pointer",
                                    color: "gray",
                                }
                            }}
                        >
                            {"FILTER >"}
                        </Typography>
                    </Grid2>
                </Grid2>

                <Grid2 lg={9} container>
                    {eventStore.loadingInitial && !loadingNext ? (
                        <Grid2 lg={12}>
                            <EventPlaceholder />
                            <EventPlaceholder />
                            <EventPlaceholder />
                            <EventPlaceholder />
                            <EventPlaceholder />
                        </Grid2>
                    ) : (
                        eventsByDate.length === 0 ? (
                            <Grid2 lg={12} textAlign="left">
                                <h1 style={{ lineHeight: "35px" }}>There are no events that meet your search criteria</h1>
                            </Grid2>
                        ) : (
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={handleGetNext}
                                hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                                initialLoad={false}
                            >
                                <EventList />
                            </InfiniteScroll>
                        )
                    )}
                </Grid2>

                <Grid2 lg={3} display="flex" flexDirection="column" container>
                    <Grid2 lg={12} height="150px"></Grid2>
                    <Grid2 lg={12} marginLeft="60px">
                        <Calendar />
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}

export default observer(SearchPage);