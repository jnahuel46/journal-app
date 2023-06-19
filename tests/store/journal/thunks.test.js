import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FireBaseDB } from "../../../src/firebase/config";

describe("Tst in Journal Thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("startNewNote should create a new withe note", async () => {
    const uid = "test-uid";
    //mocked a fake response to this function, and ensure that its always called into the dispatch
    getState.mockReturnValue({ auth: { uid: uid } });
    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrl: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrl: [],
      })
    );

    //delete unnecesary register in Database
    const collectionRef = collection(FireBaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    //acumula en el array todas las promesas que vamos generando a la hora de eliminar el doc
    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    //una vez que estan todas acumuladas, las borra
    await Promise.all(deletePromises);
  }, 8000);
});
