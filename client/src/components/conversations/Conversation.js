import { useDispatch, useSelector } from "react-redux";
import * as actionsChat from "../../state/actions/chat";
import * as actionsConversations from "../../state/actions/conversations";

import MultipleConversations from "./MultipleConversations";
import MultipleConversationsRemove from "./MultipleConversationsRemove";
import { ListItem } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
const Conversation = ({ members, conversation }) => {
  const { user, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { friends } = user;
  const receiver = friends.filter(
    (friend) => members.includes(friend.id) && friend.id !== user.id
  );
  const admin = members[0];
  const isAdmin = admin === user.id;

  const picture =
    conversation.members.length > 2
      ? "/person/group-icon.png"
      : receiver[0].profilePicture;

  const quitConversation = () => {
    dispatch(
      actionsConversations.userQuitsConversation(conversation._id, user.id)
    );
  };
  const friendNames = receiver.map((rec) => rec.name).join(", ");
  const onlineUserNames = socket.onlineUsers.filter(
    (online) =>
      members.includes(online.userId) &&
      !receiver.some((r) => r.id === online.userId) &&
      online.userId !== user.id
  );
  const offlineUserNames = members.filter(
    (member) =>
      !receiver.some((r) => r.id === member) &&
      !onlineUserNames.some((r) => r.userId === member) &&
      member !== user.id
  );
  let names = friendNames;
  if (onlineUserNames.length > 0) {
    names =
      friendNames + ", " + onlineUserNames.map((rec) => rec.name).join(", ");
  }
  if (offlineUserNames.length) {
    names = names + ", " + offlineUserNames.join(",");
  }
  const allFriends =
    names.replace(/ /g, "").replace(/,/g, "").length === friends.length;
  const labelId = `checkbox-list-secondary-label-${conversation._id}`;

  return (
    <>
      <ListItem
        style={{ border: "1px solid gray", marginBottom: "1px" }}
        onClick={() => {
          dispatch(actionsChat.getConversation(conversation));
          dispatch(actionsChat.messagesRequest(conversation));
        }}
        key={conversation._id}
        button
      >
        <ListItemAvatar>
          <Avatar alt={`Avatar n°${conversation._id}`} src={picture} />
        </ListItemAvatar>
        <ListItemText id={labelId} primary={names} />
      </ListItem>
      <div className="mb-3">
        {isAdmin && (
          <div className="d-flex justify-content-end">
            {!allFriends && (
              <MultipleConversations
                members={members}
                conversation={conversation}
              />
            )}

            {conversation.members.length > 2 && (
              <MultipleConversationsRemove
                members={members}
                conversation={conversation}
              />
            )}
          </div>
        )}
        {!isAdmin && (
          <div className="d-flex justify-content-end">
            {conversation.members.length > 2 && (
              <button
                onClick={quitConversation}
                type="button"
                className="btn btn-danger"
              >
                <i className="bi bi-person-dash-fill"></i>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Conversation;
