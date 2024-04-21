import axiosClient from "../api/axios";
import { ListParamsCalendars } from "../models";
import { Calendar } from "../models/calendar.model";

export const getAllCalendar = async (
  params: ListParamsCalendars
): Promise<Calendar[]> => {
  return await axiosClient.get("/api/v1/calendars", { params });
};
