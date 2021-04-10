import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { getseancesByIdClass, StockURLSeance } from "../redux/Slices/seances";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import SVG from "react-inlinesvg";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { toAbsoluteUrl } from "../_metronic/_helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ListSeances() {
  const classes = useStyles();
  const seances = useSelector((state) => state.seances.classBySeances);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getseancesByIdClass(localStorage.getItem("classURL")));
  }, [localStorage.getItem("classURL"), localStorage.getItem("seanceURL")]);

  const handleURLSeance = (id, name) => {
    dispatch(StockURLSeance(id));
    localStorage.setItem("seanceURL", id);
    localStorage.setItem("seanceName", name);
  };

  return (
    <div>
      {/* <Link
            to={`/listCourses`}
            onClick={() => handleURLSeance(c._id, c.name)}
          >
            <Paper className={classes.root} elevation={3}>
              <Typography variant="h5" component="h3">
                {c.name}
              </Typography>
              <Typography variant="body2">
                <ReactTimeAgo date={c.dateCreation} locale="en-US" />
              </Typography>
            </Paper>
          </Link>
          <Divider /> */}

      <div className="card-body pt-0">
        {seances.map((c, index) => (
          <Link
            to={`/listCourses`}
            onClick={() => handleURLSeance(c._id, c.name)}
          >
            <div className="d-flex align-items-center mb-9 bg-white rounded p-5">
              <span className="svg-icon svg-icon-info mr-5 svg-icon-lg">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
                ></SVG>
              </span>

              <div className="d-flex flex-column flex-grow-1 mr-2">
                <a
                  href="#"
                  className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1"
                ></a>
                {c.name}
                <span className="text-muted font-weight-bold">
                  Modified in{" "}
                  <ReactTimeAgo date={c.dateCreation} locale="en-US" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListSeances;
