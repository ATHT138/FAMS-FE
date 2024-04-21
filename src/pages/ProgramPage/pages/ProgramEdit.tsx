import { lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  programActions,
  selectTrainingProgram,
} from "../../../features/TrainingProgram/trainingProgram.slice";
import Show from "../../../utils/Show";
import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import { colorConfig } from "../../../configs/colorConfig";
import RenderDays from "../components/RenderDays";
import SaveDialogUI from "../components/Dialog/saveDialog";
import CancelDialogUI from "../components/Dialog/cancelDialog";
import { ListParams, Syllabus, TrainingProgram } from "../../../models";
import {
  selectSyllabusFilter,
  selectSyllabusList,
  syllabusAcitons,
} from "../../../features/syllabus/syllabus.slice";
import RenderContent from "../components/RenderContent";
import { DeleteForeverOutlined, Search } from "@mui/icons-material";
import SyllabusSearchUI from "../components/renderSyllabusSearch";
const List = lazy(() => import("@mui/material/List"));

const ProgramEdit = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const program = useAppSelector(selectTrainingProgram);
  const [name, setName] = useState<string>(program?.name ?? "");
  const [startTime] = useState<string>(program?.startTime ?? "");
  const [generalInformation, setGeneralInformation] = useState<string>(
    program?.generalInformation ?? ""
  );
  const [status, setStatus] = useState<number>(program?.status ?? -1);
  const [syllabuses, setSyllabuses] = useState<Syllabus[]>(
    program?.syllabuses ?? []
  );
  const [days, setDays] = useState<number>(
    //@ts-expect-error
    program?.syllabuses
      .map((value) => value.duration)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0
  );
  const [hours, setHours] = useState<number>(
    //@ts-expect-error
    program?.syllabuses
      .map((value) => value.hours)
      .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [syllabusFilter, setSyllabusFilter] = useState<ListParams>(
    useAppSelector(selectSyllabusFilter)
  );
  const searchedSyllabuses = useAppSelector(selectSyllabusList);

  useEffect(() => {
    dispatch(
      programActions.fetchProgramById({
        id: parseInt(id ?? "-1"),
      })
    );
  }, [dispatch]);
  useEffect(() => {
    dispatch(syllabusAcitons.fetchSyllabusList(syllabusFilter));
  }, [syllabusFilter]);
  const handleSave = () => {
    console.log("Save");
  };
  const dateToString = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const handleDeleteContent = (syllabusToDelete: Syllabus) => {
    setSyllabuses((oldSyllabuses) => {
      return oldSyllabuses.filter((syllabus) => syllabus !== syllabusToDelete);
    });
    setDays(days - (syllabusToDelete?.duration ?? 0));
    setHours(hours - (syllabusToDelete?.hours ?? 0));
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

  const handleAddSyllabus = (value: Syllabus) => {
    setSyllabuses((oldSyllabuses) => {
      return [...oldSyllabuses, value];
    });
    setDays(days + (value.duration ?? 0));
    setHours(hours + (value.hours ?? 0));
    handleClose();
  };
  const handleUpdate = () => {
    const updateModel: TrainingProgram = {
      trainingProgramCode: parseInt(id ?? "-1"),
      name: name == "" ? program?.name : name,
      startTime: startTime == "" ? program?.startTime : startTime,
      status: status == -1 ? program?.status : status,
      generalInformation:
        generalInformation == ""
          ? program?.generalInformation
          : generalInformation,
      syllabuses: syllabuses.length == 0 ? program?.syllabuses : syllabuses,
      createdAt: "",
      lastModifiedAt: "",
      totalDays: 0,
      totalHours: 0,
    };
    console.log("Page layer: ", updateModel);

    dispatch(programActions.fetchUpdate(updateModel));
  };
  return program ? (
    <>
      <Box
        width="100%"
        padding="20px 0px 20px 30px"
        bgcolor={colorConfig.mainColor}
        border="solid #fff"
        color="#fff"
      >
        <TypographyUI
          variant="h3"
          title="Edit Training Program"
          letterSpacing="0.3rem"
          fontWeight="Inter"
        />
        <Divider sx={{ backgroundColor: "#fff" }}></Divider>
        <Box sx={{ marginTop: "20px" }}>
          <TypographyUI
            variant="h6"
            title="Training Program Name"
            letterSpacing="0.3rem"
            fontWeight="Inter"
          />
          <TextField
            sx={{
              width: "70%",
              input: { color: "#fff" },
              border: { color: "#fff" },
            }}
            InputProps={{ style: { fontSize: 50 } }}
            defaultValue={program.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.currentTarget.value);
            }}
          ></TextField>
          <Select
            size="small"
            defaultValue={program.status}
            onChange={(e) => {
              setStatus(e.target.value as number);
            }}
            sx={{
              backgroundColor: "white",
              width: "12%",
              input: { color: "#fff" },
              border: { color: "#fff" },
              borderRadius: "50px",
              marginLeft: "10px",
            }}
          >
            <MenuItem value={1}>
              <Box sx={{ color: "green", fontWeight: "bold" }}>Active</Box>
            </MenuItem>
            <MenuItem value={2}>
              <Box sx={{ color: "blue", fontWeight: "bold" }}>Draft</Box>
            </MenuItem>
            <MenuItem value={0}>
              <Box sx={{ color: "gray", fontWeight: "bold" }}>Inactive</Box>
            </MenuItem>
          </Select>
        </Box>
      </Box>
      <RenderDays
        days={days}
        hours={0}
        date={
          dateToString(
            new Date(
              program.modifiedBy ? program.lastModifiedAt : program.createdAt
            )
          ) ?? ""
        }
        createBy={program.createdBy?.name ?? ""}
      />
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
          value={generalInformation}
          defaultValue={program.generalInformation}
          id="filled-multiline-static"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setGeneralInformation(e.currentTarget.value);
          }}
        />
      </Box>

      <Stack padding={3} spacing={5}>
        <TypographyUI title="Content" fontWeight="Bold" variant="h4" />
        {/*Render content of syllabus*/}
        <Show>
          <Show.When isTrue={true}>
            <Stack spacing={2}>
              {syllabuses.length > 0
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
                              : "Error"
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
                  variant="outlined"
                  placeholder="Search by ..."
                  onClick={() => setOpen(true)}
                  //@ts-expect-error
                  onChange={(e) => handleSearch(e)}
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
          <CancelDialogUI
            isDraft={false}
            handleClick={() => navigate(`/training-program/${id}`)}
          ></CancelDialogUI>
        </Box>
        <Box
          sx={{ position: "absolute", bottom: "1", right: "0", mb: 1, mr: 1 }}
        >
          <SaveDialogUI
            name={name}
            generalInformation={generalInformation}
            syllabuses={syllabuses ?? []}
            handleCreate={handleSave}
          ></SaveDialogUI>
        </Box>
      </Box>
      <Button onClick={handleUpdate}>update</Button>
    </>
  ) : null;
};

export default ProgramEdit;
