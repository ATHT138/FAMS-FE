import {
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import RenderDays from "./RenderDays";
import { lazy, useEffect, useRef, useState } from "react";
import Show from "../../../utils/Show";
import RenderGeneral from "./RenderGeneral";
import RenderContent from "./RenderContent";
import { DeleteForeverOutlined, Search } from "@mui/icons-material";
import { colorConfig } from "../../../configs/colorConfig";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  CreateTrainingProgram,
  ListParams,
  SelectedSyllabusInTrainingProgramRequestModel,
  Syllabus,
  TrainingProgram,
} from "../../../models";
import {
  selectSyllabusFilter,
  selectSyllabusList,
  syllabusAcitons,
} from "../../../features/syllabus/syllabus.slice";
import SyllabusSearchUI from "./renderSyllabusSearch";
import SaveDialogUI from "./Dialog/saveDialog";
import BackDialogUI from "./Dialog/backDialog";
import CancelDialogUI from "./Dialog/cancelDialog";
import { programActions, selectProgramStatus, selectTrainingProgram } from "../../../features/TrainingProgram/trainingProgram.slice";
const List = lazy(() => import("@mui/material/List"));

type Props = {
  name?: string;
  program?: TrainingProgram;
};

const AddTrainingProgram = ({ name }: Props) => {
  const searchRef = useRef(null);
  const [createProgram] = useState<CreateTrainingProgram>({
    name: name,
    startTime: new Date(),
    syllabusesIds: [],
    status: 2,
    generalInformation: "",
  });
  const [syllabuses, setSyllabuses] = useState<Syllabus[]>([]);
  const [days, setDays] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [syllabusFilter, setSyllabusFilter] = useState<ListParams>(
    useAppSelector(selectSyllabusFilter)
  );
  const searchedSyllabuses = useAppSelector(selectSyllabusList);
  const [syllabusCreateModel] = useState<
    SelectedSyllabusInTrainingProgramRequestModel[]
  >([]);
  const sagaStatus = useAppSelector(selectProgramStatus);
  const newProgram = useAppSelector(selectTrainingProgram);
  useEffect(() => {
    console.log(syllabusFilter);
    dispatch(syllabusAcitons.fetchSyllabusList(syllabusFilter));
  }, [syllabusFilter]);
  useEffect(() => {
    if (sagaStatus === "Created successfully") {
      navigate(`/training-program/${newProgram?.trainingProgramCode}`);
    }
  }, [sagaStatus, newProgram]);
  const dateToString = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const handleCreate = (status: number) => {
    syllabuses.map((value, index) => {
      syllabusCreateModel.push({
        syllabusesId: value.syllabusId,
        sequence: index,
      });
    });
    const createConst: CreateTrainingProgram = {
      name: name,
      startTime: new Date,
      syllabusesIds: syllabusCreateModel,
      status: status,
      generalInformation: createProgram.generalInformation,
    };
    dispatch(programActions.fetchCreate(createConst));
  };
  const handleDeleteContent = (syllabusToDelete: Syllabus) => {
    setSyllabuses((oldSyllabuses) => {
      return oldSyllabuses.filter((syllabus) => syllabus !== syllabusToDelete);
    });
    setDays(days - (syllabusToDelete?.duration ?? 0));
  };
  const handleAddSyllabus = (value: Syllabus) => {
    syllabuses.push(value);
    setDays(days + (value.duration ?? 0));
    handleClose();
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    console.log(value);
    if (value != null) {
      setSearchValue(value);
    }
    setSyllabusFilter({
      num_page: 1,
      size_page: 100000,
      sort_by: [
        {
          type: "TopicName",
          value: "asc",
        },
      ],
      search_by:
        value == null
          ? [
              {
                type: "TopicName",
                value: searchValue,
              },
            ]
          : [
              {
                type: "TopicName",
                value: value,
              },
            ],
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        width="100%"
        padding="20px 0px 20px 30px"
        bgcolor={colorConfig.mainColor}
        border="solid #fff"
        color="#fff"
      >
        <TypographyUI
          variant="h6"
          title="Training Program"
          letterSpacing="0.3rem"
          fontWeight="Inter"
        />
        <TypographyUI variant="h3" title={`${name}`} letterSpacing="0.3rem" />
      </Box>
      <RenderDays
        days={days}
        hours={0}
        date={dateToString(new Date())}
        createBy="Minh Toan"
      />
      <Show>
        <Show.When isTrue={true}>
          <Box padding={3}>
            <TypographyUI
              title="General Information"
              fontWeight="Bold"
              variant="h4"
            />
            <TextField
              sx={{ width: "70%" }}
              label=""
              multiline
              rows={4}
              defaultValue=""
              id="filled-multiline-static"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                createProgram.generalInformation = e.currentTarget.value;
              }}
            />
          </Box>
        </Show.When>
        <Show.Else>
          <RenderGeneral information={`${createProgram?.generalInformation}`} />
        </Show.Else>
      </Show>

      <Stack padding={3} spacing={5}>
        <TypographyUI title="Content" fontWeight="Bold" variant="h4" />
        {/*Render content of syllabus*/}
        <Show>
          <Show.When isTrue={true}>
            <Stack spacing={2}>
              {syllabuses.length != 0
                ? syllabuses.map((value, index) => (
                    <>
                      <Stack direction="row" spacing={3} key={1}>
                        <RenderContent
                          name={value.topicName}
                          days={value.duration}
                          hours={value.hours}
                          modifiedOn={
                            value.createDate
                              ? dateToString(new Date(value.createDate))
                              : null
                          }
                          modifiedBy={value.createBy}
                          shadow={3}
                        />
                        <Button
                          sx={{
                            height: "130px",
                            bgcolor: "red",
                            borderRadius: "10px",
                            "&:hover": {
                              bgcolor: "red",
                            },
                          }}
                          onClick={() => handleDeleteContent(syllabuses[index])}
                        >
                          <DeleteForeverOutlined sx={{ color: "#fff" }} />
                        </Button>
                      </Stack>
                    </>
                  ))
                : null}
            </Stack>
          </Show.When>
        </Show>
        <Stack
          marginTop={2}
          marginBottom={2}
          spacing={4}
          alignItems="flex-start"
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Stack sx={{ display: "flex" }}>
              <TypographyUI title="Select syllabus" />
              <Box sx={{ position: "relative" }}>
                <TextField
                  value={searchValue}
                  inputRef={searchRef}
                  variant="outlined"
                  placeholder="Search by ..."
                  onClick={() => setOpen(true)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearch(e)
                  }
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                      minWidth: "400px",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton disabled={true}>
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {open ? (
                  searchedSyllabuses.length != 0 ? (
                    <List
                      sx={{
                        zIndex: 1,
                        width: "400px",
                        maxHeight: "300px",
                        overflow: "auto",
                      }}
                    >
                      {searchedSyllabuses.map((value) => (
                        <MenuItem
                          onClick={() => {
                            handleAddSyllabus(value);
                          }}
                        >
                          <SyllabusSearchUI prop={value}></SyllabusSearchUI>
                        </MenuItem>
                      ))}
                    </List>
                  ) : (
                    <MenuItem>No syllabus found</MenuItem>
                  )
                ) : null}
              </Box>
            </Stack>
          </ClickAwayListener>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          sx={{ position: "relative", bottom: "1", right: "1", mb: 1, mr: 1 }}
        >
          <BackDialogUI name={name ?? ""}></BackDialogUI>
        </Box>
        <Box
          sx={{ position: "absolute", bottom: "1", right: "0", mb: 1, mr: 1 }}
        >
          <CancelDialogUI
            isDraft={true}
            handleClick={handleCreate}
          ></CancelDialogUI>
          <SaveDialogUI
            name={name}
            generalInformation={createProgram.generalInformation}
            syllabuses={syllabuses}
            handleCreate={handleCreate}
          ></SaveDialogUI>
        </Box>
      </Box>
    </>
  );
};

export default AddTrainingProgram;
