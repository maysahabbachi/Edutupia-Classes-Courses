import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassesByIdGroup } from "../redux/Slices/classes";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

import {
  Avatar,
  Box,
  CardHeader,
  Grid,
  GridList,
  IconButton,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteClass from "./CreateClass/DeleteClass";
import EditCLass from "./EditClass/EditCLass";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  avatar: {
    backgroundColor: red[500],
  },
});
function ListClasses() {
  const Listclasses = useSelector((state) => state.classes.classByGroup);

  console.log(Listclasses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClassesByIdGroup(localStorage.getItem("classGroupURL")));
  }, [localStorage.getItem("classGroupURL")]);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  const handleURLClass = (idClass) => {
    localStorage.setItem("classURL", idClass);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {Listclasses.map((c, index) => (
          <Grid item xs={3}>
            <Card className={classes.card} key={index}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="Recipe"
                    className={classes.avatar}
                  ></Avatar>
                }
                action={
                  <>
                    <GridList cellHeight={150} className={classes.gridList}>
                      <EditCLass idClass={c._id}></EditCLass>
                      <DeleteClass idClass={c._id} name={c.name}></DeleteClass>
                    </GridList>
                  </>
                }
                subheader={
                  <ReactTimeAgo date={c.dateCreation} locale="en-US" />
                }
              />
              <Link onClick={() => handleURLClass(c._id)} to="/insideClass">
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://teamtelefoon.nl/wp-content/uploads/sites/5/2020/03/E-Learning_Illustratie.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {c.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {c.section}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListClasses;
