import { Box, Divider, Grid, Stack, TextField } from "@mui/material";
import TimeAllocate from "../TimeAllocate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import { useEffect, useState } from "react";

type Props = {
  datas:
  | {
    id: number;
    value: number;
    label: string;
    color: string;
  }[];
  otherData: any;
  handleOtherInputChange: (other: any) => void;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
  ],
};

const OtherCreate = ({ datas, handleOtherInputChange, otherData }: Props) => {
  const [other, setOther] = useState<any>(otherData ?? {
    quizz: 0,
    assignment: 0,
    final: 0,
    finalTheory: 0,
    finalPractice: 0,
    gpa: 0,
    trainingPrinciples: 0,
  });
  const convertStringToNumberAndCheck = (prevValue: number, valueIsString: string): number => {
    try {
      const minValue = -1;
      let value = 0;
      if (prevValue !== 0 && prevValue < 10) {
        value = parseInt(valueIsString);
        if (isNaN(value)) return 0;
        if (value < 10) return 0;
      } else {
        value = parseInt(valueIsString);
      }
      if (isNaN(value)) return 0;
      if (value < minValue) return -1;
      return value;
    } catch {
      return -1;
    }
  };



  const handlePrincipleChange = (content: string) => {
    setOther({
      ...other,
      trainingPrinciples: content
    });
  };

  const handleQuizzChange = (content: string) => {
    const value = convertStringToNumberAndCheck(other.quizz, content);
    if (value === -1) return;
    setOther({
      ...other,
      quizz: value,
    });
  };
  const handleAssignmentChange = (content: string) => {
    const value = convertStringToNumberAndCheck(other.assignment, content);
    if (value === -1) return;
    setOther({
      ...other,
      assignment: value
    });
  };
  const handleFinalChange = (content: string) => {
    const value = convertStringToNumberAndCheck(other.final, content);
    if (value === -1) return;
    setOther({
      ...other,
      final: value
    });
  };
  const handleFinalTheoryChange = (content: string) => {
    const value = convertStringToNumberAndCheck(other.finalTheory, content);
    if (value === -1) return;
    setOther({
      ...other,
      finalTheory: value
    });
  };
  const handleFinalPracticeChange = (content: string) => {
    const value = convertStringToNumberAndCheck(other.finalPratice, content);
    if (value === -1) return;
    setOther({
      ...other,
      finalPractice: value
    });
  };
  const handleGpaChange = (content: string) => {
    const value = convertStringToNumberAndCheck(other.gpa, content);
    if (value === -1) return;
    setOther({
      ...other,
      gpa: value
    });
  };

  useEffect(() => {
    handleOtherInputChange(other);
  }, [other]);
  useEffect(() => {
    handleOtherInputChange(other);
  }, []);
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
          <Stack
            sx={{
              width: "100%",
              paddingTop: 1,
              paddingBottom: 1,
            }}
            position="relative"
          >
            <TimeAllocate datas={datas} />
            <Stack
              spacing={1}
              justifyContent="center"
              alignItems="start"
              marginLeft={7}
              marginTop={1}
              marginBottom={4}
              position="absolute"
              right={30}
              top={55}
            >
              {datas?.map((params) => (
                <Stack direction="row" alignItems="center" key={params.id}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      backgroundColor: params.color,
                      marginRight: 2,
                    }}
                  />
                  <TypographyUI title={`${params.label} (${params.value}%)`} />
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
          <Stack padding={3} spacing={1.5}>
            <Stack
              direction="row"
              width="35%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyUI fontWeight="Inter" title="Quiz*" />
              <TextField type="number" value={other.quizz == 0 ? "" : other.quizz} onChange={(event) => handleQuizzChange(event.target.value)}></TextField>
            </Stack>
            <Stack
              direction="row"
              width="50%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyUI fontWeight="Inter" title="Assignment*" />
              <TextField type="number" value={other.assignment == 0 ? "" : other.assignment} onChange={(event) => handleAssignmentChange(event.target.value)}></TextField>
            </Stack>
            <Stack
              direction="row"
              width="35%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyUI fontWeight="Inter" title="Final*" />
              <TextField type="number" value={other.final == 0 ? "" : other.final} onChange={(event) => handleFinalChange(event.target.value)}></TextField>
            </Stack>
            <Divider variant="inset" />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                width="35%"
                justifyContent="space-between"
                alignItems="center"
              >
                <TypographyUI fontWeight="Inter" title="Final Theory*" />
                <TextField type="number" value={other.finalTheory == 0 ? "" : other.finalTheory} onChange={(event) => handleFinalTheoryChange(event.target.value)}></TextField>
              </Stack>
              <Stack
                direction="row"
                width="35%"
                justifyContent="space-between"
                alignItems="center"
              >
                <TypographyUI fontWeight="Inter" title="Final Pratice*" />
                <TextField type="number" value={other.finalPractice == 0 ? "" : other.finalPractice} onChange={(event) => handleFinalPracticeChange(event.target.value)}></TextField>
              </Stack>
            </Stack>
            <Divider variant="inset" />
            <TypographyUI title="Passing criteria" />
            <Stack
              direction="row"
              width="35%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyUI fontWeight="Inter" title="GPA*" />
              <TextField type="number" value={other.gpa == 0 ? "" : other.gpa} onChange={(event) => handleGpaChange(event.target.value)}></TextField>
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
          <ReactQuill
            theme="snow"
            modules={modules}
            value={other.trainingPrinciples ?? ""}
            onChange={(event) => handlePrincipleChange(event)}
            style={{ height: "40vh" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
export default OtherCreate;
