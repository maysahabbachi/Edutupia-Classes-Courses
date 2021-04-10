import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { DeleteclassesGroup } from "../../redux/Slices/classesGroup";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DeleteclassGroup(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const DeleteClass = () => {
    dispatch(DeleteclassesGroup(props.idGroup)).then(() => {
      setOpen(false);
    });
  };

  return (
    <div>
      <IconButton
        className={classes.button}
        onClick={handleClickOpen}
        aria-label="Delete"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirme Delete Groupe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            We need to confirm that you are sure to delete this group with name
            : {props.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Discard
          </Button>
          <Button onClick={DeleteClass} color="primary">
            Confirme Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
