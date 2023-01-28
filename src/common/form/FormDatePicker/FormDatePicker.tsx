import { TextField } from "@mui/material";
import { PickersDayProps, PickersDay, pickersDayClasses, LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './style.css';
import { useField } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { useEffect } from "react";

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

      return (
        <PickersDay
          {...pickersDayProps}
          sx={{
            [`&&.${pickersDayClasses.selected}`]: {
              backgroundColor: "#7C05F2"
            },
            fontSize: "13px",
            borderRadius: usersEvents.some(e => date.get("date") === dayjs(e.date!).get("date") && date.get("month") === dayjs(e.date!).get("month") && date.get("year") === dayjs(e.date!).get("year")) ? "0" : "100%",
            borderBottom: usersEvents.some(e => date.get("date") === dayjs(e.date!).get("date") && date.get("month") === dayjs(e.date!).get("month") && date.get("year") === dayjs(e.date!).get("year")) ? "3px solid #7C05F2" : "none" 
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
                        RightArrowIcon: ArrowRight,
                    }}
                    renderDay={renderWeekPickerDay}
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={field.value}
                    onChange={(newValue) => {
                        helpers.setValue(new Date(newValue?.toISOString()!));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    ampm={false}
                />
            </LocalizationProvider>
      </div>
    );
}

export default observer(FormDatePicker);