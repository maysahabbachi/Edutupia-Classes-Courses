import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

import { useDispatch, useSelector } from "react-redux";
import { getclassesGroup } from "../redux/Slices/classesGroup";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";
import EditCLassesGroup from "./EditCLassesGroup/EditCLassesGroup";
import DeleteclassGroup from "./CreateClassesGroup/DeleteclassGroup";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ListCLassesGroup() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const classesGroup = useSelector((state) => state.classesGroup.list);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getclassesGroup());
  }, [dispatch]);

  const handleURL = (id) => {
    localStorage.setItem("classGroupURL", id);
  };

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <>
      <Grid container spacing={3}>
        {classesGroup.map((c, index) => (
          <Grid item xs={3}>
            <Card className={classes.card} key={index}>
              <Link onClick={() => handleURL(c._id)} to="/classes">
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://myviewboard.com/blog/wp-content/uploads/2020/05/How-to-Maintain-Student-Engagement-in-a-Virtual-Classroom.jpg"
                    title="Contemplative Reptile"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {c.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <DeleteclassGroup
                  idGroup={c._id}
                  name={c.name}
                ></DeleteclassGroup>
                <EditCLassesGroup
                  idGroup={c._id}
                  name={c.name}
                ></EditCLassesGroup>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
