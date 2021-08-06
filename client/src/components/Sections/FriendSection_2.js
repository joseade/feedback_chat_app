import { useDispatch, useSelector } from "react-redux";
import * as actionsConversations from "../../state/actions/conversations";
import { Grid } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
const FriendsSection = () => {
  const dispatch = useDispatch();
  const { user, socket, userConversations } = useSelector((state) => state);
  const { friends } = user;
  const { onlineUsers } = socket;
  const onlineFriends = friends.filter((friend) =>
    onlineUsers.some((onlineUser) => friend.id === onlineUser.userId)
  );
  const offlineFriends = friends.filter(
    (friend) =>
      !onlineUsers.some((onlineUser) => friend.id === onlineUser.userId)
  );

  const addConversation = (onlineFriend) => {
    const previousConversations = userConversations.conversations.filter(
      (conversation) => {
        if (conversation.members.length < 3) {
          return conversation.members.includes(onlineFriend.id);
        }
      }
    );
    if (previousConversations.length > 0) {
      return;
    }
    const senderId = user.id;
    const receiverId = [onlineFriend.id];
    dispatch(actionsConversations.createConversation(senderId, receiverId));
  };

  return (
    <Grid item xs={3} container direction="column" alignItems="stretch">
      <List
        style={{ position: "relative", overflow: "auto", maxHeight: "90vh" }}
      >
        {onlineFriends.length > 0 &&
          onlineFriends.map((onlineFriend) => {
            const labelId = `checkbox-list-secondary-label-${onlineFriend.id}`;
            return (
              <ListItem
                style={{ border: "1px solid gray", marginBottom: "1px" }}
                onClick={() => addConversation(onlineFriend)}
                key={onlineFriend.id}
                button
              >
                <div className="position-relative">
                  <div
                    className="position-absolute rounded-circle"
                    style={{
                      width: 15,
                      height: 15,
                      top: -25,
                      left: 35,
                      backgroundColor: "limegreen",
                    }}
                  ></div>
                </div>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${onlineFriend.id}`}
                    src={onlineFriend.profilePicture}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={onlineFriend.name} />
              </ListItem>
            );
          })}
        {offlineFriends.length > 0 &&
          offlineFriends.map((offlineFriend) => {
            const labelId = `checkbox-list-secondary-label-${offlineFriend.id}`;
            return (
              <ListItem
                style={{ border: "1px solid gray", marginBottom: "1px" }}
                onClick={() => addConversation(offlineFriend)}
                key={offlineFriend.id}
                button
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${offlineFriend.id}`}
                    src={offlineFriend.profilePicture}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={offlineFriend.name} />
              </ListItem>
            );
          })}
      </List>
    </Grid>
  );
};

export default FriendsSection;
