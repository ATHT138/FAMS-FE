import axiosClient from "../api/axios";
import {
  ListParamsCreateUser,
  ListParamsUpdateUser,
  ListParamsUser,
  ListResponse,
  ListResponseToken,
  User,
} from "../models";
import { UserPermissionModel } from "../models/userPermission.model";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RefreshTokenCredentials {
  accessToken: string;
  refreshToken: string;
}

export const login = (credentials: LoginCredentials) => {
  return axiosClient.post("/api/v1/users/login", credentials);
};

export const fetchProfile = (): Promise<User> => {
  return axiosClient.get("/api/v1/users/getuserbyid");
};

export const refreshTokenAPI = (
  credentials: RefreshTokenCredentials
): Promise<ListResponseToken> => {
  return axiosClient.post("/api/v1/users/RefreshToken", credentials);
};

export const getAllUsers = async (
  params: ListParamsUser
): Promise<ListResponse<User>> => {
  try {
    var urlParam = new URLSearchParams();
    params.pageNumber &&
      urlParam.append("PageNumber", params.pageNumber.toString());
    params.pageSize && urlParam.append("PageSize", params.pageSize.toString());
    params.searchTerms &&
      params.searchTerms.map((item) => {
        urlParam.append("searchTerms", item);
      });
    return await axiosClient.post("/api/v1/users/getAll", null, {
      params: urlParam,
    });
  } catch (error: any) {
    console.log(error);
    return null!;
  }
};

export const createUser = async (data: ListParamsCreateUser) => {
  return await axiosClient.post("/api/v1/users/createuser", data);
};
export const updateUser = async (data: ListParamsUpdateUser) => {
  return await axiosClient.put(`/api/v1/users/updateUser/${data.id}`, {
    name: data.name,
    phone: data.phone,
    dob: data.dob,
    gender: data.gender,
    role: data.role,
    status: data.status,
    password: data.password,
  });
};

export const deactivateUser = async (id: string) => {
  return await axiosClient.put(`/api/v1/users/De_ActivateUser/${id}`);
};
export const deleteUser = async (id: string) => {
  return await axiosClient.put(`/api/v1/users/Delete/${id}`);
};

export const userPermission = () => {
  return axiosClient.get("/api/v1/userpermissions");
};

export const updateUserPermission = (data: UserPermissionModel[]) => {
  return axiosClient.put("/api/v1/userpermissions", data);
};
