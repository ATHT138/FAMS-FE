import { Box, Button, Stack } from "@mui/material";
import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  Datepicker,
  MbscDatepickerChangeEvent,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useEffect, useState } from "react";

interface CalendarProps {
  onCalendarTypeChange: (type: "week" | "month" | "year") => void;
  onDateChange: (date: Date) => void;
}

const CalendarPicker = ({
  onCalendarTypeChange,
  onDateChange,
}: CalendarProps) => {
  const [calendarType, setCalendarType] = useState<"week" | "month" | "year">(
    "month"
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    onCalendarTypeChange(calendarType);
  }, [calendarType, onCalendarTypeChange]);

  useEffect(() => {
    onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  const dayNamesShort = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const CalendarHeader = () => {
    return (
      <Stack width="100%" direction="row" justifyContent="center" spacing={10}>
        <div>
          <CalendarPrev />
        </div>
        <div>
          <CalendarNav className="custom-view" />
        </div>
        <div>
          <CalendarNext />
        </div>
      </Stack>
    );
  };

  const handleButton = (type: "week" | "month") => {
    setCalendarType(type);
    onCalendarTypeChange(type);
  };

  const handleDateChange = (args: MbscDatepickerChangeEvent) => {
    const date = args.value as Date;
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <Box>
      <Stack direction="row" spacing={3} marginLeft={3}>
        <Button
          variant="outlined"
          sx={{
            bgcolor: calendarType === "month" ? "#2D3748" : "inherit",
            color: calendarType === "month" ? "#fff" : "#2D3748",
            borderColor: "white",
            borderRadius: 10,
            "&:hover": {
              borderColor: "white",
              bgcolor: calendarType === "month" ? "#2D3748" : "inherit",
              color: calendarType === "month" ? "#fff" : "#2D3748",
            },
          }}
          onClick={() => handleButton("month")}
        >
          Day
        </Button>
        <Button
          variant="outlined"
          sx={{
            bgcolor: calendarType === "week" ? "#2D3748" : "inherit",
            color: calendarType === "week" ? "#fff" : "#2D3748",
            borderColor: "white",
            borderRadius: 10,
            "&:hover": {
              borderColor: "white",
              bgcolor: calendarType === "week" ? "#2D3748" : "inherit",
              color: calendarType === "week" ? "#fff" : "#2D3748",
            },
          }}
          onClick={() => handleButton("week")}
        >
          Week
        </Button>
      </Stack>
      <Datepicker
        calendarType={calendarType}
        display="inline"
        themeVariant="light"
        calendarSize={1}
        showOuterDays={false}
        renderCalendarHeader={CalendarHeader}
        dayNamesShort={dayNamesShort}
        value={selectedDate}
        onChange={handleDateChange}
        locale="en-US"
      />
    </Box>
  );
};

export default CalendarPicker;
