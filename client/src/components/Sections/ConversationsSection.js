import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import * as actions from "../../state/actions/user";
import Conversation from "../conversations/Conversation";

import { Grid } from "@material-ui/core";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const ConversationsSection = () => {
  const classes = useStyles();
  const { user, userConversations } = useSelector((state) => state);
  const { t } = useTranslation();

  const { conversations } = userConversations;
  const [searchUserEmail, setSearchUserEmail] = useState("");
  const dispatch = useDispatch();
  const isSameUser = user.email === searchUserEmail && user.signin;
  const isFriend = user.friends.some((f) => {
    return f.email === searchUserEmail;
  });
  const isFollowing = user.followings.some((f) => f.email === searchUserEmail);

  const searchUser = (e) => {
    e.preventDefault();
    if (
      !(searchUserEmail.indexOf(" ") >= 0) &&
      searchUserEmail !== "" &&
      searchUserEmail !== user.email &&
      !user.followings.some((f) => f.email === searchUserEmail)
    ) {
      dispatch(actions.searchUserRequest(searchUserEmail));
    }
  };

  const friendshipRequest = () => {
    const { id, name, email, profilePicture } = user;
    dispatch(
      actions.sendFollower(
        { id, name, email, profilePicture },
        { id: user.searchUser.id }
      )
    );
    dispatch(actions.followUserRequest(user.searchUser, { userId: user.id }));

    setSearchUserEmail("");
  };

  return (
    <Grid item xs={3} container direction="column" alignItems="stretch">
      <List
        style={{ position: "relative", overflow: "auto", maxHeight: "90vh" }}
      >
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder={t("conversations.search")}
            inputProps={{ "aria-label": "search google maps" }}
            onChange={({ currentTarget }) => {
              setSearchUserEmail(currentTarget.value);
              dispatch(actions.deleteErrors());
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && user.errors.length > 0) {
                dispatch(actions.deleteErrors());
              }
              if (
                (e.ctrlKey && e.key === "z") ||
                (e.metaKey && e.key === "z")
              ) {
                dispatch(actions.deleteErrors());
              }
            }}
            value={searchUserEmail}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={(e) => searchUser(e)}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        <div className="mt-3 mb-3">
          {user.searchUser && (
            <div className="col-12">
              <div>{`${t("navbar.friendship")} ${user.searchUser.name} ?`}</div>
              <button
                className="col-6 btn btn-success"
                onClick={friendshipRequest}
              >
                <i className="bi bi-check-circle"></i>
              </button>
              <button
                className="col-6 btn btn-danger"
                onClick={() => {
                  dispatch({
                    type: actions.Types.FOLLOW_USER_ERROR,
                    payload: [],
                  });
                }}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            </div>
          )}

          {isSameUser && (
            <Grid
              item
              style={{
                backgroundColor: "orange",
                paddingLeft: "10px",
                marginTop: "10px",
              }}
            >
              {t("conversations.error.same.user")}
            </Grid>
          )}
          {isFriend ? (
            <Grid
              item
              style={{
                backgroundColor: "orange",
                paddingLeft: "10px",
                marginTop: "10px",
              }}
            >
              {t("conversations.error.friends")}
            </Grid>
          ) : (
            <Grid
              item
              style={{
                backgroundColor: "orange",
                paddingLeft: "10px",
                marginTop: "10px",
              }}
            >
              {isFollowing && <>{t("conversations.error.follower")}</>}
            </Grid>
          )}
          {user.errors.length > 0 && (
            <Grid
              item
              style={{
                backgroundColor: "orange",
                paddingLeft: "10px",
                marginTop: "10px",
              }}
            >
              {t("conversations.error.not.user")}
            </Grid>
          )}
        </div>

        {conversations.map((conversation) => {
          return (
            <Conversation
              key={conversation._id}
              members={conversation.members}
              conversation={conversation}
            />
          );
        })}
      </List>
    </Grid>
  );
};

export default ConversationsSection;
