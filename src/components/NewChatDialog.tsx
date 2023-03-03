import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Chat } from "../definitions";
import { useState } from "react";

type NewChatDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddChat: (chat: Chat) => void;
};

const NewChatDialog = ({ open, onClose, onAddChat }: NewChatDialogProps) => {
  const [input, setInput] = useState("");

  const handleAddNewChat = () => {
    const participants = input.split(",");

    onAddChat({ participants });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Start a new chat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add one or more participants, separated by a comma
        </DialogContentText>
        <TextField
          autoFocus
          label="Participants"
          placeholder="e.g. Jeremy, Hannah, etc."
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAddNewChat} disabled={input === ""}>
          Start chat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewChatDialog;
