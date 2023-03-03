import classNames from "classnames";
import { Message } from "../../definitions";
import classes from "./styles/MessageBox.module.css";
import { Typography } from "@mui/material";

type MessageBoxProps = {
  message: Message;
};

const MessageBox = ({ message }: MessageBoxProps) => {
  return (
    <div
      className={classNames(
        classes.root,
        message.sender === "me" ? classes.rootMe : classes.rootOther
      )}
    >
      <div
        className={classNames(
          classes.messageContainer,
          message.sender === "me"
            ? classes.messageContainerMe
            : classes.messageContainerOther
        )}
      >
        <div className={classes.messageHeader}>
          <Typography fontSize={14} fontWeight={500} style={{marginRight: "8px"}}>
            {message.sender}
          </Typography>
          <Typography fontSize={12}>{`${new Date(
            message.date
          ).getHours()}:${new Date(message.date).getMinutes()}`}</Typography>
        </div>
        <Typography>{message.text}</Typography>
      </div>
    </div>
  );
};

export default MessageBox;
