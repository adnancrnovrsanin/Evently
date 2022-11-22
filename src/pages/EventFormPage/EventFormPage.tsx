import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import './style.css';

export default function EventFormPage() {
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    return (
        <div className="createEventContainer">
        
            <div className="formAndTitle">
                <h1>Create an unforgettable <span>event</span></h1>

                <form action="#" className='createEvent'>

                    <TextField id="standard-basic" label="Title of the event" variant="standard" sx={{ fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }} />

                    <TextField id="standard-basic" label="Standard" variant="standard"  sx={{ fontFamily: "'Montserrat', sans-serif", fontStyle: "italic", marginTop: '20px' }} />

                    <FormControl variant="standard" sx={{ minWidth: 120, margin: "20px 0 30px 0" }}>
                        <InputLabel id="demo-simple-select-standard-label" sx={{ color: "darkblue", fontFamily: "'Montserrat', sans-serif", fontStyle: "italic" }}>Category of your event</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChange}
                            label="Category of your event"
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="outlined-multiline-static"
                        label="Describe your event..."
                        multiline
                        rows={4}
                        sx={{ 
                            borderRadius: "1px",
                            backgroundColor: "white"
                        }}
                    />

                    <button type='submit' className="formPostBtn">POST</button>
                </form>
            </div>
        </div>
    );
}