import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import { DatePicker } from "@mui/x-date-pickers";
import ButtonUI from "../../../components/ui/button/ButtonUI";
import { colorConfig } from "../../../configs/colorConfig";
import { useState } from "react";
import { ListParamsCalendars } from "../../../models";
import dayjs from "dayjs";
import { FormatType, formatFromISOString } from "../../../utils/formatDate";
import { useAppSelector } from "../../../store/hooks";
import { selectCalendarList } from "../../../features/calendar/calendar.slice";

const options = ["Ho Chi Minh", "Ha Noi", "Da Nang", "Can Tho", "Vung Tau"];

interface FilterCalendarProps {
  onInputChanged: (params: ListParamsCalendars) => void;
}

const FilterCalendar = ({ onInputChanged }: FilterCalendarProps) => {
  const [location, setLocation] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [classTime, setClassTime] = useState<string[]>([]);
  const [status, setStatus] = useState<number[]>([]);
  const [fsu, setFsu] = useState<string>("");
  const [trainer, setTrainer] = useState<string>("");
  const calendarList = useAppSelector(selectCalendarList);

  const handleLocationChange = (event: SelectChangeEvent<typeof location>) => {
    const {
      target: { value },
    } = event;
    setLocation(typeof value === "string" ? value.split(",") : value);
  };

  const handleFsuChange = (event: SelectChangeEvent<typeof fsu>) => {
    const selectedFsu = event.target.value as string;
    setFsu(selectedFsu);
  };

  const handleTrainerChange = (event: SelectChangeEvent<typeof trainer>) => {
    const selectedTrainer = event.target.value as string;
    setTrainer(selectedTrainer);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    if (checked) {
      setClassTime((prevState) => [...prevState, name]);
    } else {
      setClassTime((prevState) => prevState.filter((item) => item !== name));
    }
  };

  const handleCheckboxStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, name } = event.target;
    const newValue = parseInt(name); // Parse string to number
    if (checked) {
      setStatus((prevState) => [...prevState, newValue]);
    } else {
      setStatus((prevState) => prevState.filter((item) => item !== newValue));
    }
  };

  const handleSubmit = () => {
    const formattedStartDate = startDate
      ? formatFromISOString(startDate, FormatType.DATE)
      : "";
    const formattedEndDate = endDate
      ? formatFromISOString(endDate, FormatType.DATE)
      : "";

    onInputChanged({
      locations: location,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      timeChocies: classTime,
      status: status,
      fsu: fsu,
      trainer: trainer,
    });
  };

  return (
    <Box margin={3} borderRadius={3} boxShadow={3} padding={2} bgcolor="#fff">
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={6.5}>
          <TypographyUI title="Class location" />
          <FormControl size="medium" sx={{ width: "100%" }}>
            <InputLabel>Select</InputLabel>
            <Select
              label="Select"
              multiple
              value={location}
              onChange={handleLocationChange}
              input={<OutlinedInput label="Name" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ bgcolor: colorConfig.grayDark, color: "#fff" }}
                    />
                  ))}
                </Box>
              )}
            >
              {options.map((option, index) => {
                return (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5} width={1000}>
          <TypographyUI title="Class time frame" />
          <Stack direction="row" spacing={2} alignItems="center">
            <div>from</div>
            <DatePicker
              value={startDate && dayjs(startDate)}
              onChange={(currentStartDate) =>
                setStartDate(currentStartDate && currentStartDate.toDate())
              }
            />
            <div>to</div>
            <DatePicker
              value={endDate && dayjs(endDate)}
              onChange={(currentEndDate) =>
                setEndDate(currentEndDate && currentEndDate.toDate())
              }
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid container marginTop={4} marginBottom={4}>
        <Grid item xs={3} display="flex" gap={1}>
          <Box padding={1}>
            <TypographyUI title="Class time" />
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckboxChange} name="Morning" />
              }
              label="Morning"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleCheckboxChange} name="Noon" />}
              label="Noon"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckboxChange} name="Night" />
              }
              label="Night"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckboxChange} name="Online" />
              }
              label="Online"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={3}>
          <Stack direction="row" spacing={2}>
            <Box padding={1}>
              <TypographyUI title="Status" />
            </Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox onChange={handleCheckboxStatusChange} name="1" />
                }
                label="Planning"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleCheckboxStatusChange} name="2" />
                }
                label="Openning"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={handleCheckboxStatusChange} name="3" />
                }
                label="Closed"
              />
            </FormGroup>
          </Stack>
        </Grid>
        <Grid item xs={6} display="flex" gap={5}>
          <div>
            <Stack width="100%" spacing={2} direction="row" alignItems="center">
              <TypographyUI title="FSU" />
              <FormControl size="small">
                <InputLabel>Select</InputLabel>
                <Select
                  label="Select"
                  sx={{ minWidth: 150 }}
                  onChange={handleFsuChange}
                >
                  {calendarList.map((calendar, index) => (
                    <MenuItem
                      key={index}
                      value={calendar.fsu || ""}
                      component="li"
                    >
                      {calendar.fsu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </div>
          <div>
            <Stack width="100%" spacing={2} direction="row" alignItems="center">
              <TypographyUI title="Trainer" />
              <FormControl size="small">
                <InputLabel>Select</InputLabel>
                <Select
                  label="Select"
                  input={<OutlinedInput label="Name" />}
                  sx={{ minWidth: 150 }}
                  onChange={handleTrainerChange}
                >
                  {calendarList.map((calendar) =>
                    calendar.trainers
                      ?.filter((trainer) => trainer !== undefined)
                      .map((trainer, index) => (
                        <MenuItem key={index} value={trainer}>
                          {trainer}
                        </MenuItem>
                      ))
                  )}
                </Select>
              </FormControl>
            </Stack>
          </div>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={3} justifyContent="flex-end">
        <ButtonUI title="Clear" bgcolor={colorConfig.grayDark} color="#fff" />

        <ButtonUI
          title="Apply"
          bgcolor={colorConfig.mainColor}
          color="#fff"
          onClick={handleSubmit}
        />
      </Stack>
    </Box>
  );
};

export default FilterCalendar;
