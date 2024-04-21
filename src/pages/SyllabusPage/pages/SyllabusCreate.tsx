import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import SteppUI from "../../../components/ui/stepper/SteppUI";
import TabUI from "../../../components/ui/tab";
import TimeAllocate from "../components/TimeAllocate";
import { ReportProblemOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import { colorConfig } from "../../../configs/colorConfig";
import GeneralCreate from "../components/create/GeneralCreate";
import OutlineCreate from "../components/create/OutlineCreate";
import OtherCreate from "../components/create/OtherCreate";
import Show from "../../../utils/Show";
import { useOpenClose } from "../../../hooks/useOpenClose";
import { useStepper } from "../../../hooks/useStepper";
import { useEffect, useState } from "react";
import {
  Content,
  CreateSyllabus,
  Day,
  TrainingContents,
  TrainingDays,
  TrainingUnits,
  Unit,
  UpdateSyllabus,
} from "../../../models";
import {
  selectSyllabus,
  selectSyllabusId,
  selectSyllabusIsSuccess,
  selectSyllabusOther,
  selectSyllabusOutline,
  syllabusAcitons,
} from "../../../features/syllabus/syllabus.slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate, useParams } from "react-router-dom";

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

const steps = ["General", "Outline", "Other", "Done"];

const tab = [
  { checkNumber: 0, tabLabel: "General" },
  { checkNumber: 1, tabLabel: "Outline" },
  { checkNumber: 2, tabLabel: "Other" },
];

const datas = [
  { id: 1, value: 20, label: `Assignment/Lab`, color: "#F4BE37" },
  { id: 2, value: 20, label: "Concept/Lecture", color: "#FF9F40" },
  { id: 3, value: 20, label: "Guide/Revuew", color: "#0D2535" },
  { id: 4, value: 20, label: "Test/Quiz", color: "#5388D8" },
  { id: 5, value: 20, label: "Exam", color: "#206EE5" },
];

const SyllabusCreate = () => {
  const { syllabusId } = useParams();
  const { open, handleClose, handleOpen } = useOpenClose();
  const { activeStep, handleBack } = useStepper(steps);
  const isSuccess = useAppSelector(selectSyllabusIsSuccess);
  const syllabusIdSlice = useAppSelector(selectSyllabusId);
  const navigate = useNavigate();

  // check if syllabusId is not null, fetch syllabus data
  let syllabusGeneral = null;
  let syllabusOutline = null;
  let syllabusOther = null;
  if (syllabusId) {
    syllabusGeneral = useAppSelector(selectSyllabus);
    syllabusOutline = useAppSelector(selectSyllabusOutline);
    syllabusOther = useAppSelector(selectSyllabusOther);
  }

  const [trainingDays, setTrainingDays] = useState<Day[]>([]);
  const [createOtherRequestModel, setCreateOtherRequestModel] = useState<any>(
    []
  );
  const dispatch = useAppDispatch();
  const [syllabus, setSyllabus] = useState<CreateSyllabus>({
    syllabuseCode: null,
    topicName: null,
    technicalRequirement: "",
    trainingPrinciples: "",
    priority: "",
    publishStatus: null,
    level: 1,
    attendeeNumber: 0,
    objective: "",
    outlineRequestModel: [],
    createOtherRequestModel: {
      quizz: 0,
      assignment: 0,
      final: 0,
      finalTheory: 0,
      finalPractice: 0,
      gpa: 0,
      trainingPrinciples: "",
    },
  } as CreateSyllabus);

  console.log("syllabus", syllabus);
  useEffect(() => {
    if (syllabusId) {
      console.log("fetching syllabus");
      dispatch(syllabusAcitons.fetchSyllabusById(syllabusId));
    }
  }, []);

  useEffect(() => {
    if (!(isSuccess && syllabusIdSlice)) return;
    let action = "";
    if (syllabusId) {
      action = "Update";
    } else {
      action = "Create";
    }
    if (isSuccess) {
      toast.success(`${action} Syllabus Successfully !`);
      navigate(`/syllabus/${syllabusIdSlice}`);
    } else {
      toast.error(`${action} Syllabus Failed !`);
    }
    dispatch(syllabusAcitons.resetSyllabusAction());
  }, [isSuccess, syllabusIdSlice]);

  useEffect(() => {
    if (!syllabusId) return;
    setSyllabus((prevSyllabus) => ({
      ...prevSyllabus,
      syllabuseCode: syllabusGeneral?.syllabuseCode ?? "",
      topicName: syllabusGeneral?.topicName ?? "",
      technicalRequirement: syllabusGeneral?.technicalRequirement ?? "",
      trainingPrinciples: syllabusOther?.trainingPrinciples ?? "",
      priority: syllabusOther?.priority ?? "",
      publishStatus: syllabusOther?.publishStatus ?? 0,
      level: syllabusGeneral?.level ?? 0,
      attendeeNumber: syllabusGeneral?.attendeeNumber ?? 0,
      objective: syllabusGeneral?.objective ?? "",
      outlineRequestModel:
        syllabusOutline?.trainingDays?.map((day): TrainingDays => {
          return {
            dayNumber: day.dayNumber,
            trainingUnitRequestModels:
              day.trainingUnitRequestModels?.map((unit): TrainingUnits => {
                return {
                  unitName: unit.unitName ?? "",
                  trainingContents:
                    unit.trainingContents?.map((content): TrainingContents => {
                      return {
                        trainingContent1: content.trainingContent1 ?? "",
                        outputStandard: content.outputStandard ?? "",
                        trainingFormat: content.outputStandard ?? "",
                        deliveryType: content.deliveryType ?? "",
                        duration: content.duration ?? 0,
                        note: content.note ?? "",
                        materialViewModels: content.materialViewModels,
                      };
                    }) ?? [],
                };
              }) || [],
          };
        }) ?? [],
      createOtherRequestModel: {
        quizz: syllabusOther?.assertmentScheme?.quizz ?? 0,
        assignment: syllabusOther?.assertmentScheme?.assignment ?? 0,
        final: syllabusOther?.assertmentScheme?.final ?? 0,
        finalTheory: syllabusOther?.assertmentScheme?.finalTheory ?? 0,
        finalPractice: syllabusOther?.assertmentScheme?.finalPractice ?? 0,
        gpa: syllabusOther?.assertmentScheme?.gpa ?? 0,
        trainingPrinciples: syllabusOther?.trainingPrinciples ?? "",
      },
    }));

    // setDays
    const newTrainingDays: Day[] =
      syllabusOutline?.trainingDays?.map((day, index) => {
        return {
          countDay: ++index,
          // @ts-expect-error
          units:
            day.trainingUnits?.map((unit, index): Unit => {
              return {
                countUnit: ++index,
                name: unit.unitName ?? "",
                createContent: true,
                // @ts-expect-error
                contents:
                  unit.trainingContents?.map((content, index): Content => {
                    return {
                      countContent: ++index,
                      name: content.trainingContent1 ?? "",
                      outputStandard: content.outputStandard ?? "",
                      trainingFormat: content.outputStandard ?? "",
                      time: content.duration ?? 0,
                      status: true,
                      deliveryType: content.deliveryType ?? "",
                      upload: "",
                      materials: content.materialViewModels ?? [],
                    };
                  }) ?? [],
              };
            }) ?? [],
        };
      }) ?? [];
    setTrainingDays(newTrainingDays);
    handleOutlineInputChange(newTrainingDays);
    // setOther
    const newCreateOtherRequestModel: any = {
      quizz: syllabusOther?.assertmentScheme?.quizz ?? 0,
      assignment: syllabusOther?.assertmentScheme?.assignment ?? 0,
      final: syllabusOther?.assertmentScheme?.final ?? 0,
      finalTheory: syllabusOther?.assertmentScheme?.finalTheory ?? 0,
      finalPractice: syllabusOther?.assertmentScheme?.finalPractice ?? 0,
      gpa: syllabusOther?.assertmentScheme?.gpa ?? 0,
      trainingPrinciples: syllabusOther?.trainingPrinciples ?? "",
    };
    setCreateOtherRequestModel(newCreateOtherRequestModel);
    handleOtherInputChange(newCreateOtherRequestModel);
  }, [syllabusGeneral, syllabusOutline, syllabusOther]);

  const allData =
    syllabus.createOtherRequestModel?.quizz ??
    0 +
      (syllabus.createOtherRequestModel?.assignment ?? 0) +
      (syllabus.createOtherRequestModel?.final ?? 0) +
      (syllabus.createOtherRequestModel?.finalTheory ?? 0) +
      (syllabus.createOtherRequestModel?.finalPractice ?? 0) +
      (syllabus.createOtherRequestModel?.gpa ?? 0);

  const dataAllocate = [
    {
      id: 1,
      value:
        allData == 0
          ? 20
          : ((syllabus.createOtherRequestModel?.assignment ?? 0) / allData) *
            100,
      label: `Assignment/Lab`,
      color: "#F4BE37",
    },
    {
      id: 2,
      value:
        allData == 0
          ? 20
          : ((syllabus.createOtherRequestModel?.finalPractice ?? 0) / allData) *
            100,
      label: "Concept/Lecture",
      color: "#FF9F40",
    },
    {
      id: 3,
      value:
        allData == 0
          ? 20
          : (syllabus.createOtherRequestModel?.finalTheory ?? 0) / allData,
      label: "Guide/Review",
      color: "#0D2535",
    },
    {
      id: 4,
      value:
        allData == 0
          ? 20
          : ((syllabus.createOtherRequestModel?.quizz ?? 0) / allData) * 100,
      label: "Test/Quiz",
      color: "#5388D8",
    },
    {
      id: 5,
      value:
        allData == 0
          ? 20
          : ((syllabus.createOtherRequestModel?.finalPractice ?? 0) / allData) *
            100,
      label: "Exam",
      color: "#206EE5",
    },
  ];

  const handleGeneralInputChange = (
    level: number,
    attendeeNumber: number,
    objective: string,
    technicalRequirement: string
  ) => {
    setSyllabus((prevSyllabus) => ({
      ...prevSyllabus,
      level,
      attendeeNumber,
      objective,
      technicalRequirement,
    }));
  };
  const isValid = (): boolean => {
    // check if all general required fields are filled
    if (
      syllabus.syllabuseCode === null ||
      syllabus.topicName === null ||
      syllabus.level === null ||
      syllabus.attendeeNumber === null ||
      syllabus.objective === null ||
      syllabus.technicalRequirement === null
    ) {
      toast.error("Please fill in all required fields in General Section");
      return false;
    }
    if (syllabus.syllabuseCode === "" || syllabus.topicName === "") {
      toast.error("Required fields cannot be empty");
      return false;
    }
    // check if all other required fields are filled
    if (
      syllabus.createOtherRequestModel?.assignment === null ||
      syllabus.createOtherRequestModel?.final === null ||
      syllabus.createOtherRequestModel?.finalPractice === null ||
      syllabus.createOtherRequestModel?.finalTheory === null ||
      syllabus.createOtherRequestModel?.gpa === null ||
      syllabus.createOtherRequestModel?.quizz === null ||
      syllabus.createOtherRequestModel?.trainingPrinciples === null
    ) {
      toast.error("Please fill in all required fields in Other Sections");
      return false;
    }
    return true;
  };

  const handleSaveAsDraft = () => {
    if (!isValid()) return;
    syllabus.publishStatus = 2;
    syllabus.priority = "";
    dispatch(syllabusAcitons.createSyllabus(syllabus));
  };
  const handleSave = () => {
    if (!isValid()) return;
    syllabus.publishStatus = 1;
    syllabus.priority = "";
    dispatch(syllabusAcitons.createSyllabus(syllabus));
  };
  const handleUpdate = () => {
    if (!isValid()) return;
    const newSyllabus: UpdateSyllabus = {
      syllabuseId: syllabusId,
      syllabuseCode: syllabus.syllabuseCode,
      topicName: syllabus.topicName,
      technicalRequirement: syllabus.technicalRequirement,
      trainingPrinciples: syllabus.trainingPrinciples,
      priority: syllabus.priority,
      publishStatus: syllabus.publishStatus,
      level: syllabus.level,
      attendeeNumber: syllabus.attendeeNumber,
      objective: syllabus.objective,
      outlineRequestModel: syllabus.outlineRequestModel ?? [],
      createOtherRequestModel: syllabus.createOtherRequestModel,
    };
    dispatch(syllabusAcitons.updateSyllabus(newSyllabus));
  };
  const handleOutlineInputChange = (days: Day[]) => {
    setTrainingDays(days);
    //@ts-expect-error
    const trainingDays: TrainingDays[] = days.map((day) => ({
      dayNumber: day.countDay,
      trainingUnitRequestModels: day.units.map((unit) => ({
        unitName: unit.name,
        trainingContents: unit.contents.map((content) => ({
          trainingContent1: content.name ?? "",
          outputStandard: content.outputStandard,
          duration: content.time ?? 0,
          deliveryType: content.deliveryType ?? "", // this is for Trung Anh Iu Dau <3
          trainingFormat: content.trainingFormat ?? "",
          note: content.note ?? "",
          materialRequestModels:
            content.materials?.map((material) => ({
              name: material.name ?? "",
              link: material.link ?? "",
              status: material.status ?? false,
              materialId: material.materialId ?? null!,
              trainingContentId: material.trainingContentId,
              createDate: material.createDate,
              createBy: material.createBy,
            })) || [],
        })),
      })),
    }));
    setSyllabus((prevSyllabus) => ({
      ...prevSyllabus,
      outlineRequestModel: trainingDays,
    }));
  };

  const handleOtherInputChange = (other: any) => {
    setSyllabus((prevSyllabus) => ({
      ...prevSyllabus,
      createOtherRequestModel: other,
    }));
  };

  const handleLevelChange = (event: SelectChangeEvent) => {
    const newLevel = parseInt(event.target.value);
    setSyllabus((prevSyllabus) => ({
      ...prevSyllabus,
      level: newLevel,
    }));
  };

  const handleAttendeeNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAttendeeNumber = parseInt(event.target.value);
    setSyllabus((prevSyllabus) => ({
      ...prevSyllabus,
      attendeeNumber: newAttendeeNumber,
    }));
  };

  const handleObjectiveChange = (content: string) => {
    setSyllabus((prevSyllabus) => ({
      ...prevSyllabus,
      objective: content,
    }));
  };

  const handleTechnicalRequirementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTechnicalRequirement = event.target.value;
    setSyllabus((prevSyllabus) => ({
      ...prevSyllabus,
      technicalRequirement: newTechnicalRequirement,
    }));
  };

  const tabData = [
    {
      id: 0,
      children: (
        <Box borderRadius="10px" boxShadow={10}>
          <GeneralCreate
            onInputChanged={handleGeneralInputChange}
            level={syllabus.level ?? 1}
            attendeeNumber={syllabus.attendeeNumber ?? 0}
            technicalRequirement={syllabus.technicalRequirement ?? ""}
            courseObjectives={syllabus.objective ?? ""}
            handleObjectiveChange={(content: string) =>
              handleObjectiveChange(content)
            }
            handleAttendeeNumberChange={(
              event: React.ChangeEvent<HTMLInputElement>
            ) => handleAttendeeNumberChange(event)}
            handleTechnicalRequirementChange={(
              event: React.ChangeEvent<HTMLInputElement>
            ) => handleTechnicalRequirementChange(event)}
            handleLevelChange={(event: SelectChangeEvent) =>
              handleLevelChange(event)
            }
          />
        </Box>
      ),
    },
    {
      id: 1,
      children: (
        <OutlineCreate
          Days={trainingDays ?? []}
          handleOutlineInputChange={(days) => handleOutlineInputChange(days)}
        />
      ),
    },
    {
      id: 2,
      children: (
        <Box borderRadius="10px" boxShadow={10}>
          <OtherCreate
            otherData={createOtherRequestModel ?? null}
            handleOtherInputChange={(other: any) =>
              handleOtherInputChange(other)
            }
            datas={datas}
          />
        </Box>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <Stack
        width="100%"
        height="200px"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        paddingLeft="100px"
      >
        <TypographyUI
          title="Syllabus"
          variant="h3"
          fontWeight="bold"
          letterSpacing="0.3rem"
        />
        <Box width="50%">
          <SteppUI steps={steps} activeStep={activeStep} />
        </Box>
      </Stack>
      <Divider sx={{ borderBottom: "2px solid gray" }} />
      <Grid container spacing={3} marginTop={0}>
        <Grid item xs={8} borderRight="1px solid gray">
          <Box
            height="10vh"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <TypographyUI
                title="Syllabus Name*"
                fontWeight="bold"
                variant="body1"
              />
              <TextField
                value={syllabus.topicName ?? ""}
                onChange={(event) => {
                  setSyllabus((prevSyllabus) => ({
                    ...prevSyllabus,
                    topicName: event.target.value,
                  }));
                }}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <TypographyUI title="Code" fontWeight="bold" variant="body1" />
              <TextField
                value={syllabus.syllabuseCode ?? ""}
                onChange={(event) => {
                  setSyllabus((prevSyllabus) => ({
                    ...prevSyllabus,
                    syllabuseCode: event.target.value,
                  }));
                }}
                style={{ width: "10vh", padding: 4, borderRadius: "20px" }}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <TypographyUI
                title="Version*"
                fontWeight="bold"
                variant="body1"
              />
              <TypographyUI title="1.0" />
            </Stack>
          </Box>

          <TabUI tabs={tab} data={tabData} />
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Show>
            <Show.When isTrue={activeStep !== 3}>
              <Box
                width="350px"
                boxShadow={10}
                borderRadius={3}
                overflow="hidden"
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
                    id="modal-modal-title"
                    title="Time allocate"
                    variant="h6"
                  />
                </Box>
                <Box marginLeft={2} marginTop={2}>
                  <Show>
                    <Show.When isTrue={activeStep !== 1}>
                      <TimeAllocate datas={dataAllocate} />
                    </Show.When>
                  </Show>
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
                      <Stack
                        direction="row"
                        alignItems="center"
                        key={params.id}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            backgroundColor: params.color,
                            marginRight: 2,
                          }}
                        />
                        <TypographyUI
                          title={`${params.label} (${params.value}%)`}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Show.When>
          </Show>
        </Grid>
      </Grid>
      <Box
        width="100%"
        display="flex"
        padding={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <ButtonUI
          title="Previous"
          bgcolor={colorConfig.grayDark}
          color="#fff"
          onClick={handleBack}
        />
        <Stack spacing={2} width="20vw" direction="row" marginTop={5}>
          <Button
            variant="text"
            sx={{ color: "red", textDecoration: "underline" }}
          >
            Cancel
          </Button>
          {!syllabusId && (
            <ButtonUI
              title="Save as draft"
              onClick={handleOpen}
              bgcolor={colorConfig.grayDark}
              color="#fff"
            />
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack direction="row" spacing={2} alignItems="center">
                <ReportProblemOutlined
                  id="modal-modal-title"
                  sx={{ color: "red" }}
                />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
              </Stack>
              <Divider variant="middle" />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Learning hours of a day cannot exceed 8 hours. Save and modify
                later?
              </Typography>
              <Stack
                direction="row"
                marginTop={4}
                spacing={2}
                justifyContent="flex-end"
              >
                <Button
                  variant="text"
                  sx={{ color: "red", textDecoration: "underline" }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 3, color: "#fff", bgcolor: "#474747" }}
                  onClick={handleSaveAsDraft}
                >
                  Save as draft
                </Button>
              </Stack>
            </Box>
          </Modal>
          {!syllabusId && (
            <ButtonUI
              title="Create"
              onClick={handleSave}
              bgcolor="#2D3748"
              color="#fff"
            />
          )}
          {syllabusId && (
            <ButtonUI
              title="Update"
              onClick={handleUpdate}
              bgcolor="#2D3748"
              color="#fff"
            />
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default SyllabusCreate;
