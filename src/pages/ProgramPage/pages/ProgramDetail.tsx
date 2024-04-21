import { Box, Button, Chip, Divider, IconButton, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import { MoreHoriz } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  programActions,
  selectTrainingProgram,
} from "../../../features/TrainingProgram/trainingProgram.slice";
import { useEffect } from "react";
import ClassTable from "../../ClassPage/components/ClassTable";
import SyllabusContent from "../components/Detail/renderSyllabusinProgramDetail";

const DetailProgram = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const program = useAppSelector(selectTrainingProgram);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      programActions.fetchProgramById({
        id: parseInt(id ?? ""),
      })
    );
  }, [dispatch]);

  const dateToString = (date: Date) => {
    return date.toLocaleDateString("UTC", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return program != null ? (
    <>
      <Box bgcolor="#2D3748" padding={3} gap={3}>
        <TypographyUI
          title="Training program"
          color="#fff"
          variant="h4"
          letterSpacing="0.3rem"
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack spacing={3} direction="row" alignItems="center">
            <TypographyUI
              title={program?.name == null ? "load failed" : program?.name}
              color="#fff"
              variant="h2"
              letterSpacing="0.3rem"
            />
            <Chip
              label={
                program?.status == 1
                  ? "active"
                  : program?.status == 0
                    ? "inactive"
                    : "draft"
              }
              variant="outlined"
              sx={{
                padding: 2,
                fontSize: "large",
                color: "#fff",
                borderColor: "#fff",
                backgroundColor:
                  program?.status == 1
                    ? ""
                    : program?.status == 0
                      ? "grey"
                      : "blue",
              }}
            />
          </Stack>
          <IconButton>
            <MoreHoriz sx={{ color: "#fff" }} fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Stack spacing={2} padding={3}>
        <div>
          <strong style={{ fontSize: 24 }}>
            Duration: {program?.totalDays}
          </strong>{" "}
          <i>({program?.totalHours} hours)</i>
        </div>
        {program?.modifiedBy == null ? (
          <div>
            Modified on <i>{dateToString(new Date(program.createdAt))}</i> by{" "}
            <strong>{program?.createdBy?.name}</strong>
          </div>
        ) : (
          <div>
            Modified on <i>{dateToString(new Date(program.lastModifiedAt))}</i>{" "}
            by <strong>{program?.modifiedBy?.name}</strong>
          </div>
        )}
      </Stack>
      <Divider
        variant="fullWidth"
        sx={{ border: "1px solid", boxShadow: 10, borderBottom: 3 }}
      />
      <Box padding={3} width="100%">
        <TypographyUI title="General information" variant="h4" />
        <Box
          boxShadow={10}
          borderRadius="10px"
          padding="5px 10px 5px 10px"
          minHeight="150px"
          marginTop={4}
          marginBottom={4}
          width="70%"
        >
          {program?.generalInformation}
        </Box>
        <TypographyUI title="Content" variant="h4" />
        {program.syllabuses?.length !== 0
          ? program.syllabuses?.map((syllabus) => (
            // @ts-expect-error
            <SyllabusContent syllabus={syllabus}></SyllabusContent>
          ))
          : null}
        <TypographyUI title="List of class" variant="h4" />
        {
          //@ts-expect-error
          <ClassTable classList={program.classes}></ClassTable>
        }
      </Box>
      <Box sx={{ display: "flex", margin: "2px 10px 2px 10px" }}>
        <Button onClick={() => navigate("/training-program")}>back</Button>
        <Box sx={{ flex: "1", textAlign: "right" }}>
          <Button sx={{ width: "8%" }}>Edit</Button>
          <Button sx={{ width: "15%" }}>Duplicate</Button>
          <Button sx={{ width: "7%" }}>Active</Button>
        </Box>
      </Box>
    </>
  ) : (
    <> failed</>
  );
};

export default DetailProgram;
