import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import EventHorizontal from './components/EventHorizontal/EventHorizontal';
import EventList from './components/EventList/EventList';
import Navbar from './components/Navbar/Navbar';
import { useStore } from './stores/store';

function App() {
  const { eventStore } = useStore();
  const { loadEvents, eventRegistry } = eventStore;

  useEffect(() => {
    if (eventRegistry.size <= 1) loadEvents();
  }, [eventRegistry.size, loadEvents])

  return (
    <div className="App">
      <Navbar />
      <EventList />
    </div>
  )
}

export default observer(App);
