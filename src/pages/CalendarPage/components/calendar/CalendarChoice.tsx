import { Box, Stack } from "@mui/material";
import AccordionUI from "../../../../components/ui/accordion/AccordionUI";
import { colorConfig } from "../../../../configs/colorConfig";
import WeekList from "../list/WeekList";
import { DayList } from "../list/DayList";
import { useState } from "react";
import CalendarPicker from "./CalendarPicker";
import { Calendar } from "../../../../models";

interface CalendarChoiceProps {
  calendarList: Calendar[];
}

const CalendarChoice = ({ calendarList }: CalendarChoiceProps) => {
  const [choose, setChoose] = useState<"week" | "month" | "year">("month");
  const [date, setDate] = useState<Date>(new Date());

  const handleChoose = (type: "week" | "month" | "year") => {
    setChoose(type);
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  return (
    <Box padding={1}>
      <CalendarPicker
        onCalendarTypeChange={handleChoose}
        onDateChange={handleDateChange}
      />
      <Stack spacing={3}>
        <AccordionUI
          bgcolor={colorConfig.mainColor}
          color="#fff"
          detail="Morning"
          subDetail="(8:00 - 12:00)"
          children={
            choose === "week" ? (
              <WeekList
                startTime={8}
                endTime={12}
                calendarList={calendarList}
                date={date}
              />
            ) : (
              <DayList
                startTime={8}
                endTime={12}
                calendarList={calendarList}
                date={date}
              />
            )
          }
        />
        <AccordionUI
          bgcolor={colorConfig.mainColor}
          color="#fff"
          detail="Noon"
          subDetail="(13:00 - 17:00)"
          children={
            choose === "week" ? (
              <WeekList
                startTime={13}
                endTime={17}
                calendarList={calendarList}
                date={date}
              />
            ) : (
              <DayList
                startTime={13}
                endTime={17}
                calendarList={calendarList}
                date={date}
              />
            )
          }
        />
        <AccordionUI
          bgcolor={colorConfig.mainColor}
          color="#fff"
          detail="Night"
          subDetail="(18:00 - 22:00)"
          children={
            choose === "week" ? (
              <WeekList
                startTime={18}
                endTime={22}
                calendarList={calendarList}
                date={date}
              />
            ) : (
              <DayList
                startTime={18}
                endTime={22}
                calendarList={calendarList}
                date={date}
              />
            )
          }
        />
      </Stack>
    </Box>
  );
};

export default CalendarChoice;
