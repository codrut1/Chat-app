import { useState } from "react";
import classes from "./App.module.css";
import ChatsList from "./components/ChatsList";
import ChatWindow from "./components/ChatWindow";
import Header from "./components/Header";
import NewChatDialog from "./components/NewChatDialog";
import { Chat, StorageKeys } from "./definitions";

function App() {
  const chatsFromStorage = localStorage.getItem(StorageKeys.CHATS);

  const [newChatDialogOpen, setNewChatDialogOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>(
    chatsFromStorage ? JSON.parse(chatsFromStorage) : []
  );
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const closeDialog = () => {
    setNewChatDialogOpen(false);
  };

  const openDialog = () => {
    setNewChatDialogOpen(true);
  };

  const addChat = (chat: Chat) => {
    // check to see if there is already another chat with these participants

    if (
      !chats.find(
        (ch) => ch.participants.toString() === chat.participants.toString()
      )
    ) {
      setChats([chat, ...chats]);
      localStorage.setItem(StorageKeys.CHATS, JSON.stringify([chat, ...chats]));
    }

    setCurrentChat(chat);
  };

  const handleChangeCurrentChat = (newChat: Chat) => {
    setCurrentChat(newChat);

    const index = chats.findIndex(
      (ch) => ch.participants.toString() === newChat.participants.toString()
    );

    const chatsCopy = [...chats];
    chatsCopy[index] = newChat;

    setChats(chatsCopy);
    localStorage.setItem(StorageKeys.CHATS, JSON.stringify(chatsCopy));
  };

  return (
    <>
      <div className={classes.root}>
        <Header onOpenDialog={openDialog} />
        <div className={classes.lowerContainer}>
          <ChatsList
            chats={chats}
            currentChat={currentChat ?? undefined}
            setCurrentChat={setCurrentChat}
          />
          <ChatWindow
            chat={currentChat ?? undefined}
            setChat={handleChangeCurrentChat}
          />
        </div>
      </div>
      {newChatDialogOpen && (
        <NewChatDialog
          open={newChatDialogOpen}
          onClose={closeDialog}
          onAddChat={addChat}
        />
      )}
    </>
  );
}

export default App;
