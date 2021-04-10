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

import {
  DeleteCourses,
  RetrieveCoursesByIdSeance,
} from "../../redux/Slices/courses";
import { Deleteseances, getseancesByIdClass } from "../../redux/Slices/seances";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
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

export default function DeleteSeance(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log("true");
  };

  const handleClose = () => {
    setOpen(false);
    console.log("false");
  };
  const DeleteSeance = () => {
    dispatch(Deleteseances(localStorage.getItem("seanceURL"))).then(() => {
      dispatch(getseancesByIdClass(localStorage.getItem("classURL")));
      setOpen(false);
    });
  };

  return (
    <>
      <li className="navi-item">
        <a onClick={handleClickOpen} href="#" className="navi-link">
          <span className="navi-icon">
            <i className="navi-icon flaticon2-delete"></i>
          </span>
          <span className="navi-text">Delete</span>
        </a>
      </li>
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
            : <strong>{localStorage.getItem("seanceName")}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Discard
          </Button>
          <Link to="/insideClass">
            <Button onClick={DeleteSeance} color="primary">
              Confirme Delete
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
