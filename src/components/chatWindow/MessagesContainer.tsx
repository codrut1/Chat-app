import { Typography } from "@mui/material";
import { Conversation } from "../../definitions";
import MessageBox from "./MessageBox";
import classes from "./styles/MessagesContainer.module.css";

type MessagesContainerProps = {
  conversation?: Conversation;
};

const MessagesContainer = ({ conversation }: MessagesContainerProps) => {
  return (
    <div className={classes.root}>
      {conversation && conversation.messages.length > 0 ? (
        conversation.messages.map((message, index) => (
          <MessageBox key={index} message={message} />
        ))
      ) : (
        <Typography variant="h6">There are no messages yet.</Typography>
      )}
    </div>
  );
};

export default MessagesContainer;
