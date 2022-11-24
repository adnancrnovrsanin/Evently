import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import './App.css';
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
    </div>
  )
}

export default observer(App);
