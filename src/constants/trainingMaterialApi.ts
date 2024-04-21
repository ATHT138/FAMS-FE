import axiosClient from "../api/axios";
import { Material, MaterialParams } from "../models";

export const getByContentId = async (
    param: MaterialParams
): Promise<Material[]> =>
    await axiosClient.get(`/api/v1/trainingmaterials/trainingcontent/${param.trainingContentId}`, {
    });
export const create = async (
    param: MaterialParams
): Promise<Material> =>
    await axiosClient.post(`/api/v1/trainingmaterials`, param);