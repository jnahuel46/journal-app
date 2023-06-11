import { createSlice } from "@reduxjs/toolkit";

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
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
    savingNewNote: (state, action ) => {
      state.isSaving = true 
    },
    addNewEmptyNote: (state, action ) => {
      state.notes.push( action.payload ),
      state.isSaving = false
    },
    setActiveNote: (state, action ) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSavings: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes =  state.notes.map( note => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note;
      });
      state.messageSaved = `${action.payload.title}, correctly updated`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrl = [...state.active.imageUrl, ...action.payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false,
      state.messageSaved = "",
      state.notes = [],
      state.active = null
    },
    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter( note => note.id !== action.payload);
    }
  },
});

export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSavings,
  updateNote,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteById,
} = journalSlice.actions;
export default journalSlice;
