import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import { colorConfig } from "../../../../configs/colorConfig";
import { useEffect, useState } from "react";
import { Calendar } from "../../../../models";
import {
  MapsHomeWorkOutlined,
  RecordVoiceOverOutlined,
  StarOutline,
} from "@mui/icons-material";

interface NoteItemProps {
  noteCalendar?: Calendar;
}
const NoteItem = ({ noteCalendar }: NoteItemProps) => {
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
            minWidth: "400px",
            bgcolor: randomColor,
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          <>{noteCalendar?.className}</>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            minWidth: "400px",
            bgcolor: randomColor,
            color: "#fff",
            opacity: 0.7,
            borderRadius: "0px 0px 10px 10px",
            paddingTop: 2,
          }}
        >
          <Grid container display="flex" justifyContent="space-between">
            <Grid item xs={3}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={3}>
                  <MapsHomeWorkOutlined sx={{ color: "#000" }} />
                  <div>Location</div>
                </Stack>
                <Stack direction="row" spacing={3}>
                  <RecordVoiceOverOutlined sx={{ color: "#000" }} />
                  <div>Trainer</div>
                </Stack>
                <Stack direction="row" spacing={3}>
                  <StarOutline sx={{ color: "#000" }} />
                  <div>Admin</div>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <div>{noteCalendar?.location}</div>
                <div>
                  {noteCalendar?.trainers?.map((trainer, index) => (
                    <div key={index}>{trainer}</div>
                  ))}
                </div>
                <Stack spacing={1.5}>
                  {noteCalendar?.admins?.map((admin, index) => (
                    <div key={index}>{admin}</div>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default NoteItem;
