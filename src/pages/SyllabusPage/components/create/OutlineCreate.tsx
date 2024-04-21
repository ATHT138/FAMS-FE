import {
  AddCircleOutlineSharp,
  BookOutlined,
  ControlPoint,
  Create,
  CreateOutlined,
  DeleteForeverOutlined,
  ExpandMore,
  FactCheckOutlined,
  HighlightOff,
  RecordVoiceOverOutlined,
  RemoveCircleOutline,
  ReportProblemOutlined,
  SettingsInputAntenna,
  SnippetFolder,
  Spellcheck,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Content, Day, Unit } from "../../../../models";
import { colorConfig } from "../../../../configs/colorConfig";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import Show from "../../../../utils/Show";
import ButtonUI from "../../../../components/ui/button/ButtonUI";

const options = [
  { label: "H2SD", id: 1 },
  { label: "H4SD", id: 2 },
  { label: "H6SD", id: 3 },
  { label: "K3SD", id: 4 },
  { label: "K5SD", id: 5 },
  { label: "KT4D", id: 8 },
  { label: "K6SD", id: 6 },
  { label: "H1ST", id: 7 },
];

interface DeliveryType {
  value: string;
  label: string;
  icon: JSX.Element;
}

const deliveryTypes: DeliveryType[] = [
  { value: "Assignment/Lab", label: "Assignment/Lab", icon: <BookOutlined /> },
  {
    value: "Concept/Lecture",
    label: "Concept/Lecture",
    icon: <RecordVoiceOverOutlined />,
  },
  { value: "Test/Quiz", label: "Test/Quiz", icon: <FactCheckOutlined /> },
  { value: "Exam", label: "Exam", icon: <Spellcheck /> },
  {
    value: "Seminar/Workshop",
    label: "Seminar/Workshop",
    icon: <SettingsInputAntenna />,
  },
];

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

interface Props {
  Days?: Day[] | [];
  handleOutlineInputChange: (days: Day[]) => void;
}

const OutlineCreate = ({ handleOutlineInputChange, Days }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openMaterial, setOpenMaterial] = useState<boolean>(false);
  const [days, setDays] = useState<Day[]>([]);

  const [deliveryType, setDeliveryType] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const createDay = () => {
    const newDay: Day = {
      countDay: days.length + 1,
      units: [],
    };
    setDays([...days, newDay]);
  };
  const addUnitToDay = (dayId: number) => {
    const updatedDays = days.map((day) => {
      if (day.countDay === dayId) {
        const newUnit: Unit = {
          countUnit: day.units.length + 1,
          name: "",
          contents: [],
        };
        return { ...day, units: [...day.units, newUnit] };
      }
      return day;
    });
    setDays(updatedDays);
  };
  const handleChangeUnitName = (
    changedName: string,
    dayId: number,
    unitId: number
  ) => {
    days[--dayId].units[--unitId].name = changedName;
    const updatedDays = days.filter((day) => day !== null);
    setDays(updatedDays);
  };
  const handleChangeContentName = (
    changedName: string,
    dayId: number,
    unitId: number,
    contentId: number
  ) => {
    days[--dayId].units[--unitId].contents[--contentId].name = changedName;
    const updatedDays = days.filter((day) => day !== null);
    setDays(updatedDays);
  };
  const handleChangeOutputStandard = (
    outputStandard: string,
    dayId: number,
    unitId: number,
    contentId: number
  ) => {
    days[--dayId].units[--unitId].contents[--contentId].trainingFormat =
      outputStandard;
    const updatedDays = days.filter((day) => day !== null);
    setDays(updatedDays);
  };
  const convertStringToNumberAndCheck = (
    prevValue: number,
    valueIsString: string
  ): number => {
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
  const handleChangeDuration = (
    duration: string,
    dayId: number,
    unitId: number,
    contentId: number
  ) => {
    const indexDayId = --dayId;
    const indexUnitId = --unitId;
    const indexContentId = --contentId;
    const durationValue = convertStringToNumberAndCheck(
      days[indexDayId].units[indexUnitId].contents[indexContentId].time ?? 0,
      duration
    );
    if (durationValue === -1) return;

    days[indexDayId].units[indexUnitId].contents[indexContentId].time =
      durationValue;
    const updatedDays = days.filter((day) => day !== null);
    setDays(updatedDays);
  };

  const handleChangeNote = (
    note: boolean,
    dayId: number,
    unitId: number,
    contentId: number
  ) => {
    const indexDayId = --dayId;
    const indexUnitId = --unitId;
    const indexContentId = --contentId;
    let noteValue = ""; // Change 'const' to 'let'
    if (note) {
      noteValue = "Online";
    } else {
      noteValue = "Offline";
    }
    days[indexDayId].units[indexUnitId].contents[indexContentId].note =
      noteValue;
    const updatedDays = days.filter((day) => day !== null);
    setDays(updatedDays);
  };

  const handleChangeDeliveryType = (
    deliveryType: string,
    dayId: number,
    unitId: number,
    contentId: number
  ) => {
    // setDeliveryType(event.target.value as string);
    const indexDayId = --dayId;
    const indexUnitId = --unitId;
    const indexContentId = --contentId;
    days[indexDayId].units[indexUnitId].contents[indexContentId].deliveryType =
      deliveryType;
    const updatedDays = days.filter((day) => day !== null);
    setDays(updatedDays);
  };

  const addContentToUnit = (dayId: number, unitId: number) => {
    const updatedDays = days.map((day) => {
      if (day.countDay === dayId) {
        const updatedUnits = day.units.map((unit) => {
          if (unit.countUnit === unitId) {
            const newContent: Content = {
              countContent: unit.contents.length + 1,
              name: "",
              materials: [],
              status: false, // Add the missing 'status' property
            };
            return {
              ...unit,
              contents: [...unit.contents, newContent],
              createContent: true,
            };
          }
          return unit;
        });
        return { ...day, units: updatedUnits };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const deleteDay = (dayId: number) => {
    setDays((prevdays) =>
      prevdays
        .filter((day) => day.countDay !== dayId)
        .map((day) => ({
          ...day,
          countDay: day.countDay > dayId ? day.countDay - 1 : day.countDay,
        }))
    );
    handleClose();
  };

  useEffect(() => {
    console.log("days", days);
    handleOutlineInputChange(days);
  }, [days]);

  useEffect(() => {
    setDays(Days ?? []);
  }, []);

  return (
    <>
      {/* create accordion list */}
      {days.map((day, index) => (
        <Accordion key={index}>
          <AccordionSummary
            sx={{
              backgroundColor: colorConfig.mainColor,
              color: "#fff",
              border: "1px solid #fff",
            }}
            expandIcon={<ExpandMore sx={{ color: "#fff" }} />}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <TypographyUI variant="h5" title={`Day ${day.countDay}`} />
              <IconButton aria-label="clear" onClick={handleOpen}>
                <RemoveCircleOutline sx={{ color: "red" }} />
              </IconButton>
              {/* handle modal delete*/}
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
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Delete Day
                    </Typography>
                  </Stack>
                  <Divider variant="fullWidth" />
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Delete all content of the Day?
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
                      sx={{
                        borderRadius: 3,
                        color: "#fff",
                        bgcolor: "#474747",
                      }}
                      onClick={() => deleteDay(day.countDay)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            {/* create units list */}
            {day.units.map((unit, index) => (
              <div key={index}>
                <Grid container marginBottom={2} marginTop={1}>
                  <Grid item xs={2}>
                    <TypographyUI
                      variant="h5"
                      title={`Unit ${unit.countUnit}`}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Show>
                      <Show.When isTrue={!(unit.createContent && unit.name)}>
                        <TypographyUI
                          title="Unit name"
                          fontWeight="Inter"
                          variant="caption"
                        />
                        <Stack direction="row" spacing={2}>
                          <input
                            value={unit.name}
                            placeholder="Type Unit Name"
                            style={{
                              width: "17.5rem",
                              borderRadius: "10px",
                              padding: 4,
                              fontStyle: "italic",
                            }}
                            onChange={(e) =>
                              handleChangeUnitName(
                                e.target.value,
                                day.countDay,
                                unit.countUnit
                              )
                            }
                          />
                          <ButtonUI
                            title="Create"
                            bgcolor="#2D3748"
                            color="#fff"
                            onClick={() => {
                              if (unit.name?.length != 0) {
                                addContentToUnit(day.countDay, unit.countUnit);
                              }
                            }}
                          />
                        </Stack>
                      </Show.When>
                      {/*Create contents list*/}
                      <Show.Else>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMore
                                sx={{
                                  color: "#285D9A",
                                  border: "1px solid #285D9A",
                                  borderRadius: "45%",
                                }}
                              />
                            }
                          >
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Stack>
                                <TypographyUI title={unit.name} variant="h5" />
                                <TypographyUI
                                  title={`${unit.contents.reduce(
                                    (sum, content) => sum + (content.time ?? 0),
                                    0
                                  )} hours`}
                                  variant="caption"
                                  fontWeight="normal"
                                />
                              </Stack>
                              <Button
                                sx={{
                                  width: 30,
                                  height: 30,
                                  backgroundColor: colorConfig.mainColor,
                                  borderRadius: "20px",
                                  "&:hover ": {
                                    bgcolor: colorConfig.hoverColor,
                                  },
                                }}
                              >
                                <Create
                                  fontSize="medium"
                                  sx={{ color: "#fff" }}
                                />
                              </Button>
                            </Stack>
                          </AccordionSummary>
                          <AccordionDetails>
                            {/*Edit contents*/}
                            {unit.contents.map((content) => (
                              <Grid
                                key={content.id}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                  width: "100%",
                                  padding: 1,
                                  bgcolor: "#F1F1F1",
                                  border: "1px solid #fff",
                                  borderRadius: "10px",
                                }}
                              >
                                <Grid item xs={3}>
                                  <TextField
                                    fullWidth
                                    value={content.name}
                                    placeholder="Content name"
                                    onChange={(e) =>
                                      handleChangeContentName(
                                        e.target.value,
                                        day.countDay,
                                        unit.countUnit,
                                        content.countContent
                                      )
                                    }
                                    sx={{
                                      border: "1px solid gray",
                                      borderRadius: "10px",
                                      bgcolor: "#fff",
                                      color: "#000",
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={8.5}>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                  >
                                    <Autocomplete
                                      options={options}
                                      sx={{
                                        width: "31%",
                                      }}
                                      onChange={(event, value) => {
                                        event.preventDefault();
                                        handleChangeOutputStandard(
                                          value?.label ?? "",
                                          day.countDay,
                                          unit.countUnit,
                                          content.countContent
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          value={content.outputStandard}
                                          sx={{
                                            width: "100%",
                                          }}
                                          label="Output standard"
                                        />
                                      )}
                                    />
                                    <TextField
                                      sx={{ width: "15%" }}
                                      placeholder="Time"
                                      value={content.time}
                                      onChange={(e) =>
                                        handleChangeDuration(
                                          e.target.value,
                                          day.countDay,
                                          unit.countUnit,
                                          content.countContent
                                        )
                                      }
                                    />
                                    <FormControlLabel
                                      label={
                                        content.status ? (
                                          <div>Online</div>
                                        ) : (
                                          <div>Offline</div>
                                        )
                                      }
                                      control={
                                        <Switch
                                          defaultChecked
                                          onChange={(e) =>
                                            handleChangeNote(
                                              e.target.checked,
                                              day.countDay,
                                              unit.countUnit,
                                              content.countContent
                                            )
                                          }
                                          value={content.status}
                                        />
                                      }
                                    />
                                    <FormControl
                                      sx={{
                                        width: "300px",
                                      }}
                                    >
                                      <InputLabel>Delivery Type</InputLabel>
                                      <Select
                                        label="Delivery Type"
                                        value={deliveryType}
                                        onChange={(event, value) => {
                                          if (
                                            value &&
                                            React.isValidElement(value)
                                          ) {
                                            setDeliveryType(
                                              event.target.value as string
                                            );
                                            handleChangeDeliveryType(
                                              value.props?.value,
                                              day.countDay,
                                              unit.countUnit,
                                              content.countContent
                                            );
                                          }
                                        }}
                                      >
                                        {deliveryTypes.map((type) => (
                                          <MenuItem
                                            key={type.value}
                                            value={type.value}
                                            sx={{ display: "flex", gap: 2 }}
                                          >
                                            {type.icon}
                                            <div>{type.label}</div>
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                    <IconButton
                                      onClick={() => setOpenMaterial(true)}
                                    >
                                      <SnippetFolder
                                        sx={{
                                          width: 30,
                                          height: 30,
                                          color: "#285D9A",
                                        }}
                                      />
                                    </IconButton>
                                    <Modal
                                      open={openMaterial}
                                      onClose={() => setOpenMaterial(false)}
                                      aria-labelledby="modal-modal-title"
                                      aria-describedby="modal-modal-description"
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: "40%",
                                          border: "1px solid",
                                          borderRadius: 5,
                                          overflow: "hidden",
                                          display: "flex",
                                          flexDirection: "column",
                                          boxShadow: 10,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            paddingLeft: 3,
                                            paddingRight: 3,
                                            paddingTop: 1,
                                            paddingBottom: 1,
                                            bgcolor: "#2D3748",
                                            color: "#fff",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                          }}
                                        >
                                          <TypographyUI
                                            title={`Day ${day.id}`}
                                            variant="h6"
                                          />
                                          <IconButton
                                            onClick={() =>
                                              setOpenMaterial(false)
                                            }
                                          >
                                            <HighlightOff
                                              sx={{ color: "#fff" }}
                                            />
                                          </IconButton>
                                        </Box>
                                        <Box
                                          sx={{
                                            padding: 3,
                                            bgcolor: "#fff",
                                          }}
                                        >
                                          <Stack
                                            direction="row"
                                            spacing={6}
                                            margin={1}
                                          >
                                            <TypographyUI
                                              title={`Unit ${unit.id}`}
                                            />
                                            <TypographyUI title={unit.name} />
                                          </Stack>
                                          <Box
                                            sx={{
                                              padding: 3,
                                              bgcolor: "#F1F1F1",
                                              borderRadius: "10px",
                                              marginBottom: 1,
                                            }}
                                          >
                                            <TypographyUI title=".Net introduction" />
                                            {Array.from(
                                              { length: 5 },
                                              (_, index) => (
                                                <Stack
                                                  key={index}
                                                  width="100%"
                                                  direction="row"
                                                  justifyContent="space-between"
                                                  alignItems="center"
                                                >
                                                  <div
                                                    style={{
                                                      color: "blue",
                                                      textDecorationLine:
                                                        "underline",
                                                    }}
                                                  >
                                                    file
                                                  </div>
                                                  <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    spacing={2}
                                                  >
                                                    <div>
                                                      by Joseph on 12/03/2012
                                                    </div>
                                                    <IconButton>
                                                      <CreateOutlined />
                                                    </IconButton>
                                                    <IconButton>
                                                      <DeleteForeverOutlined />
                                                    </IconButton>
                                                  </Stack>
                                                </Stack>
                                              )
                                            )}
                                          </Box>
                                          <Box
                                            sx={{
                                              width: "100%",
                                              padding: 2,
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <ButtonUI
                                              title="Upload new"
                                              bgcolor="#2D3748"
                                              color="#fff"
                                            />
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Modal>
                                  </Stack>
                                </Grid>
                              </Grid>
                            ))}
                            <IconButton
                              onClick={() =>
                                addContentToUnit(day.countDay, unit.countUnit)
                              }
                            >
                              <AddCircleOutlineSharp
                                sx={{
                                  color: "#fff",
                                  backgroundColor: colorConfig.mainColor,
                                  border: "1px solid #285D9A",
                                  borderRadius: "45%",
                                }}
                              />
                            </IconButton>
                          </AccordionDetails>
                        </Accordion>
                      </Show.Else>
                    </Show>
                  </Grid>
                </Grid>
                <Divider variant="fullWidth" sx={{ marginBottom: 2 }} />
              </div>
            ))}
            <ButtonUI
              onClick={() => addUnitToDay(day.countDay)}
              title="Add unit"
              icon={<ControlPoint />}
              bgcolor="#2D3748"
              color="#fff"
            />
          </AccordionDetails>
        </Accordion>
      ))}

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <ButtonUI
          onClick={createDay}
          title="Add day"
          icon={<ControlPoint />}
          bgcolor="#2D3748"
          color="#fff"
        />
      </div>
    </>
  );
};

export default OutlineCreate;
