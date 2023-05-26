import { createSlice } from "@reduxjs/toolkit";

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: true,
    messageSaved: "",
    notes: [],
    active: null,
    //ActiveNote
    // active: {
    //     id: 'abc123',
    //     title: '',
    //     body: '',
    //     date: 12345,
    //     imageURL: []
    // },
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    addNewEmptyNote: (state, { payload }) => {
      (state.isSaving = "authenticated"),
        (state.uid = payload.uid),
        (state.email = payload.email),
        (state.displayName = payload.displayName),
        (state.photoURL = payload.photoURL),
        (state.errorMessage = null);
    },
    setActiveNote: (state, { payload }) => {
      (state.isSaving = "no-validation"),
        (state.uid = null),
        (state.email = null),
        (state.displayName = null),
        (state.photoURL = null),
        (state.errorMessage =
          payload?.errorMessage === undefined ? null : payload.errorMessage);
    },
    setNotes: (state, action) => {
      state.isSaving = "checking";
    },
    setSaving: (state, action) => {
      state.isSaving = "checking";
    },
    updateNote: (state, action) => {
      state.isSaving = "checking";
    },
    deleteNoteById: (state, action) => {
      state.isSaving = "checking";
    },
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSavings,
  updateNote,
  deleteNoteById,
} = journalSlice.actions;
export default journalSlice;
