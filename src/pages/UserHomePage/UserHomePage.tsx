import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader/InitialLoader";
import EventHorizontal from "../../components/EventHorizontal/EventHorizontal";

function UserHomePage() {
    const { 
        userDashboardStore: { loadEvents, loading, eventsByDate, resetPredicate, setPredicate},
        userStore: { user }
    } = useStore();

    useEffect(() => {
        if (user) loadEvents();
        return () => resetPredicate();
    }, [setPredicate, loadEvents, user]);

    if (loading) return <InitialLoader adding="dashboard"/>;

    return (
        <div>
            {eventsByDate.map(event => (
                <EventHorizontal key={event.id} event={event}/>
            ))}
        </div>
    );
}

export default observer(UserHomePage);