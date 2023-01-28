import { observer } from "mobx-react-lite";
import { IEvent } from "../../models/event";
import { useStore } from "../../stores/store";
import EventCard from "../EventCard/EventCard";
import EventHorizontal from "../EventHorizontal/EventHorizontal";
import { useMediaQuery } from "@mui/material";

function EventList() {
    const { eventStore: { eventsByDate } } = useStore();
    const match = useMediaQuery('(max-width: 1270px)');

    return (
        <>
            {eventsByDate && eventsByDate.map((event: IEvent) => (
                match ? (
                    <EventCard event={event} key={event.id} />
                ) : (
                    <EventHorizontal event={event} key={event.id} />
                )
            ))}
        </>
    );
}

export default observer(EventList);