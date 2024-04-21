// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Box,
//   Stack,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Syllabus, TrainingUnits } from "../../../../models";
// import RenderContent from "../RenderContent";
// import RenderDaysInProgram from "./renderTrainingDayInProgram";

// type Props = {
//   syllabus: Syllabus;
// };

//{ syllabus }: Props
const SyllabusContent = () => {
  // return syllabus.Outline != null ? (
  //   <>
  //     <Accordion sx={{ boxShadow: 10 }}>
  //       <AccordionSummary
  //         aria-controls="panel1-content"
  //         style={{ maxHeight: 120 }}
  //       >
  //         <Stack
  //           direction="row"
  //           alignItems="center"
  //           spacing={3}
  //           key={0}
  //           width="100%"
  //         >
  //           <RenderContent
  //             name={syllabus.topicName}
  //             days={syllabus.duration}
  //             hours={syllabus.hours}
  //             modifiedOn={syllabus.createDate}
  //             modifiedBy={syllabus.createBy}
  //             shadow={0}
  //           ></RenderContent>
  //         </Stack>
  //       </AccordionSummary>
  //       <AccordionDetails
  //         style={{
  //           maxHeight: 500,
  //           overflow: "auto",
  //           backgroundColor: "rgba(0, 0, 0, 0.2)",
  //           padding: "0px 0px 0px 0px",
  //         }}
  //       >
  //         <Box>
  //           {syllabusOutline != null
  //             ? syllabusOutline.trainingDays?.map((trainingDay) => (
  //               <Accordion sx={{ width: "auto", marginBottom: "2px" }}>
  //                 <AccordionSummary
  //                   style={{
  //                     maxHeight: 150,
  //                     backgroundColor: "#2D3748",
  //                     color: "white",
  //                   }}
  //                   expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
  //                 >
  //                   Day {trainingDay.dayNumber}:
  //                 </AccordionSummary>
  //                 <AccordionDetails sx={{ maxHeight: 500, overflow: "auto" }}>
  //                   {trainingDay.trainingUnitRequestModels?.map(
  //                     (unit: TrainingUnits, index: number) => (
  //                       <RenderDaysInProgram
  //                         day={trainingDay.dayNumber ?? 0}
  //                         data={unit}
  //                         index={index + 1}
  //                       ></RenderDaysInProgram>
  //                     )
  //                   )}
  //                 </AccordionDetails>
  //               </Accordion>
  //             ))
  //             : null}
  //         </Box>
  //       </AccordionDetails>
  //     </Accordion>
  //   </>
  // ) : (
  //   "loading"
  // );
};

export default SyllabusContent;
