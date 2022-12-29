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
    const { loadEvents, setPagingParams, pagination, setPredicate, predicate, eventsByDate, resetAllPredicates } = eventStore;
    const [loadingNext, setLoadingNext] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
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
        <Grid2 lg={9} container
            sx={{
                alignSelf: "center",
                marginTop: "50px",
            }}
        >
            <Grid2 lg={8} container>
                <Grid2 lg={12} display="flex" container>
                    <Grid2 lg={10}>
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
                    
                    <Grid2 lg={2} display="flex" alignItems="flex-start" justifyContent="flex-start">
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
                </Grid2>

                <Grid2 lg={8} container>
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
            </Grid2>

            <Grid2 lg={4} container maxHeight="500px">
                <Grid2 lg={12} height="150px"></Grid2>
                <Grid2 lg={12} marginLeft="60px" display="flex" justifyContent="flex-end">
                    <Calendar />
                </Grid2>
            </Grid2>
        </Grid2>
    );
}

export default observer(SearchPage);