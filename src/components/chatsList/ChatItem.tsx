import { Chat } from "../../definitions";
import classes from "./styles/ChatItem.module.css";
import { Typography } from "@mui/material";
import classNames from "classnames";

type ChatItemProps = {
  chat: Chat;
  isActive: boolean;
  onClick: (chat: Chat) => void;
};

const ChatItem = ({ chat, isActive, onClick }: ChatItemProps) => {
  const handleOnClick = () => {
    onClick(chat);
  };

  return (
    <div
      className={classNames(classes.root, isActive && classes.active)}
      onClick={handleOnClick}
    >
      <Typography variant="h5" fontWeight={600}>
        {chat.name ?? chat.participants.toString()}
      </Typography>
    </div>
  );
};

export default ChatItem;
