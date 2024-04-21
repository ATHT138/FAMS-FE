import { Box, Divider, Stack } from "@mui/material";
import NoteItem from "./NoteItem";
import { Calendar } from "../../../../models";
import { FormatType, formatFromISOString } from "../../../../utils/formatDate";

interface DayListProps {
  startTime: number;
  endTime: number;
  calendarList: Calendar[] | null;
  date: Date | null;
}

export const DayList: React.FC<DayListProps> = ({
  startTime,
  endTime,
  calendarList,
  date,
}) => {
  const timeList: string[] = [];

  for (let hour = startTime; hour <= endTime; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
      const formattedMinute = minute === 0 ? "00" : `${minute}`;
      timeList.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  const filterTimeOfCalendar = (time: string, inputDate: Date) => {
    if (!calendarList) return null;
    return calendarList.filter((item) => {
      const startTime = item.startTime
        ? formatFromISOString(item.startTime, FormatType.TIME)
        : "";
      const startDate = item.startTime
        ? formatFromISOString(item.startTime, FormatType.DATE)
        : "";
      const dateFormat = formatFromISOString(
        inputDate.toISOString(),
        FormatType.DATE
      );

      return startDate === dateFormat && startTime === `${time}:00`;
    });
  };

  return (
    <Box>
      <Stack spacing={2} divider={<Divider flexItem />} padding={2}>
        {timeList.map((time, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
            alignItems={"center"}
          >
            <div>{time}</div>
            <Stack direction="row" spacing={2}>
              {date &&
                filterTimeOfCalendar(time, date)?.map((calendar, index) => {
                  return <NoteItem key={index} noteCalendar={calendar} />;
                })}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
