import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated",
      state.uid = payload.uid,
      state.email = payload.email,
      state.displayName = payload.displayName,
      state.photoURL = payload.photoURL,
      state.errorMessage = null
    },
    logout: (state, { payload }) => {
      state.status = "no-validation",
      state.uid = null,
      state.email = null,
      state.displayName = null,
      state.photoURL = null,
      state.errorMessage = payload?.errorMessage === undefined ? null : payload.errorMessage
    },
    checkCredentials: (state, action) => {
      state.status = "checking";
    },
  },
});

export const { login, logout, checkCredentials } = authSlice.actions;
export default authSlice;
