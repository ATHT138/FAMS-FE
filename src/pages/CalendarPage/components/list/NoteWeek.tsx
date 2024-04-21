import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import { Calendar } from "../../../../models";
import { useEffect, useState } from "react";
import { colorConfig } from "../../../../configs/colorConfig";
import {
  MapsHomeWorkOutlined,
  RecordVoiceOverOutlined,
  StarOutline,
} from "@mui/icons-material";

type NoteWeekProps = {
  noteCalendar?: Calendar;
};

const NoteWeek = ({ noteCalendar }: NoteWeekProps) => {
  const [randomColor, setRandomColor] = useState<string>("");
  const getRandomColorFromArray = (): string => {
    const colors: string[] = [
      colorConfig.blue,
      colorConfig.mainColor,
      colorConfig.orange,
      colorConfig.green,
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    const color = getRandomColorFromArray();
    setRandomColor(color);
  }, []);
  return (
    <Box sx={{ opacity: 0.9 }} key={noteCalendar?.sessionId}>
      <Accordion>
        <AccordionSummary
          sx={{
            bgcolor: randomColor,
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          <>{noteCalendar?.className}</>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            bgcolor: randomColor,
            color: "#fff",
            opacity: 0.7,
            borderRadius: "0px 0px 10px 10px",
          }}
        >
          <Grid container display="flex" justifyContent="space-between">
            <Grid item xs={3}>
              <Stack spacing={2}>
                <MapsHomeWorkOutlined sx={{ color: "#000" }} />
                <RecordVoiceOverOutlined sx={{ color: "#000" }} />
                <StarOutline sx={{ color: "#000" }} />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <div>{noteCalendar?.location}</div>
                <div>
                  {noteCalendar?.trainers.map((trainer) => (
                    <div>{trainer}</div>
                  ))}
                </div>
                <div>
                  {noteCalendar?.admins?.map((admin) => (
                    <div>{admin}</div>
                  ))}
                </div>
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default NoteWeek;
