import { TextField } from "@mui/material";
import { PickersDayProps, PickersDay, pickersDayClasses, LocalizationProvider, StaticDatePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './style.css';
import { useField } from "formik";

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

interface Props {
    name: string;
}

export default function Calendar(props: Props) {
    const [meta, field, helpers] = useField(props.name);

    return (
        <div className="calendarWrapper">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker
                    components={{
                        LeftArrowIcon: ArrowLeft,
                        RightArrowIcon: ArrowRight
                    }}
                    renderDay={renderWeekPickerDay}
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={field.value}
                    onChange={(newValue) => {
                        helpers.setValue(new Date(newValue?.toISOString()!));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
      </div>
    );
}