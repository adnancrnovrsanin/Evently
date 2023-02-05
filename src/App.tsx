import { observer } from 'mobx-react-lite';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from './stores/store';
import { useEffect } from 'react';
import HomePage from './pages/HomePage/HomePage';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginDialog from './components/LoginDialog/LoginDialog';
import RegisterDialog from './components/RegisterDialog/RegisterDialog';
import InitialLoader from './components/InitialLoader/InitialLoader';
import UserHomePage from './pages/UserHomePage/UserHomePage';
import Footer from './components/Footer';

function App() {
  const { commonStore, userStore, loginDialogStore, registerDialogStore, profileStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => {
        commonStore.setAppLoaded();
        if (userStore.user) profileStore.loadProfile(userStore.user.username);
      });
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return (
    <InitialLoader adding={"App"}/>
  );

  return (
    <div className="App">
      <ScrollRestoration />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      <Navbar />
      {loginDialogStore.loginDialog.open && <LoginDialog />}
      {registerDialogStore.registerDialog.open && <RegisterDialog />}
      {location.pathname === '/' ? (
        userStore.user ? (
          <UserHomePage username={userStore.user.username} />
        ) : (
          <HomePage />
        )
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  )
}

export default observer(App);