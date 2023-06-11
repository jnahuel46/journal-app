import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSavings,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileupload } from "../../helpers/fileUpload";
import { deleteNoteById } from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    //from getState i can pull the state oh all the vars of the aplication like auth and journal state
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageUrl: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("The uid doesnt exist");

    const result = await loadNotes(uid);
    //set notes ontp the store that comes from firebase
    dispatch(setNotes(result));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSavings());
    const { uid } = getState().auth;
    const { active: activeNote } = getState().journal;

    const noteToFirestore = { ...activeNote };
    delete noteToFirestore.id;

    //update note
    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(activeNote));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSavings());
    //await fileupload(files[0])
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push( fileupload(file) )
    }
    const photosUrls = await Promise.all( fileUploadPromises );
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    //delete note, allways take the information form the active note
    const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById(note.id));
  };
};