import { observer } from 'mobx-react-lite';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { useStore } from './stores/store';
import { useEffect } from 'react';
import HomePage from './pages/HomePage/HomePage';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginDialog from './components/LoginDialog/LoginDialog';
import RegisterDialog from './components/RegisterDialog/RegisterDialog';
import InitialLoader from './components/InitialLoader/InitialLoader';
import Footer from './components/Footer/Footer';

function App() {
  const { commonStore, userStore, loginDialogStore, registerDialogStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return (
    <InitialLoader adding={"App"}/>
  );

  return (
    <div className="App">
      <Navbar />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      {loginDialogStore.loginDialog.open && <LoginDialog />}
      {registerDialogStore.registerDialog.open && <RegisterDialog />}
      {location.pathname === '/' ? <HomePage /> : <Outlet />}
    </div>
  )
}

export default observer(App);