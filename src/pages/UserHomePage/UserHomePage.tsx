import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader/InitialLoader";
import EventHorizontal from "../../components/EventHorizontal/EventHorizontal";

function UserHomePage() {
    const { 
        eventStore: { loadEventsUserIsGoing, loading, usersEvents },
        userStore: { user }
    } = useStore();

    useEffect(() => {
        if (user) loadEventsUserIsGoing();
    }, [user, loadEventsUserIsGoing]);

    if (loading || !user) return <InitialLoader adding="dashboard"/>;

    return (
        <div>
            {usersEvents.map(event => (
                <EventHorizontal key={event.id} event={event}/>
            ))}
        </div>
    );
}

export default observer(UserHomePage);