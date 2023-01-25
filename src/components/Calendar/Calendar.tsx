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

const ArrowLeft = () => {
  return (
    <ArrowCircleLeftIcon sx={{
      color: "#7C05F2",
      fontSize: "25px"
    }} />
  );
};

const ArrowRight = () => {
  return (
    <ArrowCircleRightIcon sx={{
      color: "#7C05F2",
      fontSize: "25px"
    }} />
  );
};

function Calendar() {
    const { eventStore: { loadEventsUserIsGoing, usersEvents, predicate, setPredicate }, userStore: { user }, userDashboardStore } = useStore();

    const checkEventDay = (date: Dayjs) => {
      let result = false;
      for (const event of usersEvents) {
        if (date.diff(dayjs(event.date!), "day") === 0 && date.diff(dayjs(event.date!), "month") === 0 && date.diff(dayjs(event.date!), "year") === 0) {
          result = true;
          break;
        }
      }
      return result;
    }

    const renderWeekPickerDay = (
      date: Dayjs,
      selectedDates: Array<Dayjs | null>,
      pickersDayProps: PickersDayProps<Dayjs>
    ) => {
      return (
        <PickersDay
          {...pickersDayProps}
          sx={{
            [`&&.${pickersDayClasses.selected}`]: {
              backgroundColor: "#7C05F2"
            },
            fontSize: "13px",
            borderRadius: checkEventDay(date) ? "0" : "100%",
            borderBottom: checkEventDay(date) ? "3px solid #7C05F2" : "none" 
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
                    renderDay={renderWeekPickerDay}
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={predicate.get("startDate")}
                    onChange={(newValue) => {
                      setPredicate("startDate", newValue!.toDate());
                      userDashboardStore.setPredicate("startDate", newValue!.toDate());
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
      </div>
    );
}

export default observer(Calendar);