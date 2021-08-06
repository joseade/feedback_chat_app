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
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as actions from "../state/actions/user";
import * as actionsSocket from "../state/actions/socket";

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

export default function LogIn() {
  const classes = useStyles();

  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [registeredUser, setRegisteredUser] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const formValues = ({ target }) => {
    const { name, value } = target;
    setRegisteredUser((registeredUser) => {
      return { ...registeredUser, [name]: value };
    });
  };

  const register = (e) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (registeredUser.email === "") {
      setEmailError(true);
    }
    if (registeredUser.password === "") {
      setPasswordError(true);
    }
    if (registeredUser.email && registeredUser.password) {
      dispatch(actions.loginRequest(registeredUser));
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

  if (user.signin) {
    //console.log(actionsSocket.startSocket(user));
    dispatch(actionsSocket.startSocket(user));
    // dispatch({
    //   type: actions.Types.START_SOCKET,
    //   payload: {
    //     type: "ADD_USER",
    //     userId: user.id,
    //   },
    // });
    return <Redirect to={"/dashboard"} />;
  }

  //   useEffect(() => {
  //     if (registeredUserSignIn.succes) {
  //       props.history.push("/dash");
  //     }
  //   }, [registeredUserSignIn.succes]);

  const location = {
    pathname: "/register",
    state: { fromLogin: true },
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t("login.welcome")}
        </Typography>
        <form onSubmit={register} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={t("login.email")}
                autoComplete="email"
                name="email"
                value={registeredUser.email}
                onChange={formValues}
                error={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label={t("login.password")}
                type="password"
                id="password"
                autoComplete="current-password"
                name="password"
                value={registeredUser.password}
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
            {t("login.signin")}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                onClick={() => {
                  dispatch(actions.returnToRegister());
                }}
                className="link-dark mt-1"
                to={location}
              >
                Register
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
                  {t("login.error")}
                </li>
              ))}
          </ul>
        </Grid>
      </div>
    </Container>
  );
}
