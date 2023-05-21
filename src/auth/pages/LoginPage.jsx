import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  checkingAuthentication,
  startGoogleSignIn,
} from "../../store/auth/thunks";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const formData = {
    email: "jeremias.@gmail.com",
    password: "123456"
  }

  const { email, password, onInputChange } = useForm(formData);

  // the useMemo shoul evaluate the result of status === checking and
  // return a boolean value and change depending of the status
  const isAuth = useMemo( () => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(checkingAuthentication(email, password));
  };

  const onSubmitGoogle = (event) => {
    event.preventDefault();
    dispatch(startGoogleSignIn(email, password));
  };

  return (
    <AuthLayout title={"Login"}>
      <form onSubmit={onSubmit}>
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
            <Grid item xs={12} sm={6}>
              <Button disabled={ isAuth } type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={ isAuth } onClick={onSubmitGoogle} variant="contained" fullWidth>
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
