import CanvasDraw from "react-canvas-draw";
import TimeAgo from "react-timeago";
import { List } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { Grid } from "@material-ui/core";
const MessageSender = ({ message, userPicture }) => {
  const drawing = message.text.includes("brushRadius");
  const labelId = `checkbox-list-secondary-label-${message._id}`;

  return (
    <>
      <List
        style={{
          display: "flex",
          justifyContent: "flex-end",
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
          <ListItemAvatar>
            <Avatar alt={`Avatar n°${message._id}`} src={userPicture} />
          </ListItemAvatar>
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
                backgroundColor: "lightgray",
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
          justifyContent: "flex-end",
          paddingRight: "16px",
        }}
      >
        <TimeAgo date={message.createdAt} minPeriod={30} />
      </Grid>
    </>
  );
};

export default MessageSender;
