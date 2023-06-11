import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleSignIn,
  startLoginWithEmail,
} from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);4

  const { email, password, onInputChange } = useForm(formData);
  // the useMemo shoul evaluate the result of status === checking and
  // return a boolean value and change depending of the status
  const isAuth = useMemo(() => status === "checking", [status]);

  const onSubmitGoogle = (event) => {
    event.preventDefault();
    dispatch(startGoogleSignIn(email, password));
  };

  const onSubmitEmailAndPassword = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmail({ email, password }));
  };

  return (
    <AuthLayout title={"Login"}>
      <form className="animate__animated animate__fadeIn animate__faster" >
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="example@example.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuth}
                onClick={onSubmitEmailAndPassword}
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuth}
                onClick={onSubmitGoogle}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={"row"} justifyContent={"end"}>
            <Link component={RouterLink} color="inherit" to={"/auth/register"}>
              Register Account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
