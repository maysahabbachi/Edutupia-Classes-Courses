import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { Route, useParams } from "react-router";

import ListCourses from "./ListCourses";
import ListSeances from "./ListSeances";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
function InsideClass() {
  const classes = useStyles();
  const { idClass } = useParams();
  return (
    <div>
      {/* <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <ListSeances></ListSeances>
          </Grid.Column>
          <Grid.Column width={13}>
            <Route path={"/listCourses"}>
              <ListCourses idClass={idClass}></ListCourses>
            </Route>
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={3}>
            <ListSeances></ListSeances>
          </Grid>
          <Grid item xs={9}>
            <Route path={"/listCourses"}>
              <ListCourses idClass={idClass}></ListCourses>
            </Route>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default InsideClass;
