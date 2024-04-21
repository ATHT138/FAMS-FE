import { ListParamsClass } from "./../models/common";
import axiosClient from "../api/axios";
import { Class, ListParamsClassCreate, ListResponse } from "../models";

export const getAllClass = async (
  params: ListParamsClass
): Promise<ListResponse<Class>> => {
  return await axiosClient.get("/api/v1/classs/searchAndFilterClass", {
    params,
  });
};

export const getClassById = async (classId: string): Promise<Class> => {
  return await axiosClient.get(`/api/v1/classs/GetDetail`, {
    params: { classId },
  });
};

export const createClass = async (
  data: ListParamsClassCreate
): Promise<any> => {
  return await axiosClient.post("/api/v1/classs/CreateClass", data);
};

export const updateClass = async (
  classId: string,
  params: ListParamsClassCreate
) => {
  return await axiosClient.put(
    `/api/v1/classs/UpdateInforClass/${classId}`,
    params
  );
};

export const deActiveClass = async (classId: string) => {
  return await axiosClient.put(`/api/v1/classs/deactivateClass/${classId}`);
};
