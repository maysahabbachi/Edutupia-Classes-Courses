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
import FormSeance from "./FormSeance";
import { useLocation } from "react-router";
import { checkIsActive, toAbsoluteUrl } from "../../_metronic/_helpers";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

export default function CreateSeance(props) {
  const location = useLocation();
  const bgImage = toAbsoluteUrl("/media/misc/bg-2.jpg");

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };
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
    <>
      <div className="col-6">
        <a
          onClick={handleClickOpen}
          href="#"
          className="d-block py-10 px-5 text-center bg-hover-light border-right"
        >
          <span className="svg-icon svg-icon-3x svg-icon-success">
            <SVG
              src={
                process.env.PUBLIC_URL +
                "/media/svg/icons/Communication/Chat-check.svg"
              }
            ></SVG>
          </span>
          <span className="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1">
            Add Seance
          </span>
          <span className="d-block text-dark-50 font-size-lg">
            Pending Tasks
          </span>
        </a>
      </div>

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
          <FormSeance idGroup={props.idGroup}></FormSeance>
        </DialogContent>
      </Dialog>
    </>
  );
}
