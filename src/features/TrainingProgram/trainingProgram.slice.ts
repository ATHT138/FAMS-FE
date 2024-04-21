import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GetProgramParam,
  ListParamTrainingProgram,
  ListParamsTrainingProgramStatus,
  ListResponse,
} from "../../models";
import { RootState } from "../../store";
import {
  CreateTrainingProgram,
  ImportTrainingProgramModel,
  TrainingProgram,
} from "../../models/trainingProgram.model";

interface ProgramState {
  programList: TrainingProgram[];
  filterSort: ListParamTrainingProgram;
  totalPage?: number;
  currentPage: number;
  trainingProgram: TrainingProgram | null;
  loading?: boolean;
  error: string | null;
  status: any | null;
}

const initialState: ProgramState = {
  programList: [],
  trainingProgram: null,
  loading: false,
  filterSort: {
    page: 1,
    pageSize: 5,
  },
  currentPage: 0,
  totalPage: 0,
  error: null,
  status: null,
};

export const trainingProgramSlice = createSlice({
  name: "trainingProgram",
  initialState,
  reducers: {
    fetchList(state, action: PayloadAction<ListParamTrainingProgram>) {
      state.status = null;
      state.loading = true;
      action.payload;
    },
    fetchListSuccess: (
      state,
      action: PayloadAction<ListResponse<TrainingProgram>>
    ) => {
      state.programList = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPage = action.payload.totalPage;
      state.loading = false;
    },
    fetchListFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setFilterSort(state, action: PayloadAction<ListParamTrainingProgram>) {
      state.filterSort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    fetchProgramById(state, action: PayloadAction<GetProgramParam>) {
      state.status = null;
      state.trainingProgram = null;
      state.loading = true;
      action.payload;
    },
    fetchProgramIdSuccess: (state, action: PayloadAction<TrainingProgram>) => {
      state.status = "fetch program successfully";
      state.trainingProgram = action.payload;
      state.loading = false;
    },
    fetchProgramIdFail(state) {
      state.loading = false;
    },
    fetchCreate(state, action: PayloadAction<CreateTrainingProgram>) {
      state.loading = false;
      action.payload;
    },
    fetchCreateSuccess(state, action: PayloadAction<TrainingProgram>) {
      state.status = "Created successfully";
      state.trainingProgram = action.payload;
      state.loading = false;
    },
    fetchCreateFail(state, action: PayloadAction<any>) {
      (state.loading = false), (state.error = action.payload);
    },
    fetchUpdate(state, action: PayloadAction<TrainingProgram>) {
      state.loading = true;
      action.payload;
    },
    fetchUpdateSuccess(state, action: PayloadAction<TrainingProgram>) {
      state.status = action.payload;
      state.loading = false;
    },
    fetchUpdateFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    importTrainingProgram(
      state,
      action: PayloadAction<ImportTrainingProgramModel>
    ) {
      action.payload;
      state.loading = true;
    },
    changeStatus(
      state,
      action: PayloadAction<ListParamsTrainingProgramStatus>
    ) {
      state.status = null;
      state.loading = true;
      action.payload;
    },
    changeStatusSuccess(state, action: PayloadAction<any>) {
      state.status = action.payload;
      state.loading = false;
    },
    changeStatusFail(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchDuplicate(state, action: PayloadAction<number>) {
      state.loading = true;
      action.payload;
    },
    fetchDuplicateSuccess(state, action: PayloadAction<TrainingProgram>) {
      state.trainingProgram = action.payload;
      state.status = "Duplicated successfully";
      state.loading = false;
    },
    fetchDuplicateFail(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const programActions = trainingProgramSlice.actions;

export const programReducer = trainingProgramSlice.reducer;

export const selectProgramList = (state: RootState) =>
  state.program.programList;

export const selectProgramCurrentPage = (state: RootState) =>
  state.program.currentPage;

export const selectProgramTotalPage = (state: RootState) =>
  state.program.totalPage;

export const selectTrainingProgram = (state: RootState) =>
  state.program.trainingProgram;

export const selectProgramError = (state: RootState) => state.program.error;

export const selectProgramFilterSort = (state: RootState) =>
  state.program.filterSort;
export const selectProgramFilter = (state: RootState) =>
  state.program.filterSort;

export const selectProgramStatus = (state: RootState) => state.program.status;

export const selectProgramisLoading = (state: RootState) => state.program.loading;
