import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import Grid2 from "@mui/material/Unstable_Grid2";
import EventPlaceholder from "../../components/EventPlaceholder/EventPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import EventList from "../../components/EventList/EventList";
import { PagingParams } from "../../models/pagination";
import { Field, FieldProps, Form, Formik } from "formik";
import { Button, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material";
import './style.css';
import Calendar from "../../components/Calendar/Calendar";
import SortIcon from '@mui/icons-material/Sort';

function SearchPage() {
    const { eventStore } = useStore();
    const { loadEvents, setPagingParams, pagination, setPredicate, predicate, eventsByDate, resetPredicate } = eventStore;
    const [loadingNext, setLoadingNext] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadEvents().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadEvents();

        return () => resetPredicate();
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
                                // resetForm();
                            }}
                            initialValues={{ searchQuery: predicate.get('searchQuery') }}
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

                        <Button
                            id="demo-positioned-button"
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{
                                color: "black",
                                marginTop: "10px",
                                marginLeft: "10px",
                                fontSize: "14px",
                                fontWeight: "800",
                                fontFamily: "Montserrat, sans-serif",

                            }}
                        >
                            {"FILTER >"}
                        </Button>

                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={() => {
                                setPredicate('all', 'true');
                                handleClose();
                            }}>All events</MenuItem>
                            <MenuItem onClick={() => {
                                setPredicate('isHost', 'true');
                                handleClose();
                            }}>I'm hosting</MenuItem>
                            <MenuItem onClick={() => {
                                setPredicate('isGoing', 'true');
                                handleClose();
                            }}>I'm going</MenuItem>
                        </Menu>
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