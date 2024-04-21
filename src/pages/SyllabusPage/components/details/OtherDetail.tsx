import { Box, Grid, Stack } from "@mui/material";
import TimeAllocate from "../TimeAllocate";
import { VerifiedUserOutlined } from "@mui/icons-material";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import { SyllabusOther } from "../../../../models";

type Props = {
  datas: SyllabusOther | null;
};

const OtherDetail = ({ datas }: Props) => {
  const dataTimeAllocation = [
    {
      id: 1,
      value: datas?.timeAlocation?.assignment,
      label: `Assignment/Lab`,
      color: "#F4BE37",
    },
    {
      id: 2,
      value: datas?.timeAlocation?.concept,
      label: "Concept/Lecture",
      color: "#FF9F40",
    },
    {
      id: 3,
      value: datas?.timeAlocation?.guide,
      label: "Guide/Review",
      color: "#0D2535",
    },
    {
      id: 4,
      value: datas?.timeAlocation?.test,
      label: "Test/Quiz",
      color: "#5388D8",
    },
    {
      id: 5,
      value: datas?.timeAlocation?.exam,
      label: "Exam",
      color: "#206EE5",
    },
  ];
  return (
    <Grid container marginTop={2} borderBottom={2} spacing={2}>
      <Grid item xs={6} justifyContent="center" display="flex">
        <Box
          sx={{
            width: "100%",
            border: "1px solid",
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: 10,
          }}
        >
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
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Box>
              <TimeAllocate
                datas={
                  dataTimeAllocation as {
                    id: number;
                    value: number;
                    label: string;
                    color: string;
                  }[]
                }
              />
            </Box>
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="start"
              marginLeft={7}
              marginTop={1}
              marginBottom={4}
            >
              {dataTimeAllocation?.map((params) => (
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
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            width: "100%",
            border: "1px solid",
            borderRadius: 10,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: 10,
          }}
        >
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
            <TypographyUI fontWeight="Inter" title="Assessment scheme" />
          </Box>
          <Stack
            spacing={3}
            padding={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              padding={4}
              width="70%"
              borderRadius={3}
              border="1px solid #000"
              display="flex"
              justifyContent="space-between"
            >
              <Grid item xs={3}>
                <Stack direction="row" spacing={5}>
                  <TypographyUI title="Quiz" />
                  <TypographyUI title={`${datas?.assertmentScheme?.quizz}`} />
                </Stack>
                <Stack direction="row" spacing={5} marginTop={4}>
                  <TypographyUI title="Final" />
                  <TypographyUI title={`${datas?.assertmentScheme?.final}`} />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="row" spacing={5}>
                  <TypographyUI title="Assignmet" />
                  <TypographyUI
                    title={`${datas?.assertmentScheme?.assignment}`}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Stack
              padding={2}
              paddingLeft={4}
              width="70%"
              borderRadius={3}
              border="1px solid #000"
              spacing={4}
            >
              <TypographyUI title="Passing criteria" />
              <Stack direction="row" spacing={5}>
                <TypographyUI title="GPA*" fontWeight="Inter" />
                <TypographyUI
                  title={`${datas?.assertmentScheme?.gpa}`}
                  fontWeight="Inter"
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            width: "100%",
            border: "1px solid",
            borderRadius: 10,
            overflow: "hidden",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            boxShadow: 10,
          }}
        >
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
            <TypographyUI
              fontWeight="Inter"
              title="Training delivery principle"
            />
          </Box>
          <Box padding={2} paddingLeft={4}>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
              spacing={4}
            >
              <Stack direction="row" spacing={3}>
                <VerifiedUserOutlined fontSize="medium" />
                <TypographyUI title="Training" variant="h6" />
              </Stack>
              <Box padding={1}>{datas?.trainingPrinciples}</Box>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OtherDetail;
