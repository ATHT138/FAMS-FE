export interface ListResponse<T> {
  data: T[];
  totalPage: number;
  currentPage: number;
}

export interface ListResponseItem<T> {
  items: T[];
  totalPage: number;
  currentPage: number;
}

export interface ListResponseToken {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ListParamsCalendars {
  id?: string | null;
  keyword?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  locations?: string[] | null;
  timeChocies?: string[] | null;
  status?: number[] | null;
  fsu?: string | null;
  trainer?: string | null;
  userName?: string | null;
}

export interface ListParamsSyllabus {
  SyllabusId?: string;
  UserId?: string | null;
}

export interface ListParamsClass {
  PageIndex: number;
  PageSize: number;
  Keywords?: string | null;
  ClassLocation?: string[] | null;
  StartTime?: string | null;
  EndTime?: string | null;
  ClassTime?: string[] | null;
  Status?: string[] | null;
  FSU?: string | null;
  Trainer?: string | null;
}

export interface ListParams {
  num_page?: number;
  size_page: number;
  sort_by?:
    | [
        {
          type: string | null;
          value: string | null;
        }
      ]
    | [];
  search_by?:
    | [
        {
          type: string | null;
          value: string | null;
        }
      ]
    | [];
}

export interface ListParamTrainingProgram {
  page?: number;
  pageSize?: number;
  idSortBy?: "asc" | "desc" | null;
  programNameSortBy?: "asc" | "desc" | null;
  createdOnSortBy?: "asc" | "desc" | null;
  createBySortBy?: "asc" | "desc" | null;
  durationSortBy?: "asc" | "desc" | null;
  statusSortBy?: "asc" | "desc" | null;
  Filters?: string[] | null;
}
export interface ListParamsTrainingProgramStatus {
  id: number;
  userId: string;
}

export interface ListGetProgramParams {
  page: number;
  pageSize: number;
}
export interface GetProgramParam {
  id: number;
}

export interface Error {
  type: string | null;
  title: string | null;
  status: number | null;
  traceId: string | null;
  errors: {
    Name: string[];
  };
}
export interface MaterialParams {
  id?: string | null;
  name?: string | null;
  link?: string | null;
  trainingContentId?: string | null;
}
