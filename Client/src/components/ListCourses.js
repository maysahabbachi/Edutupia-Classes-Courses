import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Popper,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

import EditIcon from "@material-ui/icons/Edit";
import DeleteSeance from "./CreateSeance/DeleteSeance";
import EditSeance from "./EditSeance/EditSeance";
import ListCoursesFinal from "./ListCoursesFinal";
import DeleteIcon from "@material-ui/icons/Delete";
import { CardTest } from "./CardTest";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ListCourses(props) {
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {}, [id]);
  return (
    <div>
      {/* <Grid>
        <Grid.Row>
          <Grid.Column width={14}>
            <Divider horizontal>{localStorage.getItem("seanceName")}</Divider>
          </Grid.Column>
          <Grid.Column width={2}>
            <Dropdown icon="add" floating className="icon">
              <Dropdown.Menu>
                <Dropdown.Divider />

                <DeleteSeance></DeleteSeance>
                <EditSeance></EditSeance>
              </Dropdown.Menu>
            </Dropdown>
            <ListCoursesFinal></ListCoursesFinal>
          </Grid.Column>
        </Grid.Row>
      </Grid> */}

      <CardTest></CardTest>

      <ListCoursesFinal className="card-stretch gutter-b"></ListCoursesFinal>
    </div>
  );
}

export default ListCourses;
