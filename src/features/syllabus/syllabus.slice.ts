import { ListParams, ListResponse } from "../../models";
import { RootState } from "../../store";
import {
  CreateSyllabus,
  ImportSyllabusModel,
  Syllabus,
  SyllabusDetail,
  SyllabusOther,
  SyllabusOutline,
  UpdateSyllabus,
} from "./../../models/syllabus.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SyllabusState {
  syllabusList: Syllabus[];
  filter: ListParams;
  totalPage?: number;
  currentPage: number;
  syllabus: SyllabusDetail | null;
  syllabusOutline: SyllabusOutline | null;
  syllabusOther: SyllabusOther | null;
  loading?: boolean;
  syllabusId?: string | null;
  isSuccess?: boolean | null;
}

const initialState: SyllabusState = {
  syllabusList: [],
  syllabusOutline: null,
  syllabusOther: null,
  syllabus: null,
  loading: false,
  filter: {
    num_page: 1,
    size_page: 10,
    search_by: [],
    sort_by: [
      {
        type: "TopicName",
        value: "asc",
      },
    ],
  },
  currentPage: 0,
  totalPage: 0,
  isSuccess: null,
  syllabusId: null,
};

export const syllabusSlice = createSlice({
  name: "syllabus",
  initialState,
  reducers: {
    fetchSyllabusList(state, action: PayloadAction<ListParams>) {
      action.payload;
      state.loading = true;
    },
    fetchSyllabusListSuccess: (
      state,
      action: PayloadAction<ListResponse<Syllabus>>
    ) => {
      state.syllabusList = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPage = action.payload.totalPage;
      state.loading = false;
    },
    fetchSyllabusListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
      state.loading = true;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    fetchSyllabusById(state, action: PayloadAction<string>) {
      action.payload;
      state.loading = true;
    },
    fetchSyllabusByIdSuccess(state, action: PayloadAction<SyllabusDetail>) {
      state.syllabus = action.payload;
      state.loading = false;
    },
    fetchSyllabusOutlineById(state, action: PayloadAction<SyllabusOutline>) {
      state.syllabusOutline = action.payload;
      state.loading = false;
    },
    fetchSyllabusOthersById(state, action: PayloadAction<SyllabusOther>) {
      state.syllabusOther = action.payload;
      state.loading = false;
    },
    fetchSyllabusOutline(state, action: PayloadAction<string>) {
      action.payload;
      state.loading = true;
    },
    fetchSyllabusOutlineSuccess(state, action: PayloadAction<SyllabusOutline>) {
      state.loading = false;
      state.syllabusOutline = action.payload;
    },
    fetchSyllabusOutlineFail(state) {
      state.loading = false;
    },
    duplicateSyllabus(state, action: PayloadAction<string>) {
      action.payload;
      state.loading = true;
    },
    importSyllabus(state, action: PayloadAction<ImportSyllabusModel>) {
      action.payload;
      state.loading = true;
    },
    createSyllabus(state, action: PayloadAction<CreateSyllabus>) {
      action.payload;
      state.loading = true;
    },
    updateSyllabus(state, action: PayloadAction<UpdateSyllabus>) {
      action.payload;
      state.loading = true;
    },
    setStatusSyllabus(state, action: PayloadAction<any>) {
      state.loading = false;
      state.syllabusId = action.payload.syllabusId ?? null;
      state.isSuccess = action.payload.isSuccess ?? null;
    },
    resetSyllabusAction(state) {
      state.loading = false;
      state.syllabusId = null;
      state.isSuccess = null;
    },
    manuallySetSelect(state, action: PayloadAction<string>) {
      state.syllabusId = action.payload;
    },
  },
});

// Actions
export const syllabusAcitons = syllabusSlice.actions;

// Selectors
export const selectSyllabusList = (state: RootState) =>
  state.syllabus.syllabusList;
export const selectSyllabusLoading = (state: RootState) =>
  state.syllabus.loading;
export const selectSyllabusFilter = (state: RootState) => state.syllabus.filter;
export const selectSyllabusTotalPage = (state: RootState) =>
  state.syllabus.totalPage;
export const selectSyllabusCurrentPage = (state: RootState) =>
  state.syllabus.currentPage;
export const selectSyllabus = (state: RootState) => state.syllabus.syllabus;
export const selectSyllabusOutline = (state: RootState) =>
  state.syllabus.syllabusOutline;
export const selectSyllabusOther = (state: RootState) =>
  state.syllabus.syllabusOther;
export const selectSyllabusIsSuccess = (state: RootState) =>
  state.syllabus.isSuccess;
export const selectSyllabusId = (state: RootState) => {
  return state.syllabus.syllabusId;
};

// Reducer
export const syllabusReducer = syllabusSlice.reducer;
