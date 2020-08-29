import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "aws-amplify";

import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarContent } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";

const Login = (props) => {
  const [snackbar, setSnackbar] = useState({
    snackbarOpen: false,
    snackbarMsg: "",
  });

  const useStyles = makeStyles((theme) => ({
    paper: {
      paddingTop: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    container: {
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  const validationSchema = Yup.object({
    email: Yup.string("")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("").required("Enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const { email, password } = values;
      await Auth.signIn({
        username: values.email,
        password: values.password,
      })
        .then(() => {
          props.history.push("/"); //Redirect to main page
        })
        .catch((err) => {
          setSnackbar({ snackbarOpen: true, snackbarMsg: err.message });
        });
      resetForm();
      console.log(values);
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const snackbarClose = (e) => {
    setSnackbar({ ...snackbar, snackbarOpen: false });
  };

  return (
    <form className={classes.container} onSubmit={formik.handleSubmit}>
      <Container component="main" maxWidth="xs" minHeight="100vh">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackbar.snackbarOpen}
            autoHideDuration={4000}
            onClose={snackbarClose}
          >
            <SnackbarContent
              style={{
                backgroundColor: "red",
              }}
              message={snackbar.snackbarMsg}
            />
          </Snackbar>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={
                    formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email
                  }
                  error={
                    formik.touched.email ? Boolean(formik.errors.email) : ""
                  }
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={
                    formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password
                      ? Boolean(formik.errors.password)
                      : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </form>
  );
};

export default Login;
