import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import './style.css';
import EventForm from "../../components/EventForm/EventForm";

export default function EventFormPage() {
    
    return (
        <div className="createEventContainer">
            <EventForm />
        </div>
    );
}