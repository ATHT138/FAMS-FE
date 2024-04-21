import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ListParamsCreateUser,
  ListParamsUpdateUser,
  ListParamsUser,
  ListResponse,
  User,
} from "../../models";
import {
  LoginCredentials,
  RefreshTokenCredentials,
} from "../../constants/userApi";
import { RootState } from "../../store";

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  logging: boolean;
  listUser: User[] | null;
  totalPage?: number;
  currentPage: number;
  isLogin: boolean;
  isSuccess?: boolean | null;
  postActionUserId?: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  logging: false,
  listUser: null,
  totalPage: 0,
  currentPage: 0,
  isLogin: false,
  isSuccess: null,
  postActionUserId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginCredentials>) {
      action.payload;
      state.logging = true;
    },
    setCredentials(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.logging = false;
      state.isLogin = true;
    },
    fetchProfile(state) {
      state.isLogin = true;
      state.logging = true;
    },
    refreshToken(state, action: PayloadAction<RefreshTokenCredentials>) {
      state.logging = true;
      action.payload;
    },
    loginFailed(state) {
      state.logging = false;
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      state.logging = false;
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    checkGetAllUsers(state, action: PayloadAction<ListParamsUser>) {
      state.logging = true;
      action.payload;
    },
    fetchAllUsers(state, action: PayloadAction<ListResponse<User>>) {
      state.listUser = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPage = action.payload.totalPage;
      state.logging = false;
    },
    createUser(state, action: PayloadAction<ListParamsCreateUser>) {
      state.logging = true;
      action.payload;
    },
    updateUser(state, action: PayloadAction<ListParamsUpdateUser>) {
      state.logging = true;
      action.payload;
    },
    deactivateUser(state, action: PayloadAction<string>) {
      state.logging = true;
      action.payload;
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.logging = true;
      action.payload;
    },
    fetchPermissions(state) {
      state.logging = true;
    },
    setStatusUserAction(state, action: PayloadAction<any>) {
      state.logging = true;
      state.isSuccess = action.payload.isSuccess ?? false;
      state.postActionUserId = action.payload.userId ?? null;
    },
    resetStatusUserAction(state) {
      state.logging = false;
      state.isSuccess = null;
      state.postActionUserId = null;
    },
  },
});

export const userActions = userSlice.actions;
export const userPermissions = userSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectIsLogin = (state: RootState) => state.user.isLogin;
export const selectIsLogging = (state: RootState) => state.user.logging;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectListUser = (state: RootState) => state.user.listUser;
export const isCreating = (state: RootState) => state.user.logging;
export const selectTotalPage = (state: RootState) => state.user.totalPage;
export const selectCurrentPage = (state: RootState) => state.user.currentPage;
export const selectUserActionIsSuccess = (state: RootState) => state.user.isSuccess;
export const selectPostActionUserId = (state: RootState) =>
  state.user.postActionUserId;
export const userReducer = userSlice.reducer;
