import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import Grid2 from "@mui/material/Unstable_Grid2";
import EventPlaceholder from "../../components/EventPlaceholder/EventPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import EventList from "../../components/EventList/EventList";
import { PagingParams } from "../../models/pagination";
import { Field, FieldProps, Form, Formik } from "formik";
import { Button, IconButton, Menu, MenuItem, TextField, Typography, useMediaQuery } from "@mui/material";
import './style.css';
import Calendar from "../../components/Calendar/Calendar";
import SortIcon from '@mui/icons-material/Sort';
import TuneIcon from '@mui/icons-material/Tune';

function SearchPage() {
    const { eventStore } = useStore();
    const { loadEvents, setPagingParams, pagination, setPredicate, predicate, eventsByDate, resetAllPredicates } = eventStore;
    const [loadingNext, setLoadingNext] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const mobileMatch = useMediaQuery('(max-width: 600px)');
    const cardMatch = useMediaQuery('(max-width: 1270px)');
    const calendarMatch = useMediaQuery('(max-width: 1300px)');

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const open2 = Boolean(anchorEl2);
    const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadEvents().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadEvents();
        return () => resetAllPredicates();
    }, [loadEvents]);

    return (
        <Grid2 xs={11} sm={11} md={10} lg={9} xl={9} container
            sx={{
                alignSelf: "center",
                marginTop: "50px",
            }}
        >
            <Grid2 xs={12} sm={12} md={12} lg={8} xl={8} container>
                <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} display="flex" container>
                    <Grid2 xs={9} sm={10} md={10} lg={10} xl={10}>
                        <Formik
                            enableReinitialize={true}
                            onSubmit={(values, { resetForm }) => {
                                setPredicate('searchQuery', values.searchQuery.trim());
                                resetForm();
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
                                                disabled={isSubmitting}
                                            />
                                        )}
                                    </Field>
                                </Form>
                            )}
                        </Formik>
                    </Grid2>
                    
                    {mobileMatch ? (
                        <Grid2 xs={3} sm={2} md={2} lg={2}
                            sx={{
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <IconButton
                                sx={{
                                    marginLeft: "20px",
                                }}
                            >
                                <TuneIcon 
                                    sx={{
                                        color: "#7C05F2",
                                        fontSize: "25px",
                                    }}
                                />
                            </IconButton>
                        </Grid2>
                    ) : (
                        <Grid2 xs={2} sm={2} md={2} lg={2} display="flex" alignItems="flex-start" justifyContent="flex-start">
                            <IconButton
                                id="basic-button"
                                aria-controls={open2 ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open2 ? 'true' : undefined}
                                onClick={handleClick2}
                                sx={{
                                    color: "black",
                                    marginTop: "10px"
                                }}
                            >
                                <SortIcon />
                            </IconButton>

                            <Menu
                                id="basic-menu"
                                aria-labelledby="basic-button"
                                anchorEl={anchorEl2}
                                open={open2}
                                onClose={handleClose2}
                            >
                                <MenuItem onClick={() => {
                                    setPredicate('dateAscending', 'true');
                                    handleClose2();
                                }}>{"Closer events (by Date)"}</MenuItem>
                                <MenuItem onClick={() => {
                                    setPredicate('dateDescending', 'true');
                                    handleClose2();
                                }}>{"Farther events (by Date)"}</MenuItem>
                            </Menu>

                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
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
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
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
                    )}
                </Grid2>

                <Grid2 xs={12} sm={12} md={12} lg={8} container>
                    {eventStore.loadingInitial && !loadingNext ? (
                        <Grid2 xs={12} sm={12} md={12} lg={12}>
                            <EventPlaceholder />
                            <EventPlaceholder />
                            <EventPlaceholder />
                            <EventPlaceholder />
                            <EventPlaceholder />
                        </Grid2>
                    ) : (
                        eventsByDate.length === 0 ? (
                            <Grid2 xs={12} sm={12} md={12} lg={12} textAlign="left">
                                <h1 style={{ lineHeight: "35px" }}>There are no events that meet your search criteria</h1>
                            </Grid2>
                        ) : (
                            <Grid2 xs={12} sm={12} md={12} lg={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: cardMatch ? "center" : "none",
                                    flexWrap: "wrap",
                                }}
                            >
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={handleGetNext}
                                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                                    initialLoad={false}
                                >
                                    <EventList />
                                </InfiniteScroll>
                            </Grid2>
                        )
                    )}
                </Grid2>
            </Grid2>

            {!calendarMatch && (
                <Grid2 xs={4} sm={7} md={6} lg={4} container maxHeight="500px">
                    <Grid2 xs={12} sm={12} md={12} lg={12} height="150px"></Grid2>
                    <Grid2 xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="center">
                        <Calendar />
                    </Grid2>
                </Grid2>
            )}
        </Grid2>
    );
}

export default observer(SearchPage);