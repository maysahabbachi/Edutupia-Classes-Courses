import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { IconButton, MenuItem } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { makeStyles } from "@material-ui/core/styles";

import FormEditClassesGroup from "./FormEditClassesGroup";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

export default function EditCLassesGroup(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleClickOpen() {
    console.log(props.idGroup);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        className={classes.button}
        aria-label="Edit"
      >
        <EditIcon />
      </IconButton>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Edit Class Groupes"}
        </DialogTitle>
        <DialogContent>
          <FormEditClassesGroup idGroup={props.idGroup}></FormEditClassesGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
