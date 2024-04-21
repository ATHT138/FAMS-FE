import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React from "react";

const options = [
  { label: "All level", id: 1 },
  { label: "Beginner", id: 2 },
  { label: "Advanced", id: 3 },
  { label: "Auto detect", id: 4 },
];

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

interface GeneralCreateProps {
  level: number;
  attendeeNumber: number;
  technicalRequirement: string;
  courseObjectives: string;
  handleAttendeeNumberChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleObjectiveChange: (content: string) => void;
  handleTechnicalRequirementChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleLevelChange: (event: any) => void;
  onInputChanged: (
    level: number,
    attendeeNumber: number,
    objective: string,
    technicalRequirement: string
  ) => void;
}

const GeneralCreate = ({
  handleAttendeeNumberChange,
  handleObjectiveChange,
  handleLevelChange,
  handleTechnicalRequirementChange,
  attendeeNumber,
  technicalRequirement,
  courseObjectives,
  level,
}: GeneralCreateProps) => {
  return (
    <Stack sx={{ width: "100%", padding: 3 }} spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        width="40%"
        justifyContent="space-between"
      >
        <TypographyUI title="Level" />
        <FormControl sx={{ width: "45%" }}>
          <InputLabel>Select Level</InputLabel>
          <Select
            label="Select"
            variant="outlined"
            onChange={handleLevelChange}
            value={level}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack
        width="40%"
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <TypographyUI title="Attendee number" />
        <TextField
          type="number"
          value={attendeeNumber}
          onChange={handleAttendeeNumberChange}
        />
      </Stack>
      <Stack>
        <TypographyUI title="Technical Requirement(s)" />
        <TextField
          multiline
          rows={4}
          value={technicalRequirement}
          onChange={handleTechnicalRequirementChange}
        />
      </Stack>
      <Stack paddingBottom={5}>
        <TypographyUI title="Course Objectives" />
        <ReactQuill
          value={courseObjectives}
          onChange={handleObjectiveChange}
          theme="snow"
          modules={modules}
          style={{ height: "20vh" }}
        />
      </Stack>
    </Stack>
  );
};

export default GeneralCreate;
