import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

type ChangeNameDialogProps = {
  open: boolean;
  onClose: () => void;
  onChangeName: (name: string) => void;
  currentName?: string;
};

const ChangeNameDialog = ({
  open,
  onClose,
  onChangeName,
  currentName,
}: ChangeNameDialogProps) => {
  const [input, setInput] = useState(currentName ?? "");

  const handleChangeName = () => {
    onChangeName(input);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change this conversation's name</DialogTitle>
      <DialogContent>
        <DialogContentText>Type the new name below</DialogContentText>
        <TextField
          autoFocus
          label="Name"
          placeholder="e.g. New conversation"
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
        <Button onClick={handleChangeName} disabled={input === ""}>
          Change name
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeNameDialog;
