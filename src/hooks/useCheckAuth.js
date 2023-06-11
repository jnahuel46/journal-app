import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { FireBaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { useEffect } from "react";
import { startLoadingNote } from "../store/journal/thunks";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FireBaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoUrl } = user;
      dispatch(login({ uid, email, displayName, photoUrl }));
      dispatch( startLoadingNote() );
    });
  }, []);

  return status;
};
