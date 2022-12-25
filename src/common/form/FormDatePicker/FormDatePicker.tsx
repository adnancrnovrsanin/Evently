import { TextField } from "@mui/material";
import { PickersDayProps, PickersDay, pickersDayClasses, LocalizationProvider, StaticDatePicker, StaticDateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './style.css';
import { useField } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";

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

function FormDatePicker(props: Props) {
    const [meta, field, helpers] = useField(props.name);
    const { eventStore: { usersEvents }} = useStore();

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

export default observer(FormDatePicker);