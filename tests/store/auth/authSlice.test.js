import authSlice, {
  checkCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authFixtures";

describe("Test in AuthSlice", () => {
  test('should return initial state and called "auth"', () => {
    const state = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe("auth");
    expect(state).toEqual(initialState);
  });

  test("should perform an authentication", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual(authenticatedState);
  });
  test("should perform an logout without args", () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: "no-validation",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null,
    });
  });
  test("should perform an logout with args", () => {
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage: "wrong credentials" })
    );
    expect(state).toEqual({
      status: "no-validation",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: "wrong credentials",
    });
  });

  test("should change state to 'checking'", () => {
    const state = authSlice.reducer(authenticatedState, checkCredentials());
    expect(state.status).toBe("checking");
  });
});
