import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Calendar, ListParamsCalendars } from "../../models";
import { RootState } from "../../store";

type CalendarStateProps = {
  loading?: boolean;
  calendarList: Calendar[];
  filter: ListParamsCalendars;
};

const initialState: CalendarStateProps = {
  loading: false,
  calendarList: [],
  filter: {},
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    getCalendarList: (state, action: PayloadAction<ListParamsCalendars>) => {
      action.payload;
      state.loading = true;
    },
    setCalendarList: (state, action: PayloadAction<Calendar[]>) => {
      state.calendarList = action.payload;
      state.loading = false;
    },
    setFilter: (state, action: PayloadAction<ListParamsCalendars>) => {
      state.filter = action.payload;
      state.loading = false;
    },
  },
});

export const calendarActions = calendarSlice.actions;

export const selectCalendarList = (state: RootState) =>
  state.calendar.calendarList;
export const selectCalendarFilter = (state: RootState) => state.calendar.filter;

export const calendarReducer = calendarSlice.reducer;
