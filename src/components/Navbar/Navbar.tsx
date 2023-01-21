import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, MenuProps, Paper, Typography, alpha, styled } from "@mui/material";
import navLogo from '../../assets/LogoBlack.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import './style.css';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect, useRef, useState } from "react";
import { Logout, Settings } from "@mui/icons-material";
import { router } from "../../router/Routes";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { categoryOptions } from "../../common/options/categoryOptions";
import MenuIcon from '@mui/icons-material/Menu';
import { stringAvatar, stringToColor } from "../../helpers/usefulFunctions";
import { useClickOutside } from "../../hooks/useClickOutside";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />  
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
}));

function Navbar() {
    const { userStore } = useStore();
    const { loginDialogStore, registerDialogStore, profileStore, eventStore: { setPredicate, predicate } } = useStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const [anchorElCategories, setAnchorElCategories] = useState<null | HTMLElement>(null);
    const openCategories = Boolean(anchorElCategories);
    const location = useLocation();
    const [openedNav, setOpenedNav] = useState(false);
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
    let mobileProfileRef = useRef(null);
    mobileProfileRef = useClickOutside(mobileProfileRef, () => setMobileProfileOpen(false));
    let mobileCategoriesRef = useRef(null);
    mobileCategoriesRef = useClickOutside(mobileCategoriesRef, () => setMobileCategoriesOpen(false));
    let mobileMenuRef = useRef(null);
    mobileMenuRef = useClickOutside(mobileMenuRef, () => setOpenedNav(false));

    const handleClickCategories = (event: React.MouseEvent<HTMLElement>) => {
        console.log(location);
        setAnchorElCategories(event.currentTarget);
    }

    const handleCloseCategories = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.textContent) {
            setPredicate("searchQuery", e.currentTarget.textContent.toLowerCase());
            navigate('/events');
        }
        setAnchorElCategories(null);
    }


    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }; 

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMobileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setOpenedNav(!openedNav);
    }

    return (
        <Grid2 xs={12} sm={12} md={12} lg={9} container sx={{
            display: "flex",
            flexDirection: "column",
            padding: "5px 0",
            alignSelf: "center",
        }}
            component="div"
            ref={mobileMenuRef}
        >
            <Grid2 xs={11} sm={11} md={11} lg={12} container sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "center",
            }}>
                <Link 
                    to={'/'}
                >
                    <img src={navLogo} alt="Evently" className='logoNav' />
                </Link>

                {userStore.isLoggedIn ? (
                    <div className="navLinks">
                        <Button
                            id="demo-customized-button"
                            aria-controls={openCategories ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openCategories ? 'true' : undefined}
                            variant="text"
                            disableElevation
                            onClick={handleClickCategories}
                            endIcon={<KeyboardArrowDownIcon />}
                            color="secondary"
                            sx={{
                                fontSize: "15px", fontWeight: 600,
                                textDecoration: "none", color: "black", marginRight: "20px"
                            }}
                        >
                            Categories
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorElCategories}
                            open={openCategories}
                            onClose={handleCloseCategories}
                        >
                            {categoryOptions.map(option => (
                                <MenuItem onClick={handleCloseCategories} disableRipple key={option.value} value={option.value}>
                                    {option.text}
                                </MenuItem>
                            ))}
                        </StyledMenu>

                        <Typography 
                            component={Link} to={'/events'}
                        sx={{ 
                            fontSize: "15px", fontWeight: 600,
                            textDecoration: "none", color: "black",
                            borderBottom: (location.pathname === '/events') ? "2px solid #7C05F2" : "none",
                        }}>SEARCH</Typography>
                        <IconButton component={Link} to={'/events/create'}
                            sx={{
                                borderRadius: "0",
                                borderBottom: (location.pathname === '/events/create') ? "3px solid #7C05F2" : "none",
                            }}
                        >
                            <AddCircleIcon sx={{ fontSize: "32px", color: "#7C05F2" }}/>
                        </IconButton>
                        <IconButton
                            onClick={handleMenuClick}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{
                                border: "1.5px solid #7C05F2",
                                borderRadius: "3px",
                                padding: "1px 8px",
                                backgroundColor: (open ? "#7C05F2" : "transparent"),
                                color: (open ? "white" : "black"),
                                borderBottom: (location.pathname.startsWith("/profile")) ? "5px solid #7C05F2" : "1.5px solid #7C05F2",
                                '&:hover': {
                                    backgroundColor: "#7C05F2",
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
                                    width: { xs: "140px", sm: "140px", md: "155px", lg: "170px", xl: "170px" },
                                    height: "170px",
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem
                                component={Link}
                                to={`/profile/${userStore.user?.username}`}
                                sx={{ fontSize: { xs: "15px", sm: "15px", md: "17px", lg: "20px", xl: "20px" } }}
                            >
                                <PersonIcon sx={{ marginRight: '10px' }} fontSize='inherit'/> My Profile
                            </MenuItem>

                            <Divider />

                            <MenuItem
                                sx={{ fontSize: { xs: "15px", sm: "15px", md: "17px", lg: "20px", xl: "20px" } }}
                                onClick={() => {
                                    navigate('/settings');
                                }}
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
                                sx={{ fontSize: { xs: "15px", sm: "15px", md: "17px", lg: "20px", xl: "20px" } }}
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
                        <Button
                            id="demo-customized-button"
                            aria-controls={openCategories ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openCategories ? 'true' : undefined}
                            variant="text"
                            disableElevation
                            onClick={handleClickCategories}
                            endIcon={<KeyboardArrowDownIcon />}
                            color="secondary"
                            sx={{
                                fontSize: "15px", fontWeight: 600,
                                textDecoration: "none", color: "black", marginRight: "20px"
                            }}
                        >
                            Categories
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorElCategories}
                            open={openCategories}
                            onClose={handleCloseCategories}
                        >
                            {categoryOptions.map(option => (
                                <MenuItem onClick={handleCloseCategories} disableRipple key={option.value} value={option.value}>
                                    {option.text}
                                </MenuItem>
                            ))}
                        </StyledMenu>

                        <Typography  
                            component={Link} to={'/events'}
                            sx={{ 
                                fontSize: "15px", fontWeight: 600,
                                textDecoration: "none", color: "black", marginRight: "20px"
                            }}
                        >SEARCH</Typography>
                        <button onClick={loginDialogStore.openLoginDialog} className="authButton purple">LOG IN</button>
                        <button onClick={registerDialogStore.openRegisterDialog} className="authButton teal">SIGN UP</button>
                    </div>
                )}

                <IconButton
                    className="mobileMenuButton"
                    sx={{
                        color: "black",
                        height: "fit-content",
                    }}
                    onClick={handleMobileMenuClick}
                >
                    <MenuIcon 
                        sx={{
                            color: "black",
                            width: "30px",
                            height: "30px",
                        }}
                    />
                </IconButton>
            </Grid2>

            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} container
                sx={{
                    display: openedNav ? "flex" : "none" ,
                    paddingLeft: "20px",
                }}
                component="div"
                ref={mobileMenuRef}
            >
                <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                    sx={{
                        borderBottom: "1px solid #e0e0e0",
                        padding: "15px 0",
                    }}
                    container
                    component="div"
                    ref={mobileCategoriesRef}
                >
                    <Button
                        id="demo-customized-button"
                        aria-controls={mobileCategoriesOpen ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={mobileCategoriesOpen ? 'true' : undefined}
                        variant="text"
                        disableElevation
                        onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                        endIcon={<KeyboardArrowDownIcon />}
                        color="secondary"
                        sx={{
                            fontSize: "12px", fontWeight: 600,
                            textDecoration: "none", color: "black",
                        }}
                    >
                        Categories
                    </Button>

                    {mobileCategoriesOpen && categoryOptions.map((option, i) => (
                        <Grid2 xs={9} sm={9} md={9} lg={9} xl={9} component={Paper}
                            sx={{
                                backgroundColor: "background.paper",
                                padding: "10px 30px",
                                borderBottom: "1px solid #e0e0e0",
                                '&:hover': {
                                    backgroundColor: "#e0e0e0",
                                    cursor: "pointer",
                                },
                                marginLeft: "20px",
                                marginTop: i === 0 ? "10px" : "0px",
                            }}
                            onClick={(event) => {
                                handleCloseCategories(event);
                                setOpenedNav(false);
                            }} key={option.value}
                        >
                            <Typography
                                sx={{
                                    fontSize: "12px", fontWeight: 500,
                                    textDecoration: "none", color: "black",
                                }}
                            >
                                {option.text}
                            </Typography>
                        </Grid2>
                    ))}
                </Grid2>

                <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                    sx={{
                        padding: "15px 0",
                        borderBottom: "1px solid #e0e0e0",
                        textDecoration: "none",
                        '&:hover': {
                            backgroundColor: "#e0e0e0",
                        }
                    }}
                    component={Link} to={'/events'}
                    onClick={() => setOpenedNav(false)}
                >
                    <Typography 
                        sx={{ 
                            fontSize: "12px", fontWeight: 600,
                            textDecoration: "none", color: "black",
                            marginLeft: "7px",
                        }}
                    >SEARCH</Typography>
                </Grid2>

                {userStore.user ? (
                    <>
                        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                            sx={{
                                padding: "15px 0",
                                display: "flex",
                                alignItems: "center",
                                borderBottom: "1px solid #e0e0e0",
                                paddingLeft: "7px",
                                textDecoration: "none",
                                '&:hover': {
                                    backgroundColor: "#e0e0e0",
                                },
                            }}
                            component={Link} to={'/events/create'}
                            onClick={() => setOpenedNav(false)}
                        >
                            <AddCircleIcon sx={{ fontSize: "25px", color: "#7C05F2" }}/>

                            <Typography
                                sx={{
                                    fontSize: "12px", fontWeight: 600,
                                    textDecoration: "none", color: "black",
                                    marginLeft: "20px",
                                }}
                            >
                                Create a new event
                            </Typography>
                        </Grid2>

                        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                            sx={{
                                padding: "15px 0",
                                display: "flex",
                                alignItems: "center",
                                borderBottom: "1px solid #e0e0e0",
                                paddingLeft: "7px",
                            }}
                            container
                        >
                            <Grid2 xs={12} sm={12} md={12} lg={12} xl={12} component="div" ref={mobileProfileRef}>
                                <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        '&:hover': {
                                            cursor: "pointer",
                                        }
                                    }}
                                    onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                                    aria-controls={mobileProfileOpen ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={mobileProfileOpen ? 'true' : undefined}
                                >
                                    <Avatar variant="square" alt="Profile photo" src={userStore.user.image} {...stringAvatar(userStore.user.displayName!)} sx={{
                                        bgcolor: stringToColor(userStore.user.username!),
                                        width: "25px",
                                        height: '25px',
                                    }} />

                                    <Typography
                                        sx={{
                                            fontSize: "12px", fontWeight: 600,
                                            textDecoration: "none", color: "black",
                                            marginLeft: "20px",
                                        }}
                                    >
                                        {userStore.user.displayName}
                                    </Typography>
                                </Grid2>

                                {mobileProfileOpen && (
                                    <>
                                        <Grid2 xs={9} sm={9} md={9} lg={9} xl={9} component={Paper}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                backgroundColor: "background.paper",
                                                padding: "10px 30px",
                                                borderBottom: "1px solid #e0e0e0",
                                                marginTop: "15px",
                                                marginLeft: "10px",
                                                '&:hover': {
                                                    backgroundColor: "#e0e0e0",
                                                    cursor: "pointer",
                                                }
                                            }}
                                            onClick={() => {
                                                navigate(`/profile/${userStore.user?.username}`);
                                                setOpenedNav(false);
                                            }}
                                        >
                                            <PersonIcon fontSize="inherit" sx={{ marginRight: "10px" }}/>

                                            <Typography
                                                sx={{
                                                    fontSize: "12px", fontWeight: 500,
                                                    textDecoration: "none", color: "black",
                                                }}
                                            >
                                                My Profile
                                            </Typography>
                                        </Grid2>

                                        <Grid2 xs={9} sm={9} md={9} lg={9} xl={9} component={Paper}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                backgroundColor: "background.paper",
                                                padding: "10px 30px",
                                                borderBottom: "1px solid #e0e0e0",
                                                marginLeft: "10px",
                                                '&:hover': {
                                                    backgroundColor: "#e0e0e0",
                                                    cursor: "pointer",
                                                }
                                            }}
                                            onClick={() => {
                                                navigate('/settings');
                                                setOpenedNav(false);
                                            }}
                                        >
                                            <Settings fontSize="inherit" sx={{ marginRight: "10px" }}/>

                                            <Typography
                                                sx={{
                                                    fontSize: "12px", fontWeight: 500,
                                                    textDecoration: "none", color: "black",
                                                }}
                                            >
                                                Settings
                                            </Typography>
                                        </Grid2>

                                        <Grid2 xs={9} sm={9} md={9} lg={9} xl={9} component={Paper}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                backgroundColor: "background.paper",
                                                padding: "10px 30px",
                                                borderBottom: "1px solid #e0e0e0",
                                                marginLeft: "10px",
                                                '&:hover': {
                                                    backgroundColor: "#e0e0e0",
                                                    cursor: "pointer",
                                                }
                                            }}
                                            onClick={() => {
                                                userStore.logout();
                                                navigate(`/`);
                                                setOpenedNav(false);
                                            }}
                                        >
                                            <Logout fontSize="inherit" sx={{ marginRight: "10px" }}/>

                                            <Typography
                                                sx={{
                                                    fontSize: "12px", fontWeight: 500,
                                                    textDecoration: "none", color: "black",
                                                }}
                                            >
                                                Logout
                                            </Typography>
                                        </Grid2>
                                    </>
                                )}
                            </Grid2>

                            
                        </Grid2>
                    </>
                ) : (
                    <>
                        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                            sx={{
                                padding: "15px 0",
                                borderBottom: "1px solid #e0e0e0",
                                textDecoration: "none",
                                backgroundColor: "#7C05F2",
                                textAlign: "center",
                                '&:hover': {
                                    cursor: "pointer",
                                }
                            }}
                            onClick={() => {
                                loginDialogStore.openLoginDialog();
                                setOpenedNav(false);
                            }}
                        >
                            <Typography 
                                sx={{ 
                                    fontSize: "12px", fontWeight: 600,
                                    textDecoration: "none", color: "white",
                                    marginLeft: "7px",
                                }}
                            >Log In</Typography>
                        </Grid2>

                        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}
                            sx={{
                                padding: "15px 0",
                                borderBottom: "1px solid #e0e0e0",
                                textDecoration: "none",
                                backgroundColor: "#BCE0FD",
                                textAlign: "center",
                                '&:hover': {
                                    cursor: "pointer",
                                }
                            }}
                            onClick={() => {
                                registerDialogStore.openRegisterDialog();
                                setOpenedNav(false);
                            }}
                        >
                            <Typography 
                                sx={{ 
                                    fontSize: "12px", fontWeight: 600,
                                    textDecoration: "none", color: "white",
                                    marginLeft: "7px",
                                }}
                            >Sign Up</Typography>
                        </Grid2>
                    </>
                )}
            </Grid2>
        </Grid2>
    );
}

export default observer(Navbar);