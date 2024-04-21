import { useEffect, useState } from "react";
import { Datepicker, MbscDatepickerChangeEvent } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Session, SessionRequestModel } from "../../../../models";
import "../../styles/RenderCalendar.css";
import {
  FormatType,
  formatDateToYYYYMMDD,
  formatFromISOString,
} from "../../../../utils/formatDate";
interface RenderTimeFrameProps {
  sessions?: Session[] | null;
  type?: "Detail" | "Edit" | "Create";
  setDates?: (dates: string[]) => void;
  updateSession?: SessionRequestModel;
}

const RenderTimeFrame = ({
  sessions,
  setDates,
  updateSession,
}: RenderTimeFrameProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  console.log(selectedDates);

  // console.log("sessions", selectedDates);
  // console.log("updateSession", updateSession);

  // console.log("dates", dates);

  // set dates for update session

  useEffect(() => {
    // console.log("dcmdoi");

    const allDates: Set<string> = new Set();

    if (sessions) {
      sessions?.forEach((session) => {
        const sessionDate = session.day;
        if (sessionDate) {
          allDates.add(sessionDate.toString());
        }
        console.log(allDates);
      });
    } else if (updateSession) {
      const sessionDate = updateSession.days;
      if (sessionDate) {
        sessionDate.forEach((day) => allDates.add(day));
      }
    }
    const sortedDates = Array.from(allDates).map(
      (dateStr) => new Date(dateStr)
    );
    sortedDates.sort((a, b) => a.getTime() - b.getTime());
    setSelectedDates(sortedDates);
  }, [sessions, updateSession]);

  const changeMyValue = (args: MbscDatepickerChangeEvent) => {
    setSelectedDates(args.value as Date[]);
    if (args.value && Array.isArray(args.value)) {
      const formatDate = args.value.map((date) => {
        return formatFromISOString(date, FormatType.DATE); // Add a return statement here
      });
      const dates = formatDate.map((date) => formatDateToYYYYMMDD(date));
      if (setDates) {
        setDates(dates);
      }
    }
  };

  return (
    <>
      <div>
        <Datepicker
          select="date"
          className="dateRange"
          themeVariant="light"
          display="inline"
          controls={["calendar"]}
          selectMultiple={true}
          value={selectedDates}
          onChange={changeMyValue}
          pages={2}
        />
      </div>
    </>
  );
};

export default RenderTimeFrame;
