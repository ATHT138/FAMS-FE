import { Box, Grid, Stack } from "@mui/material";

import TimeAllocate from "../TimeAllocate";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import { SyllabusOutline } from "../../../../models";
import ListContentSyllabus from "../ListContentSyllabus";

interface OutlineDetailProps {
  syllabusOutline: SyllabusOutline | null;
}

const OutlineDetail = ({ syllabusOutline }: OutlineDetailProps) => {
  const datas = [
    {
      id: 1,
      value: syllabusOutline?.timeAlocation?.assignment,
      label: `Assignment/Lab`,
      color: "#F4BE37",
    },
    {
      id: 2,
      value: syllabusOutline?.timeAlocation?.concept,
      label: "Concept/Lecture",
      color: "#FF9F40",
    },
    {
      id: 3,
      value: syllabusOutline?.timeAlocation?.guide,
      label: "Guide/Revuew",
      color: "#0D2535",
    },
    {
      id: 4,
      value: syllabusOutline?.timeAlocation?.test,
      label: "Test/Quiz",
      color: "#5388D8",
    },
    {
      id: 5,
      value: syllabusOutline?.timeAlocation?.exam,
      label: "Exam",
      color: "#206EE5",
    },
  ];
  return (
    <Grid container>
      <Grid item xs={8}>
        <Stack spacing={1}>
          <ListContentSyllabus data={syllabusOutline} />
        </Stack>
      </Grid>
      <Grid
        item
        xs={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={2}
      >
        <Box width="350px" boxShadow={10} borderRadius={3} overflow="hidden">
          <Box
            sx={{
              width: "100%",
              paddingTop: 1,
              paddingBottom: 1,
              bgcolor: "#2D3748",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TypographyUI title="Time allocation" />
          </Box>
          <Box marginLeft={2} marginTop={2}>
            <TimeAllocate
              datas={
                datas as {
                  id: number;
                  value: number;
                  label: string;
                  color: string;
                }[]
              }
            />
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="start"
              marginLeft={7}
              marginTop={1}
              marginBottom={4}
              right={30}
              top={55}
            >
              {datas.map((params) => (
                <Stack direction="row" alignItems="center" key={params.id}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: params.color,
                      marginRight: 2,
                    }}
                  />
                  <TypographyUI
                    title={`${params.label} (${params.value
                      ?.toString()
                      .slice(0, 5)}%)`}
                  />
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OutlineDetail;
