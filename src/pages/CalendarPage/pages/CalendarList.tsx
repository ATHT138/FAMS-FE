import { Box, Stack } from "@mui/material";
import { colorConfig } from "../../../configs/colorConfig";
import TypographyUI from "../../../components/ui/typography/TypographyUI";
import InputSearch from "../../../components/ui/input/InputSearch";
import PopperUI from "../../../components/ui/popper/PopperUI";
import { FilterList } from "@mui/icons-material";
import CalendarChoice from "../components/calendar/CalendarChoice";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  calendarActions,
  selectCalendarFilter,
  selectCalendarList,
} from "../../../features/calendar/calendar.slice";
import FilterCalendar from "../components/FilterCalendar";
import { ListParamsCalendars } from "../../../models";

const CalendarList = () => {
  const dispatch = useAppDispatch();
  // const [filter, setFilter] = useState<ListParamsCalendars>({});
  const filter = useAppSelector(selectCalendarFilter);
  const calendarList = useAppSelector(selectCalendarList);

  useEffect(() => {
    dispatch(calendarActions.getCalendarList({ ...filter }));
  }, [dispatch, filter]);

  const handleFilter = (params: ListParamsCalendars) => {
    dispatch(calendarActions.setFilter({ ...params }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilter({ ...filter, keyword: event.target.value });
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: colorConfig.mainColor,
          color: "#fff",
          padding: 3,
          border: "1px solid #fff",
        }}
      >
        <TypographyUI
          title="Training Calendar"
          letterSpacing="0.3rem"
          fontWeight="Inter"
          variant="h3"
        />
      </Box>
      <Stack width="100%" spacing={2} direction="row" padding={3}>
        <div>
          <InputSearch onChange={handleSearchChange} />
        </div>
        <Box>
          <PopperUI
            type="right-start"
            icon={<FilterList sx={{ color: "#fff" }} />}
            title="Filter"
            bgcolor={colorConfig.mainColor}
            color="#fff"
            children={<FilterCalendar onInputChanged={handleFilter} />}
          />
        </Box>
      </Stack>
      <CalendarChoice calendarList={calendarList} />
    </>
  );
};

export default CalendarList;
