import classes from "./styles/ChatsList.module.css";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Chat } from "../definitions";
import ChatItem from "./chatsList/ChatItem";

type ChatsListProps = {
  chats: Chat[];
  currentChat?: Chat;
  setCurrentChat: (chat: Chat) => void;
};

const ChatsList = ({ chats, currentChat, setCurrentChat }: ChatsListProps) => {
  return (
    <Paper elevation={3} className={classes.root}>
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <ChatItem
            isActive={
              chat.participants.toString() ===
              currentChat?.participants.toString()
            }
            key={index}
            chat={chat}
            onClick={setCurrentChat}
          />
        ))
      ) : (
        <Typography variant="h5" fontWeight={600}>
          You have no chats yet.
        </Typography>
      )}
    </Paper>
  );
};

export default ChatsList;
