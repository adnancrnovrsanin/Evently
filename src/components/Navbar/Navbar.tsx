import { Typography } from "@mui/material";
import navLogo from '../../assets/LogoBlack.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import './style.css';

export default function Navbar() {
    return (
        <nav>
            <img src={navLogo} alt="Evently" className='logoNav' />

            <div className="navLinks">
                <Typography sx={{ fontSize: "10px", fontWeight: 700 }}>SEARCH</Typography>
                <AddCircleIcon sx={{ fontSize: "25px", color: "purple" }}/>
                <div className="personIconContainer">
                    <PersonIcon />
                </div>
            </div>
        </nav>
    );
}