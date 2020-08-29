import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Auth } from "aws-amplify";

import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import CssBaseline from "@material-ui/core/CssBaseline";

const SignUp = (props) => {
  const [snackbar, setSnackbar] = useState({
    snackbarOpen: false,
    snackbarMsg: "",
  });

  const useStyles = makeStyles((theme) => ({
    paper: {
      paddingTop: "30%",
      paddingBottom: "52%",
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
  }));

  const classes = useStyles();

  const validationSchema = Yup.object({
    firstName: Yup.string("Enter a name").required("Name is required"),
    lastName: Yup.string("Enter a name").required("Name is required"),
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("")
      .min(8, "Password must contain atleast 8 characters")
      .required("Enter your password"),
    confirmPassword: Yup.string("Enter your password")
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });

  const snackbarClose = (e) => {
    setSnackbar({ ...snackbar, snackbarOpen: false });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const { email, password, lastName, firstName } = values;
      Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          email: values.email,
          "custom:lastName": values.lastName,
          "custom:firstName": values.firstName,
        },
      })
        .then(() => {
          Auth.signOut();
          props.history.push("/Welcome"); //Redirect to main page
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

  return (
    <form className={classes.container} onSubmit={formik.handleSubmit}>
      <Container component="main" maxWidth="xs" minHeight="100vh">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registration
            <br />* All fields are mandatory
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText={
                    formik.errors.firstName &&
                    formik.touched.firstName &&
                    formik.errors.firstName
                  }
                  error={
                    formik.touched.firstName
                      ? Boolean(formik.errors.firstName)
                      : ""
                  }
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  helperText={
                    formik.errors.lastName &&
                    formik.touched.lastName &&
                    formik.errors.lastName
                  }
                  error={
                    formik.touched.lastName
                      ? Boolean(formik.errors.lastName)
                      : ""
                  }
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
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

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  helperText={
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  error={
                    formik.touched.confirmPassword
                      ? Boolean(formik.errors.confirmPassword)
                      : ""
                  }
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </form>
  );
};

export default SignUp;
