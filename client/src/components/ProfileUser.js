import { Container, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import * as actionsUser from "../state/actions/user";

const useStyles = makeStyles({
  root: {
    width: "60vh",
  },
  media: {
    height: "25vh",
  },
});

export default function ProfileUser() {
  const classes = useStyles();

  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [userPicture, setUserPicture] = useState("");
  const profilePicture = useRef();
  const avatars = ["avatar2.png", "avatar3.png", "avatar4.png", "avatar5.png"];
  const [language, setLanguage] = useState(false);
  const [newAvatar, setNewAvatar] = useState(false);
  const [imageUser, setImageUser] = useState(user.profilePicture);

  const onUpdateImage = () => {
    const newPicture = profilePicture.current.src?.replace(
      window.location.origin,
      ""
    );
    setUserPicture(newPicture);
    dispatch(actionsUser.updateAvatar({ profilePicture: newPicture }));

    // const res = await axios.post("/users/picture", {
    //   profilePicture: profilePicture.current.src.replace(
    //     "http://localhost:3000",
    //     ""
    //   ),
    // });

    setNewAvatar(false);
  };

  const onLanguageChange = (e) => {
    //const { target } = e;
    //console.log(e.currentTarget.value);
    dispatch(actionsUser.updateLanguage({ language: e.currentTarget.value }));

    i18n.changeLanguage(e.currentTarget.value);
    setLanguage(false);
  };

  if (!user.signin) {
    return <Redirect to={"/login"} />;
  }

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imageUser}
            title="Contemplative Reptile"
            ref={profilePicture}
          />
          <CardContent>
            <Typography align="center" gutterBottom variant="h5" component="h2">
              {t("profile.title")}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${t("profile.name")}: ${user.name}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${t("profile.email")}: ${user.email}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "10px",
          }}
        >
          <Button
            onClick={() => {
              setLanguage(true);
              setNewAvatar(false);
            }}
            size="small"
            color="primary"
          >
            {t("profile.language")}
          </Button>
          <Button
            onClick={() => {
              setLanguage(false);
              setNewAvatar(true);
            }}
            size="small"
            color="primary"
          >
            {t("profile.image")}
          </Button>
        </CardActions>
        {language && (
          <div className="mt-5 d-flex justify-content-evenly align-items-center">
            <Button
              value="en"
              onClick={onLanguageChange}
              variant="contained"
              color="primary"
            >
              English
            </Button>
            <Button
              value="fr"
              onClick={onLanguageChange}
              variant="contained"
              color="primary"
            >
              Français
            </Button>
            <Button
              value="es"
              onClick={onLanguageChange}
              variant="contained"
              color="primary"
            >
              Español
            </Button>
          </div>
        )}
        {newAvatar && (
          <div className="d-flex justify-content-center mt-3">
            <div
              id="carouselExampleControls"
              className="carousel slide w-50 "
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/person/avatar1.png"
                    className="d-block w-100"
                    alt="..."
                    onClick={(e) => {
                      setImageUser(e.target.src);
                      profilePicture.current.src = e.target.src;
                    }}
                  />
                </div>
                {avatars.map((avatar) => {
                  return (
                    <div className="carousel-item ">
                      <img
                        src={`/person/${avatar}`}
                        className="d-block w-100"
                        alt="..."
                        onClick={(e) => {
                          setImageUser(e.target.src);
                          profilePicture.current.src = e.target.src;
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </button>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                }}
              >
                <Button
                  onClick={() => onUpdateImage()}
                  variant="contained"
                  color="primary"
                >
                  {t("profile.save")}
                </Button>

                <Button
                  onClick={() => setNewAvatar(false)}
                  variant="contained"
                  color="primary"
                >
                  {t("profile.cancel")}
                </Button>
              </Grid>
            </div>
          </div>
        )}

        <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/dashboard">
            <KeyboardReturnIcon />
          </Link>
        </Grid>
      </Card>
    </Container>
  );
}
