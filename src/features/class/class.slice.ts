import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Class,
  ListParamsClass,
  ListParamsClassCreate,
  ListResponseItem,
} from "../../models";
import { RootState } from "../../store";

type classStateProps = {
  loading?: boolean;
  classList: Class[] | null;
  currentClass: Class | null;
  currentPage: number | null;
  totalPages: number | null;
  classId?: string | null;
  isSuccessful?: boolean |null;
};

const initialState: classStateProps = {
  loading: false,
  classList: null,
  currentClass: null,
  currentPage: null,
  totalPages: null,
  classId: null,
  isSuccessful: false,
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    checkLoading(state, action: PayloadAction<ListParamsClass>) {
      action.payload;
      state.loading = true;
    },
    fetchClassList(state, action: PayloadAction<ListResponseItem<Class>>) {
      state.classList = action.payload.items;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPage;
      state.loading = false;
    },
    checkClass(state, action: PayloadAction<string>) {
      action.payload;
      state.loading = true;
      action.payload;
    },
    fetchClass(state, action: PayloadAction<Class>) {
      state.currentClass = action.payload;
      state.loading = false;
    },
    createClass(state, action: PayloadAction<ListParamsClassCreate>) {
      state.loading = true;
      action.payload;
    },
    updateClass(
      state,
      action: PayloadAction<{ params: ListParamsClassCreate; classId: string }>
    ) {
      state.loading = true;
      action.payload;
    },
    setStatusClass(
      state,
      action: PayloadAction<{ isSuccessful: boolean; classId?: string }>
    ) {
      state.classId = action.payload.classId ?? null;
      state.loading = false;
      state.isSuccessful = action.payload.isSuccessful;
    },
    resetStatusClass(state) {
      state.loading = false;
      state.isSuccessful = false;
      state.classId = null;
      state.currentClass = null;
    },
    setDeActiveClass(state, action: PayloadAction<string>) {
      state.loading = true;
      action.payload;
    },
  },
});

export const classActions = classSlice.actions;

export const selectClassList = (state: RootState) => state.class.classList;
export const selectCurrentClassPage = (state: RootState) =>
  state.class.currentPage;
export const selectTotalClassPage = (state: RootState) =>
  state.class.totalPages;
export const selectCurrentClass = (state: RootState) =>
  state.class.currentClass;
export const selectClassIsSuccessful = (state: RootState) =>
  state.class.isSuccessful;
export const selectClassId = (state: RootState) => state.class.classId;

export const classReducer = classSlice.reducer;
