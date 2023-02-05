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
import { IconButton } from '@mui/material';
import { useScrollPosition } from './common/util/hooks';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function App() {
  const { commonStore, userStore, loginDialogStore, registerDialogStore, profileStore } = useStore();
  const location = useLocation();
  const scroll = useScrollPosition();
  const scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;

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
      <IconButton
          sx={{
              display: scroll > 50 ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              bottom: "2rem",
              right: { xs: "1rem", sm: "1rem", md: "1.1rem", lg: "1.3rem", xl: "1.5rem" },
              bgcolor: "white",
              color: "black",
              "&:hover": {
                  bgcolor: "#7C05F2",
                  color: "white",
              },
              width: { xs: "2rem", sm: "2.5rem", md: "2.5rem", lg: "2.5rem", xl: "2.5rem" },
              height: { xs: "2rem", sm: "2.5rem", md: "2.5rem", lg: "2.5rem", xl: "2.5rem" },
              zIndex: 100,
              border: "1px solid #7C05F2",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
          <ArrowUpwardIcon 
            sx={{
              width: { xs: "1.5rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" },
              height: { xs: "1.5rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" },
            }}
          />
      </IconButton>
    </div>
  )
}

export default observer(App);