import { useSelector } from "react-redux";
import CanvasDraw from "react-canvas-draw";
import TimeAgo from "react-timeago";
import { List } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const MessageReceiver = ({ message, receiverName, receiverPicture }) => {
  const { socket } = useSelector((state) => state);
  const drawing = message.text.includes("brushRadius");
  const labelId = `checkbox-list-secondary-label-${message._id}`;

  return (
    <>
      <List
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "1px",
        }}
      >
        <ListItem
          style={{
            width: "70%",
          }}
          alignItems="flex-start"
          key={message._id}
        >
          {receiverPicture ? (
            <ListItemAvatar>
              <Avatar alt={`Avatar n°${message._id}`} src={receiverPicture} />
            </ListItemAvatar>
          ) : (
            <>
              {socket.onlineUsers.filter(
                (onlineUser) => onlineUser.userId === message.sender
              ).length > 0 ? (
                <div className="me-2">
                  {
                    socket.onlineUsers.filter(
                      (onlineUser) => onlineUser.userId === message.sender
                    )[0].email
                  }
                </div>
              ) : (
                <div className="me-2">{message.sender}</div>
              )}
            </>
          )}

          {drawing ? (
            <CanvasDraw
              className="overflow-hidden"
              saveData={message.text}
              immediateLoading={true}
              hideGrid={true}
              disabled
              canvasWidth={350}
              canvasHeight={150}
              style={{ position: "relative" }}
            />
          ) : (
            <ListItemText
              style={{
                backgroundColor: "lightblue",
                whiteSpace: "pre-line",
              }}
              id={labelId}
              primary={message.text}
            />
          )}
        </ListItem>
      </List>
      <Grid
        style={{
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "16px",
        }}
      >
        <TimeAgo date={message.createdAt} minPeriod={30} />
      </Grid>
    </>
  );
};

export default MessageReceiver;
