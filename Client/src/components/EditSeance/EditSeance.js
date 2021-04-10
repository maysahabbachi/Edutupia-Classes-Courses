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
import { useLocation } from "react-router";
import { checkIsActive } from "../../_metronic/_helpers";
import { NavLink } from "react-router-dom";
import FormEditSeance from "./FormEditSeance";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

export default function EditSeance(props) {
  const location = useLocation();

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleClickOpen() {
    setOpen(true);
    console.log("true");
  }

  function handleClose() {
    setOpen(false);
    console.log("false");
  }

  return (
    <div>
      <li className="navi-item">
        <a onClick={handleClickOpen} href="#" className="navi-link">
          <span className="navi-icon">
            <i className="flaticon2-edit"></i>
          </span>
          <span className="navi-text">Edit</span>
        </a>
      </li>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add new Class"}
        </DialogTitle>
        <DialogContent>
          <FormEditSeance idClass={props.idClass}></FormEditSeance>
        </DialogContent>
      </Dialog>
    </div>
  );
}
