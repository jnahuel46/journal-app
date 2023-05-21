import { registerWithEmail, signInWithGoogle } from "../../firebase/providers";
import { checkCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkCredentials());
  };
};

export const startGoogleSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(checkCredentials());

    const result = await signInWithGoogle();
    if (!result.ok) {
      return dispatch(logout(result.erorMessage));
    }

    dispatch(login(result));
  };
};

export const startCreatingWithEmail = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerWithEmail({
      email,
      password,
      displayName,
    });

    if (!ok) return dispatch(logout({errorMessage}));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};
