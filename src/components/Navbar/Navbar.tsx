import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import navLogo from '../../assets/LogoBlack.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import './style.css';
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useState } from "react";
import { Logout, Settings } from "@mui/icons-material";
import { router } from "../../router/Routes";

function Navbar() {
    const { userStore } = useStore();
    const { loginDialogStore, registerDialogStore, profileStore } = useStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }; 

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav>
            <Link to={'/'}>
                <img src={navLogo} alt="Evently" className='logoNav' />
            </Link>

            {userStore.isLoggedIn ? (
                <div className="navLinks">
                    <Typography component={Link} to={'/events'} sx={{ 
                        fontSize: "15px", fontWeight: 600,
                        textDecoration: "none", color: "black",
                    }}>SEARCH</Typography>
                    <IconButton component={Link} to={'/events/create'}>
                        <AddCircleIcon sx={{ fontSize: "32px", color: "purple" }}/>
                    </IconButton>
                    <IconButton
                        onClick={handleMenuClick}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{
                            border: "1.5px solid purple",
                            borderRadius: "3px",
                            padding: "1px 8px",
                            backgroundColor: (open ? "purple" : "transparent"),
                            color: (open ? "white" : "black"),

                            '&:hover': {
                                backgroundColor: "purple",
                                color: "white",
                            },
                        }}
                    >
                        <PersonIcon sx={{ width: "1.5em", height: "1.5em" }}/>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                            width: "170px",
                            height: "170px",
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem
                            component={Link}
                            to={`/profile/${userStore.user?.username}`}
                            sx={{ fontSize: "20px" }}
                        >
                            <PersonIcon sx={{ marginRight: '10px' }} fontSize='inherit'/> My Profile
                        </MenuItem>

                        <Divider />

                        <MenuItem
                            sx={{ fontSize: "20px" }}
                        >
                            <ListItemIcon>
                                <Settings fontSize="inherit" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                userStore.logout();
                                navigate('/');
                            }}
                            sx={{ fontSize: "20px" }}
                        >
                            <ListItemIcon>
                                <Logout fontSize="inherit" />
                            </ListItemIcon>
                                Logout
                        </MenuItem>
                    </Menu>
                </div>
            ) : (
                <div className="userAuthButtons">
                    <Typography component={Link} to={'/search'} sx={{ 
                        fontSize: "15px", fontWeight: 600,
                        textDecoration: "none", color: "black", marginRight: "20px"
                    }}>SEARCH</Typography>
                    <button onClick={loginDialogStore.openLoginDialog} className="authButton purple">LOG IN</button>
                    <button onClick={registerDialogStore.openRegisterDialog} className="authButton teal">SIGN UP</button>
                </div>
            )}
        </nav>
    );
}

export default observer(Navbar);