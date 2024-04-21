import { Autocomplete, Box, Divider, Stack, TextField } from "@mui/material";
import { Class, ListParamsClassCreate, User } from "../../../../models";
import {
  AccessAlarm,
  HomeWork,
  RecordVoiceOver,
  StarBorder,
  StarOutline,
} from "@mui/icons-material";
import TypographyUI from "../../../../components/ui/typography/TypographyUI";
import { FormatType, formatFromISOString } from "../../../../utils/formatDate";
import Show from "../../../../utils/Show";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectListUser,
  userActions,
} from "../../../../features/user-management/user.slice";
import { colorConfig } from "../../../../configs/colorConfig";

type RenderGeneralProps = {
  type?: "Detail" | "Create";
  data?: Class | null;
  sendData?: (
    startTime: string,
    endTime: string,
    userId: string[],
    fsu: string
  ) => void;
  updateData?: ListParamsClassCreate | null;
  inputID?: string | null;
};

const FSUOptions = ["FSU1", "FSU2", "FSU3", "FSU4", "FSU5"];

const RenderGeneral = ({
  data,
  type,
  sendData,
  inputID,
  updateData,
}: RenderGeneralProps) => {
  const iconColor = type === "Create" ? "#A9A9A9" : "#285D9A";
  const textColor = type === "Create" ? "#A9A9A9" : "#000";

  // redux
  const dispatch = useAppDispatch();
  const userList = useAppSelector(selectListUser);
  // const updateData = useAppSelector(selectCurrentClass);

  // state
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [userID, setUserID] = useState<string[] | null>(null);
  const [FSU, setFSU] = useState<string | null>(null);

  // console.log("startTime", startTime);
  // console.log("endTime", endTime);
  // console.log("userID", userID);
  // console.log("FSU", FSU);

  // console.log("inputID", inputID);
  // console.log("updateData", updateData);

  // useEffect
  useEffect(() => {
    dispatch(userActions.checkGetAllUsers({ pageSize: 100, pageNumber: 1 }));
  }, []);

  // useEffect(() => {
  //   dispatch(classActions.checkClass(inputID ?? ""));
  // }, []);

  // fuction
  function generateTimeOptions() {
    let options = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        let hourStr = hour < 10 ? "0" + hour : "" + hour;
        let minuteStr = minute === 0 ? "00" : "" + minute;
        options.push(hourStr + ":" + minuteStr);
      }
    }
    return options;
  }

  let timeOptions = generateTimeOptions();

  const findMatchingUser = (
    list: User[] | null,
    updateData?: ListParamsClassCreate | null
  ) => {
    const matchingUsers: User[] = [];
    updateData?.classUserRequests?.forEach((request) => {
      const foundUser = list?.find((user) => user.userId === request.userId);
      if (foundUser) {
        matchingUsers.push(foundUser);
      }
    });
    return matchingUsers;
  };

  const formatTime = (time: Date) => {
    const timeFormat = formatFromISOString(time, FormatType.TIME).slice(0, 5);
    return timeFormat;
  };

  //do callback function
  const handleChangeValues = (
    newStartTime: string | null,
    newEndTime: string | null,
    newUserID: string[] | null,
    newFSU: string | null
  ) => {
    setStartTime(newStartTime);
    setEndTime(newEndTime);
    setUserID(newUserID);
    setFSU(newFSU);
    sendData?.(
      newStartTime ?? "",
      newEndTime ?? "",
      newUserID ?? [],
      newFSU ?? ""
    );
  };

  return (
    <Box padding={3} display="flex" flexDirection="column" gap={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <AccessAlarm sx={{ color: "#285D9A" }} />
          <TypographyUI title="Time" />
        </Stack>
        {type === "Detail" && (
          <Stack direction="row" spacing={0.5}>
            <div>from</div>
            <strong>
              {formatTime(data?.sessions?.[0]?.startTime ?? new Date())}
            </strong>
            <div>to</div>
            <strong>
              {formatTime(data?.sessions?.[0]?.endTime ?? new Date())}
            </strong>
          </Stack>
        )}
        {type === "Create" && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Autocomplete
              value={
                updateData?.createSessionRequestModel?.startTime?.slice(0, 5) ??
                ""
              }
              size="small"
              sx={{ width: "130px" }}
              options={timeOptions}
              onChange={(event, value: string | null) => {
                event.preventDefault;
                handleChangeValues(value, endTime, userID, FSU);
              }}
              renderInput={(params) => <TextField {...params} label="Select" />}
            />
            <div>:</div>
            <Autocomplete
              value={updateData?.createSessionRequestModel?.endTime?.slice(
                0,
                5
              )}
              disablePortal
              size="small"
              sx={{ width: "130px" }}
              options={timeOptions}
              onChange={(event, value: string | null) => {
                event.preventDefault,
                  handleChangeValues(startTime, value, userID, FSU);
              }}
              renderInput={(params) => <TextField {...params} label="Select" />}
            />
          </Stack>
        )}
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <HomeWork sx={{ color: iconColor }} />
          <TypographyUI title="Location" sx={{ color: textColor }} />
        </Stack>
        {type === "Detail" && <TypographyUI title={`${data?.location}`} />}
        {inputID && <TypographyUI title={`${updateData?.location}`} />}
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <RecordVoiceOver sx={{ color: iconColor }} />
          <TypographyUI title="Trainer" sx={{ color: textColor }} />
        </Stack>
        {type === "Detail" &&
          data?.userManageClasses?.map((trainer) => (
            <Show>
              <Show.When isTrue={trainer.userType === "trainer"}>
                <Stack spacing={1}>
                  <TypographyUI title={`${trainer && trainer.userName}`} />
                </Stack>
              </Show.When>
            </Show>
          ))}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <StarBorder sx={{ color: "#285D9A" }} />
          <TypographyUI title="Admin" />
        </Stack>
        <Stack spacing={1} direction="column" textAlign="right">
          {type === "Detail" &&
            data?.userManageClasses?.map((admin) => (
              <Show>
                <Show.When isTrue={admin.userType === "admin"}>
                  {/* <TypographyUI title={``}  /> */}
                  <span>
                    <a
                      style={{
                        color: colorConfig.blue,
                        textDecoration: "underline",
                      }}
                    >
                      {admin.userName}
                    </a>
                  </span>
                </Show.When>
              </Show>
            ))}
        </Stack>
        {type === "Create" && (
          <Autocomplete
            value={findMatchingUser(userList, updateData)}
            sx={{ width: "280px" }}
            options={userList ?? []}
            multiple
            getOptionLabel={(user) => `${user?.name}`}
            isOptionEqualToValue={(option, value) => {
              return value !== undefined && option?.name === value?.name;
            }}
            ListboxProps={{ style: { maxHeight: 200, overflow: "auto" } }}
            onChange={(event, value) => {
              event.preventDefault();
              const userIdArray = value?.map(
                (user) => user?.userId
              ) as string[];
              handleChangeValues(startTime, endTime, userIdArray, FSU);
            }}
            noOptionsText="No user found"
            renderOption={(props, option) => {
              return (
                <>
                  {option && option.role === 2 && (
                    <Box component="li" {...props} key={option?.userId}>
                      {option?.name}
                    </Box>
                  )}
                </>
              );
            }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Select Admin" />
            )}
          />
        )}
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <StarOutline
            sx={{
              border: "2px solid #285D9A",
              borderRadius: "50%",
              color: "#285D9A",
            }}
          />
          <TypographyUI title="FSU" />
        </Stack>
        {type === "Detail" && <TypographyUI title={`${data?.fsu}`} />}
        {type === "Create" && (
          <Autocomplete
            value={updateData?.fsu ?? ""}
            disablePortal
            size="small"
            options={FSUOptions}
            onChange={(event, value: string | null) => {
              event.preventDefault,
                handleChangeValues(startTime, endTime, userID, value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select FSU" />
            )}
            sx={{ width: "280px" }}
          />
        )}
      </Stack>
      <Divider variant="fullWidth" sx={{ marginTop: 2, marginBottom: 2 }} />
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TypographyUI title="Created" />
          {type === "Detail" && (
            <TypographyUI title={`${data?.createdByName}`} />
          )}
          {inputID && <TypographyUI title={`${data?.createdByName}`} />}
        </Stack>
        <Stack direction="row">
          <TypographyUI title="Review" />
        </Stack>
        <Stack direction="row">
          <TypographyUI title="Approve" />
        </Stack>
      </Stack>
    </Box>
  );
};

export default RenderGeneral;
