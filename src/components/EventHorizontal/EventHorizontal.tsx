import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './style.css';

export default function EventHorizontal () {
    return (
        <div className="eventHorizontal">
            <div className="eventImage"></div>

            <div className="eventContent">
                <div className="firstRow">
                    <div className="eventProfileSection">
                        <Avatar sx={{ bgcolor: deepPurple[500], width: "25px", height: '25px', fontSize: '11px' }}>OP</Avatar>
                        <p>Name Surname</p>
                    </div>

                    <div className="eventTimePosted">
                        <p>5h ago</p>
                    </div>

                    <p className="anonimity">PUBLIC</p>
                </div>

                <p className='eventTitle'>Christmas charity event</p>

                <div className="thirdRow">
                    <p className="category">
                        Category: Charity Event
                    </p>

                    <div className="eventPlace">
                        <PlaceIcon />
                        <p>8779 El Dorado Ave.</p>
                    </div>
                </div>

                <div className="fourthRow">
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, illum facilis. Sequi natus, excepturi id nobis accusantium dicta possimus consectetur ut maiores meal to them...
                    </p>

                    <div className="timeUntil">
                        <AccessTimeIcon sx={{ width: '15px' }} />
                        <p>7 days until</p>
                    </div>
                </div>
            </div>
      </div>
    );
}