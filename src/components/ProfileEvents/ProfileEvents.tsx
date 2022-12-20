import { observer } from "mobx-react-lite";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

function ProfileEvents() {
    const { profileStore } = useStore();
    const [tab, setTab] = useState('1');

    const {
        loadUserEvents,
        profile,
        loadingEvents,
        userEvents,
    } = profileStore;

    useEffect(() => {
        loadUserEvents(profile!.username);
    }, [loadUserEvents, profile]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        loadUserEvents(profile!.username, panes[+newValue].pane.key)
            .then(() => setTab(newValue));
    }

    return (
        <Grid2 container spacing={2}>
            
        </Grid2>
    );
}

export default observer(ProfileEvents);