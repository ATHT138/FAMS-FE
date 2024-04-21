import { Box, Button, Divider, Stack } from "@mui/material";
import { colorConfig } from "../../../../configs/colorConfig";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import { TrainingProgram } from "../../../../models";
import { FormatType, formatFromISOString } from "../../../../utils/formatDate";
import Show from "../../../../utils/Show";
// import RenderSyllabus from "./RenderSyllabus";
import { EditOutlined } from "@mui/icons-material";
import { useAppDispatch } from "../../../../store/hooks";
import { programActions } from "../../../../features/TrainingProgram/trainingProgram.slice";
import RenderSyllabus from "./RenderSyllabus";
interface RenderTrainingProgramProps {
  trainingProgram?: TrainingProgram | null;
  goBack: (value: boolean) => void;
}

const RenderTrainingProgram = ({
  trainingProgram,
  goBack,
}: RenderTrainingProgramProps) => {
  const dispatch = useAppDispatch();

  console.log("trainingProgram", trainingProgram);

  const backEdit = () => {
    console.log("backEdit");
    dispatch(programActions.fetchList({ page: 1, pageSize: 20 }));
    goBack(false);
  };
  return (
    <Box borderBottom={3} bgcolor={colorConfig.mainColor} color="#fff">
      <Stack padding={2} spacing={2} boxShadow="10px">
        <Stack direction="row" spacing={3}>
          <TypographyUI
            variant="h3"
            title={`${trainingProgram?.name}`}
            letterSpacing="0.3rem"
          />
          <Button
            onClick={backEdit}
            sx={{
              bgcolor: colorConfig.gray,
              color: "#000",
              "&:hover": { bgcolor: colorConfig.hoverColor, color: "#000" },
            }}
          >
            <EditOutlined />
          </Button>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          divider={
            <Divider
              orientation="vertical"
              sx={{ border: "1px solid #fff" }}
              flexItem
            />
          }
        >
          <Box sx={{ fontStyle: "normal", display: "flex", gap: 1 }}>
            <div>{trainingProgram?.totalDays} days</div>
            <i>({trainingProgram?.totalHours} hours)</i>
          </Box>
          <Box sx={{ fontStyle: "normal", display: "flex", gap: 1 }}>
            <div>Modified on</div>
            <i>
              {formatFromISOString(
                trainingProgram?.startTime ?? "",
                FormatType.DATE
              )}
              {/* {formatFromISOString(
                 ?? "",
                FormatType.DATE
              )} */}
            </i>
            <div>by</div>{" "}
            <strong>
              <Show>
                <Show.When isTrue={!!trainingProgram?.modifiedBy}>
                  {trainingProgram?.modifiedBy?.name}
                </Show.When>
                <Show.Else>{trainingProgram?.createdBy?.name}</Show.Else>
              </Show>
            </strong>
          </Box>
        </Stack>
      </Stack>
      <Box
        width="100%"
        bgcolor="#fff"
        boxShadow={20}
        borderRadius="0px 0px 10px 10px"
      >
        <Stack spacing={4} marginBottom={3} paddingTop={2} paddingBottom={2}>
          {trainingProgram?.syllabuses?.map((syllabusView, index) => (
            <RenderSyllabus key={index} syllabusView={syllabusView} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default RenderTrainingProgram;
