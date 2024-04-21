import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  classActions,
  selectCurrentClass,
} from "../../../features/class/class.slice";
import { Box, Chip, Divider, Grid, IconButton, Stack } from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import RenderDay from "../components/render/RenderDay";
import {
  BookOutlined,
  CalendarTodayOutlined,
  MoreHoriz,
  PanToolOutlined,
  RecordVoiceOverOutlined,
  SettingsInputAntenna,
  SpellcheckOutlined,
} from "@mui/icons-material";
import AccordionUI from "../../../components/ui/accordion/AccordionUI";
import RenderGeneral from "../components/render/RenderGerenal";
import RenderTimeFrame from "../components/render/RenderTimeFrame";
import TabUI from "../../../components/ui/tab";

import AttendeeList from "../components/tab/AttendeeList";
import Budget from "../components/tab/Budget";
import Others from "../components/tab/Others";
import RenderTrainingProgramViewClass from "../components/render/RenderTrainingProgramViewClass";

const tabs = [
  { checkNumber: 0, tabLabel: "Trainning Program" },
  { checkNumber: 1, tabLabel: "Attendee List" },
  { checkNumber: 2, tabLabel: "Budget" },
  { checkNumber: 3, tabLabel: "Others" },
];

const ClassDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentClass = useAppSelector(selectCurrentClass);
  console.log(currentClass);

  useEffect(() => {
    dispatch(classActions.checkClass(id ?? ""));
  }, []);

  return (
    <>
      <Box
        width="100%"
        padding="20px 30px 20px 30px"
        bgcolor={colorConfig.mainColor}
        border="solid #fff"
        color="#fff"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack spacing={3} direction="row" alignItems="center">
          <Stack spacing={2}>
            <TypographyUI title="Class" variant="h4" letterSpacing="0.3rem" />
            <TypographyUI
              title={`${currentClass && currentClass?.className}`}
              variant="h2"
              letterSpacing="0.3rem"
            />
            <TypographyUI title="HCM22_FR_DevOps_01" />
            <Divider sx={{ border: "1px solid #fff" }} />
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ border: "0.2px solid #fff" }}
                />
              }
            >
              <RenderDay hours={currentClass && currentClass?.duration} />
              <div>
                <IconButton>
                  <BookOutlined sx={{ color: "#fff" }} />
                </IconButton>
                <IconButton>
                  <RecordVoiceOverOutlined sx={{ color: "#fff" }} />
                </IconButton>
                <IconButton>
                  <SpellcheckOutlined sx={{ color: "#fff" }} />
                </IconButton>
                <IconButton>
                  <SettingsInputAntenna sx={{ color: "#fff" }} />
                </IconButton>
                <IconButton>
                  <PanToolOutlined sx={{ color: "#fff" }} />
                </IconButton>
              </div>
            </Stack>
          </Stack>
          <Chip
            label="Planning"
            variant="outlined"
            sx={{ padding: 2, color: "#fff", fontSize: "large" }}
          />
        </Stack>
        <IconButton>
          <MoreHoriz fontSize="large" sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
      <Grid container padding={3} spacing={3}>
        <Grid item xs={3.5}>
          <AccordionUI
            bgcolor={colorConfig.mainColor}
            color="#fff"
            icon={<CalendarTodayOutlined />}
            detail="General"
            subDetail=""
            children={
              <RenderGeneral
                data={currentClass && currentClass}
                type="Detail"
              />
            }
          />
        </Grid>
        <Grid item xs={8.5}>
          <AccordionUI
            bgcolor={colorConfig.mainColor}
            color="#fff"
            icon={<CalendarTodayOutlined />}
            detail="Time frame"
            subDetail=""
            children={
              <RenderTimeFrame
                sessions={currentClass && currentClass?.sessions}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TabUI
            tabs={tabs}
            data={[
              {
                id: 0,
                children: (
                  <RenderTrainingProgramViewClass
                    trainingProgramViewClass={
                      currentClass && currentClass.trainingProgramViewClass
                    }
                  />
                ),
              },
              { id: 1, children: <AttendeeList /> },
              { id: 2, children: <Budget /> },
              { id: 3, children: <Others /> },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ClassDetail;
