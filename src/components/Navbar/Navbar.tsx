import { Typography } from "@mui/material";
import navLogo from '../../assets/LogoBlack.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import './style.css';
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to={'/'}>
                <img src={navLogo} alt="Evently" className='logoNav' />
            </Link>

            <div className="navLinks">
                <Typography component={Link} to={'/'} sx={{ 
                    fontSize: "10px", fontWeight: 700,
                    textDecoration: "none", color: "black",
                 }}>SEARCH</Typography>
                <Link to={'/'}>
                    <AddCircleIcon sx={{ fontSize: "25px", color: "purple" }}/>
                </Link>
                <Link to={'/'} style={{ color: "black !important" }}>
                    <div className="personIconContainer">
                        <PersonIcon />
                    </div>
                </Link>
            </div>
        </nav>
    );
}