import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import { useState } from "react";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import Uploader from "../../../components/ui/input/Uploader";
import { useAppDispatch } from "../../../store/hooks";
import { syllabusAcitons } from "../../../features/syllabus/syllabus.slice";
import { ImportSyllabusModel, ImportTrainingProgramModel } from "../../../models";
import { programActions } from "../../../features/TrainingProgram/trainingProgram.slice";

interface Props {
  type?: string | null;
}

const ImportSyllabus = ({ type }: Props) => {
  const [file, setFile] = useState<File | null>();
  const [delimiter, setColumnSeperator] = useState<string>(",");
  const [byCode, setScanCode] = useState<boolean>(false);
  const [byName, setScanName] = useState<boolean>(false);
  const [duplicationHandle, setDuplicateHandle] = useState<number>(0);
  const dispatch = useAppDispatch();

  console.log(file);


  const handleImportSyllabus = () => {
    if (file != null && delimiter != null && byCode != null && byName != null && duplicationHandle != null) {
      const importSyllabusParams: ImportSyllabusModel = {
        file: file,
        delimiter: delimiter,
        byCode: byCode,
        byName: byName,
        duplicationHandle: duplicationHandle,
        // handle import syllabus
      };
      dispatch(syllabusAcitons.importSyllabus(importSyllabusParams));
    }
  };
  const handleImportTrainingProgram = () => {
    if (file != null && delimiter != null && byCode != null && byName != null && duplicationHandle != null) {
      const importSyllabusParams: ImportTrainingProgramModel = {
        file: file,
        delimiter: delimiter,
        byCode: byCode,
        byName: byName,
        duplicationHandle: duplicationHandle,
        // handle import syllabus
      };
      dispatch(programActions.importTrainingProgram(importSyllabusParams));
    }
  };

  const handleImport = (event: any) => {
    setFile(event.target.files[0]);
    // var reader = new FileReader();
    // reader.onload = function (event) {
    //   setFile(event.target?.result?.toString() ?? "");
    // };
    // reader.readAsText(event.target.files[0]);
    // (e) => setFile(e.target?.files?.[0] ?? null)
  };


  return (
    <Box sx={{ padding: 3 }}>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={4}>
          <TypographyUI title="Import setting" />
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={4}>
            <TypographyUI fontWeight="Inter" title="File (csv)*" />
            <TypographyUI fontWeight="Inter" title="Column seperator" />
            <TypographyUI fontWeight="Inter" title="Template File (csv)*" />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={3} paddingLeft={5}>
            <Uploader handleUploadFile={handleImport} />
            <FormControl>
              <InputLabel>Select</InputLabel>
              <Select
                label="Select"
                onChange={(event) => {
                  switch (event.target.value) {
                    case "Comma":
                      setColumnSeperator(",");
                      break;
                    case "Dot":
                      setColumnSeperator(".");
                      break;
                    default:
                      break;
                  }
                }}
              >
                <MenuItem value={"Comma"}>Comma</MenuItem>
                <MenuItem value={"Dot"}>Dot</MenuItem>
              </Select>
            </FormControl>
            <span>
              <a href="" style={{ color: "blue" }}>
                Download
              </a>
            </span>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={4}>
          <TypographyUI title="Duplicate control" />
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <div>
              <Box>
                <TypographyUI title="Scanning" fontWeight="Inter" />
              </Box>
              <Stack direction="row">
                <FormControlLabel
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                  control={<Checkbox />}
                  onChange={() => setScanCode(!byCode)}
                  label="Code"
                />
                <FormControlLabel
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                  onChange={() => setScanName(!byName)}
                  control={<Checkbox />}
                  label="Name"
                />
              </Stack>
            </div>
            <div>
              <Box>
                <TypographyUI title="Duplicate handle" fontWeight="Inter" />
              </Box>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="allow"
                name="radio-buttons-group"
                onChange={(e) => {
                  if (e.target.value) {
                    switch (e.target.value) {
                      case "allow":
                        setDuplicateHandle(0);
                        break;
                      case "replace":
                        setDuplicateHandle(1);
                        break;
                      case "skip":
                        setDuplicateHandle(2);
                        break;
                      default:
                        break;
                    }
                  }
                }}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                  value="allow"
                  control={<Radio />}
                  label="Allow"
                />
                <FormControlLabel
                  value="replace"
                  control={<Radio />}
                  label="Replace"
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                />
                <FormControlLabel
                  sx={{
                    bgcolor: "#fff",
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                  value="skip"
                  control={<Radio />}
                  label="Skip"
                />
              </RadioGroup>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={3}>
        <Button
          variant="text"
          sx={{ color: "red", textDecoration: "underline" }}
        >
          Cancel
        </Button>
        {type === "trainingProgram" && <ButtonUI title="Import" bgcolor="#2D3748" color="#fff" onClick={handleImportTrainingProgram} />}
        {type === "syllabus" && <ButtonUI title="Import" bgcolor="#2D3748" color="#fff" onClick={handleImportSyllabus} />}
      </Stack>
    </Box >
  );
};

export default ImportSyllabus;
