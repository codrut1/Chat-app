import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Chat, Conversation, Message, StorageKeys } from "../definitions";
import MessagesContainer from "./chatWindow/MessagesContainer";
import classes from "./styles/ChatWindow.module.css";
import ChangeNameDialog from "./chatWindow/ChangeNameDialog";

type ChatWindowProps = {
  chat?: Chat;
  setChat: (chat: Chat) => void;
};

const ChatWindow = ({ chat, setChat }: ChatWindowProps) => {
  const conversationsFromStorage = localStorage.getItem(
    StorageKeys.CONVERSATIONS
  );

  const [input, setInput] = useState("");
  const [changeNameDialogOpen, setChangeNameDialogOpen] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(() => {
    if (!chat) {
      return null;
    }

    if (conversationsFromStorage) {
      const currentConversation: Conversation = JSON.parse(
        conversationsFromStorage
      ).find(
        (con: Conversation) =>
          con.participants.toString() === chat.participants.toString()
      );

      return (
        currentConversation ?? {
          messages: [],
          participants: chat!.participants,
        }
      );
    } else {
      return {
        messages: [],
        participants: chat!.participants,
      };
    }
  });

  useEffect(() => {
    if (!chat) {
      return;
    }

    if (conversationsFromStorage) {
      const currentConversation: Conversation = JSON.parse(
        conversationsFromStorage
      ).find(
        (con: Conversation) =>
          con.participants.toString() === chat.participants.toString()
      );

      setConversation(
        currentConversation ?? {
          messages: [],
          participants: chat!.participants,
        }
      );
    } else {
      setConversation({
        messages: [],
        participants: chat!.participants,
      });
    }
  }, [chat]);

  const onOpenDialog = () => {
    setChangeNameDialogOpen(true);
  };

  const onCloseDialog = () => {
    setChangeNameDialogOpen(false);
  };

  const handleChangeChatName = (newName: string) => {
    const newChat = { ...chat! };

    newChat.name = newName;

    setChat(newChat);
  };

  const handleOnSendText = () => {
    // create the messages for all participants

    const newMessages: Message[] = [...chat!.participants, "me"].map(
      (p: string) => ({
        sender: p,
        text: p !== "me" ? `${input} ❤️` : input,
        date: new Date(),
      })
    );

    // add the messages to the current conversation and also save them in localStorage
    if (conversation) {
      const newConversation = { ...conversation };
      newConversation.messages = [...newMessages, ...conversation?.messages];

      setConversation(newConversation);

      // change the current conversation stored localStorage

      const allConversations: Conversation[] = conversationsFromStorage
        ? JSON.parse(conversationsFromStorage)
        : [];

      const currentIndex = allConversations.findIndex(
        (con) =>
          con.participants.toString() === conversation.participants.toString()
      );

      if (currentIndex !== -1) {
        allConversations[currentIndex] = newConversation;
      } else {
        allConversations.push(newConversation);
      }

      localStorage.setItem(
        StorageKeys.CONVERSATIONS,
        JSON.stringify(allConversations)
      );
    }

    setInput("");
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter" && input) {
      handleOnSendText();
    }
  };

  return (
    <>
      <Paper elevation={3} className={classes.root}>
        {chat ? (
          <>
            <div className={classes.titleContainer}>
              <Typography variant="h4" fontWeight={700}>
                {chat.name ?? chat.participants.toString()}
              </Typography>
            </div>
            <MessagesContainer conversation={conversation ?? undefined} />
            <div className={classes.bottomContainer}>
              <TextField
                className={classes.textField}
                placeholder="Send a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
              />
              {chat.participants.length > 1 && (
                <Tooltip title="Change conversation's name" placement="top">
                  <IconButton onClick={onOpenDialog}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              <IconButton disabled={input === ""} onClick={handleOnSendText}>
                <SendIcon />
              </IconButton>
            </div>
          </>
        ) : (
          <Typography variant="h5" fontWeight={600}>
            Select a chat or add a new one to start messaging.
          </Typography>
        )}
      </Paper>
      {changeNameDialogOpen && (
        <ChangeNameDialog
          open={changeNameDialogOpen}
          onClose={onCloseDialog}
          onChangeName={handleChangeChatName}
          currentName={chat!.name}
        />
      )}
    </>
  );
};

export default ChatWindow;
