import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListResponse, Material, MaterialParams } from "../../models";
import { RootState } from "../../store";

interface MaterialState {
  materialList: Material[];
  filter: MaterialParams | null;
  materialDetail: Material | null;
  loading?: boolean;
}

const initialState: MaterialState = {
  materialList: [],
  materialDetail: null,
  loading: false,
  filter: null,
};

export const materialSlice = createSlice({
  name: "trainingMaterial",
  initialState,
  reducers: {
    fetchList(state, action: PayloadAction<MaterialParams>) {
      state.loading = true;
      action.payload;
    },
    fetchListSuccess: (
      state,
      action: PayloadAction<ListResponse<Material>>
    ) => {
      state.materialList = action.payload.data;
      state.loading = false;
    },
    fetchListFail(state) {
      state.loading = false;
    },
    setFilter(state, action: PayloadAction<MaterialParams>) {
      state.filter = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    // fetchMaterialById(state, action: PayloadAction<string>) {
    //     state.loading = true;
    // },
    // fetchMaterialByIdSuccess: (state, action: PayloadAction<Material>) => {
    //     state.materialDetail = action.payload;
    //     state.loading = false;
    // },
    // fetchMaterialByIdFail(state) {
    //     state.loading = false;
    // },
    create(state, action: PayloadAction<MaterialParams>) {
      state.loading = true;
      action.payload;
    },
    createSuccess: (state, action: PayloadAction<Material>) => {
      state.materialDetail = action.payload;
      state.loading = false;
    },
    createFail(state) {
      state.loading = false;
    },
  },
});

export const materialActions = materialSlice.actions;

export const materialReducer = materialSlice.reducer;

export const selectMaterialList = (state: RootState) =>
  state.material.materialList;

export const selectMaterialFilter = (state: RootState) => state.material.filter;

// export const selectCurrentPage = (state: RootState) => state.program.currentPage;

// export const selectTotalPage = (state: RootState) => state.program.totalPage;

export const selectMaterial = (state: RootState) =>
  state.material.materialDetail;
