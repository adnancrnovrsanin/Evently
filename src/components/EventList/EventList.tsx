import { observer } from "mobx-react-lite";
import { IEvent } from "../../models/event";
import { useStore } from "../../stores/store";
import EventCard from "../EventCard/EventCard";
import EventHorizontal from "../EventHorizontal/EventHorizontal";

function EventList() {
    const { eventStore } = useStore();

    const { eventsByDate } = eventStore;

    return (
        <>
            {eventsByDate.map((event: IEvent) => (
                <EventCard key={event.id} event={event}/>
            ))}
        </>
    );
}

export default observer(EventList);