import { Autocomplete, Box, IconButton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Show from "../../../../utils/Show";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import { TrainingProgram as TrainingProgramModule } from "../../../../models";
import RenderTrainingProgram from "../render/RenderTrainingProgram";
import { SearchOutlined } from "@mui/icons-material";
import { useAppDispatch } from "../../../../store/hooks";
import { programActions } from "../../../../features/TrainingProgram/trainingProgram.slice";

type Props = {
  inputId: string | null;
  programList?: TrainingProgramModule[];
  program?: TrainingProgramModule | null;
  handleTrainingProgramClick: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
};

const TrainingProgram = (props: Props) => {
  const { programList, program, handleTrainingProgramClick, inputId } = props;
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // const [selectOption, setSelectedOption] =
  //   useState<TrainingProgramModule | null>(null);

  useEffect(() => {
    if (inputId) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    dispatch(programActions.fetchList({ page: 1, pageSize: 20 }));
  }, []);

  const handleGoBack = (value: boolean) => {
    setShow(value);
  };

  return (
    <Box borderBottom={3} sx={{ backgroundColor: "#2D3748", color: "#fff" }}>
      <Show>
        <Show.When isTrue={!show}>
          <Box width="100%" padding={3}>
            <Stack spacing={2} width="40%">
              <TypographyUI title="Training Program name" />
              <Stack spacing={2} position="relative" direction="row">
                <Autocomplete
                  options={programList ?? []}
                  sx={{ width: "80%", bgcolor: "#fff", color: "#000" }}
                  getOptionLabel={(option) => `${option.name}`}
                  isOptionEqualToValue={(option, value) => {
                    return option.name === value.name;
                  }}
                  ListboxProps={{ style: { maxHeight: 200, overflow: "auto" } }}
                  noOptionsText="No program found"
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      {...props}
                      key={option.trainingProgramCode}
                      value={option.trainingProgramCode?.toString() ?? ""}
                      onClick={(event) => {
                        setShow(true);
                        handleTrainingProgramClick(event);
                      }}
                    >
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Training Program Search" />
                  )}
                />
                <IconButton onClick={() => setShow(true)}>
                  <SearchOutlined sx={{ color: "#fff" }} />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Show.When>
        <Show.Else>
          <RenderTrainingProgram
            trainingProgram={program}
            goBack={handleGoBack}
          />
        </Show.Else>
      </Show>
    </Box>
  );
};

export default TrainingProgram;
