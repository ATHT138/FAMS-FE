import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import RenderDay from "./render/RenderDay";
import Show from "../../../utils/Show";
import {
  BookOutlined,
  CalendarTodayOutlined,
  Error,
  MoreHoriz,
  PanToolOutlined,
  RecordVoiceOverOutlined,
  SettingsInputAntenna,
  SpellcheckOutlined,
} from "@mui/icons-material";
import AccordionUI from "../../../components/ui/accordion/AccordionUI";
import { toast } from "react-toastify";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import TabUI from "../../../components/ui/tab";
import AttendeeList from "./tab/AttendeeList";
import Budget from "./tab/Budget";
import Others from "./tab/Others";
import { useOpenClose } from "../../../hooks/useOpenClose";
import RenderGeneral from "./render/RenderGerenal";
import RenderTimeFrame from "./render/RenderTimeFrame";
import TrainingProgram from "./tab/TrainingProgram";
import {
  programActions,
  selectProgramList,
  selectTrainingProgram,
} from "../../../features/TrainingProgram/trainingProgram.slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  ListParamsClassCreate,
  SessionRequestModel,
  TrainingProgram as TrainingProgramModel,
} from "../../../models";
import {
  classActions,
  classSlice,
  selectClassId,
  selectClassIsSuccessful,
  selectCurrentClass,
} from "../../../features/class/class.slice";
import { useNavigate } from "react-router-dom";
import { FormatType, formatFromISOString } from "../../../utils/formatDate";

type Props = {
  name: string;
  inputID: string | null;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const tabs = [
  { checkNumber: 0, tabLabel: "Trainning Program" },
  { checkNumber: 1, tabLabel: "Attendee List" },
  { checkNumber: 2, tabLabel: "Budget" },
  { checkNumber: 3, tabLabel: "Others" },
];

const ClassAdd = ({ name, inputID }: Props) => {
  const navigation = useNavigate();

  // State
  const [show, setShow] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  // const [programCode, setProgramCode] = useState<number>(0);
  // const [programName, setProgramName] = useState<string>();
  // const [trainingProgram, setTrainingProgram] =
  //   useState<TrainingProgramModel>();
  const [editClass, setEditClass] = useState<ListParamsClassCreate>({
    classCode: "",
    className: "",
    fsu: "",
    status: 1,
    trainingProgramCode: 0,
    createSessionRequestModel: {
      days: [],
      startTime: "",
      endTime: "",
    },
    classUserRequests: [],
    location: "",
  });

  // Use custom hook
  const { handleClose, open } = useOpenClose();

  // Redux
  const dispatch = useAppDispatch();
  // -- class
  const isSuccessful = useAppSelector(selectClassIsSuccessful);
  const actionClassID = useAppSelector(selectClassId);
  const currentClass = useAppSelector(selectCurrentClass);
  // -- program
  const programList = useAppSelector(selectProgramList);
  const selectProgram = useAppSelector(selectTrainingProgram);

  // console.log("programList", programList);
  // console.log("selectProgram", selectProgram);

  // Function
  const ChipSelect = (status: number) => {
    switch (status) {
      case 2:
        return (
          <Chip
            label="Planning"
            sx={{
              fontSize: "2rem",
              padding: 2.5,
              color: "#000",
              bgcolor: colorConfig.gray,
              border: "1px solid #fff",
            }}
          />
        );
      case 1:
        return (
          <Chip
            label="Draft"
            sx={{
              color: "#fff",
              fontSize: "2rem",
              padding: 2.5,
              bgcolor: "#B9B9B9",
              border: "1px solid #fff",
            }}
          />
        );
      default:
        break;
    }
  };

  console.log("edit Class", editClass);

  function convertToCode(name: string): string {
    const words = name.split(" ");
    const initials: string[] = [];

    words.forEach((word) => {
      if (word.length > 1) {
        initials.push(word.charAt(0).toUpperCase());
      } else if (word.length === 1) {
        initials.push(word.toUpperCase());
      }
    });

    const randomNumber = Math.floor(100 + Math.random() * 900);

    const code = initials.slice(0, 3).join("") + randomNumber;

    return code;
  }

  //callback function
  // const handleDataFromTabLab = async (dataName: string) => {
  //   setProgramName(dataName);
  // };

  const getDataGeneral = (
    startTime: string,
    endTime: string,
    userId: string[],
    fsu: string
  ) => {
    setEditClass((prevClass) => {
      return {
        ...prevClass,
        createSessionRequestModel: {
          ...prevClass.createSessionRequestModel,
          startTime: `${startTime}:00` ?? "",
          endTime: `${endTime}:00` ?? "",
        },
        classUserRequests: userId.map((id) => {
          return { userId: id };
        }),
        fsu: fsu ?? "",
      };
    });
  };

  const handleTrainingProgramClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setEditClass((prevClass) => {
      return {
        ...prevClass,
        trainingProgramCode: event.currentTarget.value ?? 0,
      };
    });
    setShow(true);
    dispatch(
      programActions.fetchProgramById({
        id: event.currentTarget.value as number,
      })
    );
  };

  const getListDates = (dates: string[]) => {
    setEditClass((prevClass) => {
      return {
        ...prevClass,
        createSessionRequestModel: {
          ...prevClass.createSessionRequestModel,
          days: dates,
        },
      };
    });
  };

  // UseEffect
  useEffect(() => {
    dispatch(programActions.fetchList({}));
  }, []);

  useEffect(() => {
    if (!isSuccessful && classSlice) return;
    let action = "";
    console.log("actionClassID", actionClassID);
    if (actionClassID) {
      action = "Create";
    }
    if (inputID) {
      action = "Update";
    }
    if (isSuccessful) {
      if (actionClassID) {
        toast.success(`${action} class successfully`);
        navigation(`/class/${actionClassID}`);
      }
      if (inputID) {
        toast.success(`${action} class successfully`);
        navigation(`/class/${inputID}`);
      }
    } else {
      toast.error(`Failed to ${action} class`);
    }
    dispatch(classActions.resetStatusClass());
  }, [isSuccessful, actionClassID]);

  useEffect(() => {
    if (!currentClass) return;
    if (!inputID) return;

    setEditClass({
      className: currentClass.className ?? "",
      classCode: currentClass.classCode ?? "",
      fsu: currentClass.fsu ?? "",
      status: currentClass.status ?? 1,
      trainingProgramCode:
        currentClass.trainingProgramViewClass.trainingProgramCode ?? 0,
      createSessionRequestModel: {
        days:
          currentClass.sessions?.map((session) => {
            return formatFromISOString(session.day ?? "", FormatType.DATE);
          }) ?? [],
        startTime: currentClass.sessions?.map((session) => {
          return `${formatFromISOString(
            session.startTime ?? "",
            FormatType.TIME
          )}`;
        })[0],
        endTime: currentClass.sessions?.map((session) => {
          return `${formatFromISOString(
            session.endTime ?? "",
            FormatType.TIME
          )}`;
        })[0],
      },
      classUserRequests:
        currentClass.userManageClasses?.map((user) => {
          return { userId: user.userID ?? undefined };
        }) ?? [],
      location: currentClass.location ?? "",
    });

    dispatch(
      programActions.fetchProgramById({
        id: currentClass.trainingProgramViewClass.trainingProgramCode ?? 0,
      })
    );
    setShow(true);
  }, [currentClass]);

  // Handle
  const handleGo = () => {
    handleClose();
    if (!checked) {
      setShow(true);
    }
    setShow(true);
  };

  const SaveAsDraft = async () => {
    const newEditClass: ListParamsClassCreate = {
      ...editClass,
      className: name,
      classCode: convertToCode(name),
      location: "Ho Chi Minh City",
      status: 2,
    };
    await dispatch(classActions.createClass(newEditClass));
  };
  const Save = async () => {
    // console.log("Save as draft");
    const newEditClass: ListParamsClassCreate = {
      ...editClass,
      classCode: convertToCode(name),
      className: name,
      location: "Ho Chi Minh City",
      status: 2,
    };
    await dispatch(classActions.createClass(newEditClass));
  };

  const handleUpdate = () => {
    // console.log("Update class");
    if (inputID) {
      dispatch(
        classActions.updateClass({ params: editClass, classId: inputID })
      );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      minHeight="120vh"
    >
      {/* detail */}
      <Box
        width="100%"
        padding="20px 30px 20px 30px"
        bgcolor={colorConfig.mainColor}
        color="#fff"
        border="solid #fff"
        display="flex"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box>
            <TypographyUI
              variant="subtitle1"
              title="Class"
              letterSpacing="0.3rem"
              fontWeight="Inter"
            />
            <TypographyUI
              variant="h3"
              title={`${name || currentClass?.className}`}
              letterSpacing="0.3rem"
            />
            <TypographyUI variant="subtitle1" title="HCM22_FE_DevOps_01" />
            <Divider
              variant="fullWidth"
              sx={{ border: "1px solid #fff", marginTop: 1, marginBottom: 1 }}
            />
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ border: "0.2px solid #fff" }}
                />
              }
            >
              <RenderDay days={currentClass?.duration} />
              {/*Show list icon*/}
              <Show>
                <Show.When isTrue={!!(show || inputID)}>
                  <Stack direction="row">
                    <IconButton>
                      <BookOutlined sx={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton>
                      <RecordVoiceOverOutlined sx={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton>
                      <SpellcheckOutlined sx={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton>
                      <SettingsInputAntenna sx={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton>
                      <PanToolOutlined sx={{ color: "#fff" }} />
                    </IconButton>
                  </Stack>
                </Show.When>
              </Show>
            </Stack>
          </Box>
          {ChipSelect(currentClass?.status ?? 2)}
          {/* <Chip
            label="Planning"
            sx={{ color: "#fff", bgcolor: "#B9B9B9", border: "1px solid #fff" }}
          /> */}
        </Stack>
        <IconButton>
          <MoreHoriz fontSize="large" sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
      {/* Content */}
      <Grid container padding={3} spacing={2}>
        {/*Attendee and General */}
        <Grid item xs={3.5}>
          <AccordionUI
            bgcolor={colorConfig.mainColor}
            color="#fff"
            show={!show && !inputID}
            icon={<CalendarTodayOutlined />}
            detail="General"
            subDetail=""
            children={
              <RenderGeneral
                data={currentClass}
                sendData={getDataGeneral}
                type="Create"
                inputID={inputID}
                updateData={editClass}
              />
            }
          />
        </Grid>
        {/*Calendar */}
        <Grid item xs={8.5}>
          <AccordionUI
            bgcolor={colorConfig.mainColor}
            color="#fff"
            show={!show && !inputID}
            icon={<CalendarTodayOutlined />}
            detail="Time frame"
            subDetail=""
            children={
              <RenderTimeFrame
                setDates={getListDates}
                updateSession={
                  editClass.createSessionRequestModel as SessionRequestModel
                }
              />
            }
          />
        </Grid>
        {/*Tab Class */}
        <Grid item xs={12}>
          <TabUI
            tabs={tabs}
            data={[
              {
                id: 0,
                children: (
                  <TrainingProgram
                    inputId={inputID}
                    // name={programName[0]}
                    programList={programList}
                    program={selectProgram}
                    handleTrainingProgramClick={handleTrainingProgramClick}
                  />
                ),
              },
              { id: 1, children: <AttendeeList /> },
              { id: 2, children: <Budget /> },
              { id: 3, children: <Others /> },
            ]}
          />
        </Grid>
      </Grid>
      {/*Button list*/}
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-end"
        padding={3}
        position="absolute"
        bottom={0}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="text"
            sx={{ color: "red", textDecoration: "underline" }}
          >
            Cancel
          </Button>
          <Show>
            <Show.When isTrue={!inputID}>
              <Button
                sx={{
                  bgcolor: "#474747",
                  color: "#fff",
                  borderRadius: 3,
                  paddingLeft: 2,
                  paddingRight: 2,
                  "&:hover": {
                    bgcolor: "#474747",
                    color: "#fff",
                  },
                }}
                onClick={SaveAsDraft}
              >
                Save as draft
              </Button>
              <Show.When isTrue={show}>
                <Button
                  sx={{
                    bgcolor: "#474747",
                    color: "#fff",
                    borderRadius: 3,
                    paddingLeft: 2,
                    paddingRight: 2,
                    "&:hover": {
                      bgcolor: "#474747",
                      color: "#fff",
                    },
                  }}
                  onClick={() => Save()}
                >
                  Save
                </Button>
              </Show.When>
              {/* <Show.When isTrue={editClass.trainingProgramCode === 0}>
                <ButtonUI title="Next" onClick={handleNext} />
              </Show.When> */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Stack
                    marginTop={3}
                    marginBottom={3}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Error sx={{ color: "green" }} />
                    <Typography id="modal-modal-title" variant="subtitle2">
                      Please take short helps for creating a class.
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                          sx={{
                            "&:hover": {
                              background: "#fff",
                            },
                          }}
                        />
                      }
                      label="Don't show again"
                    />
                    <Button
                      sx={{
                        bgcolor: "#2D3748",
                        borderRadius: "10px",
                        color: "#fff",
                        "&:hover": {
                          bgcolor: "#2D3748",
                        },
                      }}
                      onClick={handleGo}
                    >
                      Go
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Show.When>
          </Show>
          <Show.When isTrue={!!inputID}>
            <ButtonUI title="Update" onClick={handleUpdate} />
          </Show.When>
        </Stack>
      </Box>
    </Box>
  );
};

export default ClassAdd;
