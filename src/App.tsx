import { Typography } from '@mui/material';
import './App.css';
import navLogo from './assets/LogoBlack.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';

function App() {
  return (
    <div className="App">
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
    </div>
  )
}

export default App;
