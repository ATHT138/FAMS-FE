import { Box, Divider, Grid } from "@mui/material";
import { Calendar } from "../../../../models";
import NoteWeek from "./NoteWeek";
import React from "react";
import { FormatType, formatFromISOString } from "../../../../utils/formatDate";

type WeekListProps = {
  startTime: number;
  endTime: number;
  calendarList: Calendar[] | null;
  date: Date | null;
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekList = ({
  calendarList,
  date,
  startTime,
  endTime,
}: WeekListProps) => {
  const filterWeekList = (
    inputDate: Date,
    weekDay: string,
    startTime: number,
    endTime: number
  ) => {
    if (!calendarList) return null;
    return calendarList.filter((item) => {
      const startDate = item.startTime
        ? formatFromISOString(item.startTime, FormatType.DATE)
        : "";

      const dateFormat = formatFromISOString(
        inputDate.toISOString(),
        FormatType.DATE
      );

      const dayOfWeekCalendar = item.startTime
        ? new Date(item.startTime).toUTCString().substring(0, 3)
        : "";

      const timeDate = item.startTime
        ? formatFromISOString(item.startTime, FormatType.TIME)
        : "";

      console.log("Date time: ", timeDate);

      return (
        startDate === dateFormat &&
        dayOfWeekCalendar === weekDay &&
        timeDate >= formatTime(startTime) &&
        timeDate <= formatTime(endTime)
      );
    });
  };

  const formatTime = (time: number) => {
    const currentHour = time < 10 ? `0${time}` : `${time}`;
    return `${currentHour}:00:00`;
  };

  return (
    <Grid container>
      {daysOfWeek.map((day, index) => (
        <React.Fragment key={day}>
          <Grid item xs={1.7} display="flex" justifyContent="center">
            <Box
              width="100%"
              margin={1}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              {date &&
                filterWeekList(date, day, startTime, endTime)?.map(
                  (calendar, index) => (
                    <NoteWeek key={index} noteCalendar={calendar} />
                  )
                )}
            </Box>
          </Grid>
          {index < daysOfWeek.length - 1 && (
            <Divider orientation="vertical" flexItem />
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default WeekList;
