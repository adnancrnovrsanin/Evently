import { TextField } from "@mui/material";
import { PickersDayProps, PickersDay, pickersDayClasses, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './style.css';

const probaDate = dayjs('2022-11-10');

const renderWeekPickerDay = (
  date: Date,
  selectedDates: Array<Date | null>,
  pickersDayProps: PickersDayProps<Date>
) => {
  const compareF = () => {
    let dateToCompare = dayjs(date);

    return dateToCompare.diff(probaDate, "day") === 0 && dateToCompare.diff(probaDate, "month") === 0 && dateToCompare.diff(probaDate, "year") === 0
  }; 

  return (
    <PickersDay
      {...pickersDayProps}
      sx={{
        [`&&.${pickersDayClasses.selected}`]: {
          backgroundColor: "purple"
        },
        fontSize: "13px",
        borderRadius: () => (compareF())? "0" : "100%",
        borderBottom: () => (compareF())? "3px solid purple": "none"
      }}
    />
  );
};

const ArrowLeft = () => {
  return (
    <ArrowCircleLeftIcon sx={{
      color: "purple",
      fontSize: "25px"
    }} />
  );
};

const ArrowRight = () => {
  return (
    <ArrowCircleRightIcon sx={{
      color: "purple",
      fontSize: "25px"
    }} />
  );
};

export default function Calendar() {
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    return (
        <div className="calendarWrapper">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    components={{
                        LeftArrowIcon: ArrowLeft,
                        RightArrowIcon: ArrowRight
                    }}
                    renderDay={renderWeekPickerDay}
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={value}
                    onChange={(newValue) => {
                        setValue(dayjs(newValue));
                        console.log(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
      </div>
    );
}