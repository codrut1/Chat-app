import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import classes from "./styles/Header.module.css";
import AddIcon from "@mui/icons-material/Add";

type HeaderProps = {
  onOpenDialog: () => void;
};

const Header = ({ onOpenDialog }: HeaderProps) => {
  return (
    <div className={classes.root}>
      <Typography variant="h2">Welcome to the chat application!</Typography>
      <Button startIcon={<AddIcon />} onClick={onOpenDialog}>
        New chat
      </Button>
    </div>
  );
};

export default Header;
