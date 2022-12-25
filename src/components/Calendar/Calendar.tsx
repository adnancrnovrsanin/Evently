import { TextField } from "@mui/material";
import { PickersDayProps, PickersDay, pickersDayClasses, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './style.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { IEvent } from "../../models/event";



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

function Calendar() {
    const { eventStore: { loadEventsUserIsGoing, usersEvents, predicate, setPredicate }, userStore: { user } } = useStore();

    const renderWeekPickerDay = (
      date: Dayjs,
      selectedDates: Array<Dayjs | null>,
      pickersDayProps: PickersDayProps<Dayjs>
    ) => {
      const compareDay = (calendarDate: Dayjs, eventDate: Date) => {
        let dateToCompare = dayjs(eventDate);
        return calendarDate.diff(dateToCompare, "day") === 0 && calendarDate.diff(dateToCompare, "month") === 0 && calendarDate.diff(dateToCompare, "year") === 0;
      };
    
      const checkEventDay = () => {
        let result = false;
        for (const event of usersEvents) {
          if (compareDay(date, event.date!)) {
            result = true;
            break;
          }
        }
        return result;
      }
    
      return (
        <PickersDay
          {...pickersDayProps}
          sx={{
            [`&&.${pickersDayClasses.selected}`]: {
              backgroundColor: "purple"
            },
            fontSize: "13px",
            borderRadius: () => (checkEventDay())? "0" : "100%",
            borderBottom: () => (checkEventDay())? "3px solid purple": "none"
          }}
        />
      );
    };
    
    useEffect(() => {
        if (user) loadEventsUserIsGoing();
    }, [loadEventsUserIsGoing, user]);

    return (
        <div className="calendarWrapper">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    components={{
                        LeftArrowIcon: ArrowLeft,
                        RightArrowIcon: ArrowRight
                    }}
                    renderDay={(date, selectedDates, pickersDayProps) => renderWeekPickerDay(date, selectedDates, pickersDayProps)}
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={predicate.get("startDate")}
                    onChange={(newValue) => setPredicate("startDate", newValue.toDate())}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
      </div>
    );
}

export default observer(Calendar);