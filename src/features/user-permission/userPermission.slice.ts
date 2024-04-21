import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPermissionModel } from "../../models/userPermission.model";
import { RootState } from "../../store";

interface AuthState {
  logging: boolean;
  listPermission: UserPermissionModel[] | null;
  message?: string;
}

const initialState: AuthState = {
  logging: false,
  listPermission: null,
  message: "",
};

const userPermissionSlice = createSlice({
  name: "userPermission",
  initialState,
  reducers: {
    fetchPermisstions(state) {
      state.logging = true;
    },
    fetchPermissionsSuccess(
      state,
      action: PayloadAction<UserPermissionModel[]>
    ) {
      state.logging = false;
      state.listPermission = action.payload;
    },
    fetchPermissionsFailed(state, action: PayloadAction<string>) {
      state.logging = false;
      state.message = action.payload;
    },
    updatePermisstions(state, action: PayloadAction<UserPermissionModel[]>) {
      state.logging = false;
      action.payload;
    },
  },
});
export const userPermissionReducer = userPermissionSlice.reducer;
export const userPermissionActions = userPermissionSlice.actions;
export const selectUserPermissions = (state: RootState) =>
  state.userPermission.listPermission;
