import axiosClient from "../api/axios";
import {
  GetProgramParam,
  ListGetProgramParams,
  ListParamTrainingProgram,
  ListParamsTrainingProgramStatus,
  ListResponse,
} from "../models";
import {
  CreateTrainingProgram,
  ImportTrainingProgramModel,
  TrainingProgram,
  UpdateTrainingProgram,
} from "../models/trainingProgram.model";
// get
export const getAll = async (
  Params: ListGetProgramParams
): Promise<ListResponse<TrainingProgram>> =>
  await axiosClient.get("/api/v1/trainingprograms", {
    params: Params,
  });
export const getById = async (
  param: GetProgramParam
): Promise<TrainingProgram> =>
  await axiosClient.get(`/api/v1/trainingprograms/${param.id}`, {});

export const searchSortTrainingProgram = async (
  searchParams: ListParamTrainingProgram
): Promise<ListResponse<TrainingProgram>> => {
  const params = new URLSearchParams();
  searchParams.page && params.append("page", searchParams.page.toString());
  searchParams.pageSize &&
    params.append("pageSize", searchParams.pageSize.toString());
  searchParams.idSortBy && params.append("idSortBy", searchParams.idSortBy);
  searchParams.programNameSortBy &&
    params.append("programNameSortBy", searchParams.programNameSortBy);
  searchParams.createdOnSortBy &&
    params.append("createdOnSortBy", searchParams.createdOnSortBy);
  searchParams.createBySortBy &&
    params.append("createBySortBy", searchParams.createBySortBy);
  searchParams.durationSortBy &&
    params.append("durationSortBy", searchParams.durationSortBy);
  searchParams.statusSortBy &&
    params.append("statusSortBy", searchParams.statusSortBy);
  searchParams.Filters?.forEach((filter) => {
    params.append("Filters", filter);
  });
  try {
    const response = await axiosClient.get("/api/v1/trainingprograms/search", {
      params,
    });
    return response as unknown as ListResponse<TrainingProgram>;
  } catch {
    return {
      data: [],
      currentPage: 1,
      totalPage: 1,
    } as unknown as ListResponse<TrainingProgram>;
  }
};

//post
export const create = async (
  createRequest: CreateTrainingProgram
): Promise<TrainingProgram> =>
  await axiosClient.post("/api/v1/trainingprograms", createRequest);

export const duplicate = async (id: number): Promise<any> =>
  await axiosClient
    .post(`/api/v1/trainingprograms/duplicate/${id}`).then((res) => {
      return res;
    });

export const importTrainingProgramAPI = async (
  params: ImportTrainingProgramModel
) => {
  if (typeof params.file === "undefined") return;
  var formData = new FormData();
  formData.append("delimiter", params.delimiter);
  formData.append("byCode", params.byCode.toString());
  formData.append("byName", params.byName.toString());
  formData.append("duplicationHandle", params.duplicationHandle.toString());
  formData.append("file", params.file);
  axiosClient.post("/api/v1/trainingprograms/import", formData);
};

//put
export const update = async (updateParam: TrainingProgram) => {
  console.log("API layer: ", updateParam);
  const updateModel: UpdateTrainingProgram = {
    name: updateParam.name,
    startTime: updateParam.startTime,
    status: updateParam.status,
    generalInformation: updateParam.generalInformation,
    syllabusesIds: updateParam.syllabuses?.map((syllabus, index) => {
      return {
        syllabusesId: syllabus.syllabusId,
        sequence: index,
      };
    }),
  };
  console.log(updateModel);
  await axiosClient
    .put(`/api/v1/trainingprograms/update/${updateParam.trainingProgramCode}`, {
      name: updateModel.name,
      startTime: updateModel.startTime,
      status: updateModel.status,
      generalInformation: updateModel.generalInformation,
      syllabusesIds: updateModel.syllabusesIds,
    })
};

export const activateOrDeactivate = async (
  params: ListParamsTrainingProgramStatus
) =>
  await axiosClient
    .put(
      `/api/v1/trainingprograms/activeordeactive/${params.id}`
    );
