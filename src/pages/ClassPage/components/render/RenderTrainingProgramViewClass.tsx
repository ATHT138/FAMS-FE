import { Box, Divider, Stack } from "@mui/material";
import { colorConfig } from "../../../../configs/colorConfig";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import { trainingProgramViewClass } from "../../../../models";
import RenderSyllabus from "./RenderSyllabus";
import { FormatType, formatFromISOString } from "../../../../utils/formatDate";

interface RenderTrainingProgramViewClassProps {
  trainingProgramViewClass?: trainingProgramViewClass | null;
}

const RenderTrainingProgramViewClass = ({
  trainingProgramViewClass,
}: RenderTrainingProgramViewClassProps) => {
  return (
    <Box borderBottom={3} bgcolor={colorConfig.mainColor} color="#fff">
      <Stack padding={2} spacing={2} boxShadow="10px">
        <TypographyUI
          variant="h3"
          title={`${trainingProgramViewClass?.name}`}
          letterSpacing="0.3rem"
        />
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
            <div>{trainingProgramViewClass?.duration} days</div>
            <i>({trainingProgramViewClass?.totalHours} hours)</i>
          </Box>
          <Box sx={{ fontStyle: "normal", display: "flex", gap: 1 }}>
            <div>Modified on</div>
            <i>
              {formatFromISOString(
                trainingProgramViewClass?.createDate ?? "",
                FormatType.DATE
              )}
            </i>
            <div>by</div> <strong>{trainingProgramViewClass?.createBy}</strong>
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
          {trainingProgramViewClass?.syllabuseViewClass?.map(
            (syllabusView, index) => (
              <RenderSyllabus key={index} syllabusView={syllabusView} />
            )
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default RenderTrainingProgramViewClass;
