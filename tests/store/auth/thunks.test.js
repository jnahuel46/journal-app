import {
  loginWithEmail,
  logoutFirebase,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmail,
  startlogoutFirebase,
} from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("Test in auth thunkd", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("should invoke checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkCredentials());
  });

  test("startGoogleSignIng should invoke chekingCredentials and Login", async () => {
    const loginData = { ok: true, ...demoUser };
    //mock
    await signInWithGoogle.mockResolvedValue(loginData);

    //thunk
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIng should invoke chekingCredentials and Logout", async () => {
    const loginData = { ok: false, errorMessage: "Google Error" };
    //mock
    await signInWithGoogle.mockResolvedValue(loginData);

    //thunk
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startLoginWithEmailAndPassword should invoke chekingCredentials and Login", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    //mock
    await loginWithEmail.mockResolvedValue(loginData);

    //thunk
    await startLoginWithEmail(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLogout should invoke logoutFirebase, clearNotes and Logout", async () => {
    await startlogoutFirebase()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(
      logout({
        errorMessage: null,
      })
    );
  });
});
