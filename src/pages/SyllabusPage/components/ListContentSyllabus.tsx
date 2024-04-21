import { Box, Chip, Grid, IconButton, Stack } from "@mui/material";
import {
  BackHandOutlined,
  ClassOutlined,
  DeleteForeverOutlined,
  EditOutlined,
  Grading,
  RecordVoiceOverOutlined,
  SnippetFolderOutlined,
  Spellcheck,
} from "@mui/icons-material";
import AccordionUI from "../../../components/ui/accordion/AccordionUI";
import ModalUI from "../../../components/ui/modal/ModalUI";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import Show from "../../../utils/Show";
import { colorConfig } from "../../../configs/colorConfig";
import { SyllabusOutline } from "../../../models";
import ButtonUI from "../../../components/ui/button/ButtonUI";

interface ListContentSyllabusProps {
  data?: SyllabusOutline | null;
}

const ListContentSyllabus = (props: ListContentSyllabusProps) => {
  const { data } = props;

  const showDeliveryType = (
    type:
      | "Guide/Review"
      | "Test/Quiz"
      | "Assignment/lab"
      | "Concept/Lecture"
      | "Exam"
  ) => {
    switch (type) {
      case "Guide/Review":
        return <BackHandOutlined />;
        break;
      case "Test/Quiz":
        return <Grading />;
        break;
      case "Assignment/lab":
        return <ClassOutlined />;
        break;
      case "Concept/Lecture":
        return <RecordVoiceOverOutlined />;
        break;
      case "Exam":
        return <Spellcheck />;
        break;
      default:
        break;
    }
  };
  return (
    <Stack spacing={2}>
      {data?.trainingDays?.map((day: any, index) => (
        <AccordionUI
          bgcolor={colorConfig.mainColor}
          color="#fff"
          key={index}
          detail={`Day ${day.dayNumber}`}
          children={day.trainingUnits?.map((unit: any) => (
            <AccordionUI
              key={unit.unitCode}
              detail={`Unit ${unit.unitNumber}`}
              headerChildren={
                <Box>
                  <TypographyUI title={`${unit.unitName}`} variant="h5" />
                  <TypographyUI
                    title={`${unit.unitDuration}`}
                    variant="caption"
                    color="gray"
                  />
                </Box>
              }
              children={
                <Stack
                  spacing={2}
                  marginLeft={10}
                  padding={2}
                  justifyContent="space-between"
                >
                  {unit.trainingContents?.map((content: any) => (
                    <Grid
                      container
                      padding={2}
                      key={content.trainingContentId}
                      bgcolor="#F1F1F1"
                      borderRadius={2}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Grid item xs={4} display="flex" alignItems="center">
                        <TypographyUI
                          title={`${content.trainingContent1}`}
                          variant="subtitle1"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={7}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box
                          borderRadius={4}
                          padding={2}
                          bgcolor="#2D3748"
                          color="#fff"
                        >
                          {content.outputStandard}
                        </Box>
                        <TypographyUI
                          title={`${content.duration} mins`}
                          variant="subtitle1"
                        />
                        <Show>
                          <Show.When isTrue={content.note === "Online"}>
                            <Chip label="Online" variant="outlined" />
                          </Show.When>
                          <Show.Else>
                            <Chip label="Offline" variant="outlined" />
                          </Show.Else>
                        </Show>
                        {showDeliveryType(
                          content.deliveryType as
                            | "Guide/Review"
                            | "Test/Quiz"
                            | "Assignment/lab"
                            | "Concept/Lecture"
                            | "Exam"
                        )}
                        <ModalUI
                          icon={<SnippetFolderOutlined />}
                          modalTitle={`Day ${day.dayNumber}`}
                          children={
                            <Box padding={2}>
                              <Stack
                                direction="row"
                                spacing={8}
                                marginBottom={3}
                              >
                                <TypographyUI
                                  title={`Unit ${unit.unitName}`}
                                  variant="h6"
                                />
                                <TypographyUI
                                  title={`${unit.unitName}`}
                                  variant="h6"
                                />
                              </Stack>
                              <Box padding={2} bgcolor="#F1F1F1">
                                <TypographyUI
                                  title={`${content.trainingContent1}`}
                                  variant="h6"
                                />

                                <Stack marginTop={3}>
                                  {content.materialViewModels?.map(
                                    (material: any) => (
                                      <Grid container>
                                        <Grid item xs={3}>
                                          {material.name}
                                        </Grid>
                                        <Grid item xs={8}>
                                          <Stack
                                            direction="row"
                                            spacing={3}
                                            alignItems="center"
                                            justifyContent="end"
                                          >
                                            <i>
                                              by {material.createBy}{" "}
                                              {new Date(
                                                material.date
                                              ).toLocaleDateString()}
                                            </i>
                                            <IconButton>
                                              <EditOutlined />
                                            </IconButton>
                                            <IconButton>
                                              <DeleteForeverOutlined />
                                            </IconButton>
                                          </Stack>
                                        </Grid>
                                      </Grid>
                                    )
                                  )}
                                </Stack>
                              </Box>
                              <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                padding={2}
                              >
                                <ButtonUI
                                  title="Upload new"
                                  bgcolor={colorConfig.mainColor}
                                  color="#fff"
                                />
                              </Box>
                            </Box>
                          }
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Stack>
              }
            />
          ))}
        />
      ))}
    </Stack>
  );
};

export default ListContentSyllabus;
