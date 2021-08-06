import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as actions from "../state/actions/user";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function Register() {
  const classes = useStyles();

  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const formValues = ({ target }) => {
    const { name, value } = target;
    setNewUser((user) => {
      return { ...user, [name]: value };
    });
  };

  const register = (e) => {
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    if (newUser.name === "") {
      setNameError(true);
    }
    if (newUser.email === "") {
      setEmailError(true);
    }
    if (newUser.password === "") {
      setPasswordError(true);
    }
    if (newUser.name && newUser.email && newUser.password) {
      dispatch(actions.registerRequest(newUser));
    }
  };

  useEffect(() => {
    if (!user.language) {
      if (/^en\b/.test(navigator.language)) {
        i18n.changeLanguage("en");
        dispatch(actions.setLanguage("en"));
      }
      if (/^es\b/.test(navigator.language)) {
        i18n.changeLanguage("es");
        dispatch(actions.setLanguage("es"));
      }
      if (/^fr\b/.test(navigator.language)) {
        i18n.changeLanguage("fr");
        dispatch(actions.setLanguage("fr"));
      }
    }
  }, [user.language]);

  if (user.signup) {
    return <Redirect to={"/login"} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t("register.welcome")}
        </Typography>
        <form onSubmit={register} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label={t("register.name")}
                autoFocus
                name="name"
                value={newUser.name}
                onChange={formValues}
                error={nameError}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={t("register.email")}
                autoComplete="email"
                name="email"
                value={newUser.email}
                onChange={formValues}
                error={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label={t("register.password")}
                type="password"
                id="password"
                autoComplete="current-password"
                name="password"
                value={newUser.password}
                onChange={formValues}
                error={passwordError}
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
            {t("register.signup")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link className="link-dark mt-1" to="/login">
                Log in
              </Link>
            </Grid>
          </Grid>
        </form>
        <Grid container>
          <ul className="list-group">
            {user.errors.length > 0 &&
              user.errors.map((error) => (
                <li
                  key={error.message}
                  className="list-group-item list-group-item-warning"
                >
                  {error.message === "Email in use" && (
                    <>{t("register.error.email")}</>
                  )}
                  {error.message === "Email must be valid" && (
                    <>{t("register.error.email.valid")}</>
                  )}
                  {error.message ===
                    "Password must be between four and twenty characters" && (
                    <>{t("register.error.password")}</>
                  )}
                </li>
              ))}
          </ul>
        </Grid>
      </div>
    </Container>
  );
}
