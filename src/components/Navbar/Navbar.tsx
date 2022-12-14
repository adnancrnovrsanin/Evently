import { Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, MenuProps, Typography, alpha, styled } from "@mui/material";
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
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { categoryOptions } from "../../common/options/categoryOptions";

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

    const handleClickCategories = (event: React.MouseEvent<HTMLElement>) => {
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

    return (
        <Grid2 xl={9} container sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 0",
            alignSelf: "center",
        }}>
            <Link to={'/'}>
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
        </Grid2>
    );
}

export default observer(Navbar);