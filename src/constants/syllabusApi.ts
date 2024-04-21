import axiosClient from "../api/axios";
import {
  CreateSyllabus,
  ImportSyllabusModel,
  ListParams,
  ListResponse,
  Syllabus,
  SyllabusOutline,
  UpdateSyllabus,
} from "../models";

export const getListSyllabus = async (
  params: ListParams
): Promise<ListResponse<Syllabus>> => {
  return await axiosClient.post("/api/v1/syllabuses/GetAll", params);
};

export const getSyllabusGeneralById = async (
  SyllabusId: string
): Promise<Syllabus> => {
  return await axiosClient.get(
    `/api/v1/syllabuses/getsyllabusesGeneral/${SyllabusId}`
  );
};

export const getSyllabusOutlineById = async (
  SyllabusId: string
): Promise<SyllabusOutline> => {
  return await axiosClient.get(
    `/api/v1/syllabuses/getsyllabusesOutline/${SyllabusId}`
  );
};

export const getSyllabusOthersById = async (SyllabusId: string) => {
  return await axiosClient.get(
    `/api/v1/syllabuses/getsyllabusesOthers/${SyllabusId}`
  );
};

export const createSyllabus = async (params: CreateSyllabus) => {
  return await axiosClient.post("/api/v1/syllabuses/all", params);
};
export const updateSyllabus = async (params: UpdateSyllabus) => {
  return await axiosClient.put(
    `/api/v1/syllabuses/UpdateAllTabSyllabus/${params.syllabuseId}`,
    {
      syllabuseCode: params.syllabuseCode,
      topicName: params.topicName,
      technicalRequirement: params.technicalRequirement,
      trainingPrinciples: params.trainingPrinciples,
      priority: params.priority,
      publishStatus: params.publishStatus,
      level: params.level,
      attendeeNumber: params.attendeeNumber,
      objective: params.objective,
      outlineRequestModel: params.outlineRequestModel,
      createOtherRequestModel: params.createOtherRequestModel,
    }
  );
};

export const duplicateSyllabus = async (id: string): Promise<Syllabus> => {
  return await axiosClient.post(`/api/v1/syllabuses/duplicate/${id}`);
};
export const importSyllabus = async (params: ImportSyllabusModel) => {
  if (typeof params.file === "undefined") return;
  var formData = new FormData();
  formData.append("delimiter", params.delimiter);
  formData.append("byCode", params.byCode.toString());
  formData.append("byName", params.byName.toString());
  formData.append("duplicationHandle", params.duplicationHandle.toString());
  formData.append("file", params.file);
  axiosClient.post("/api/v1/syllabuses/import", formData);
};

export const deleteSyllabus = async (id: string): Promise<Syllabus> => {
  return await axiosClient.delete(`/api/v1/syllabuses`, { data: { id } });
};
