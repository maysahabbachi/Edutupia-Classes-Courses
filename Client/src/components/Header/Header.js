import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Apps } from "@material-ui/icons";
import React from "react";
import { Dropdown } from "semantic-ui-react";
import CreateClass from "../CreateClass/CreateClass";
import CreateClassesGroup from "../CreateClassesGroup/CreateClassesGroup";
import CreateSeance from "../CreateSeance/CreateSeance";
import CreateCourses from "../CreateCourses/CreateCourses";

import { Link } from "react-router-dom";

import { useStyles } from "./style";

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            <img
              src={process.env.PUBLIC_URL + "edutopia.PNG"}
              style={{
                margin: "2px",
                height: "40px",
                width: "60px",
              }}
              alt="Classroom1"
            />
            <Link to="/">
              <Typography variant="h6" className={classes.title}>
                Edutopia
              </Typography>
            </Link>
          </div>
          <div className={classes.header__wrapper__right}>
            <Dropdown icon="add" floating className="icon" >
              <Dropdown.Menu>
                <Dropdown.Header icon="" content="" />
                <Dropdown.Divider />

                <CreateClassesGroup></CreateClassesGroup>
                <CreateClass></CreateClass>
                <CreateSeance></CreateSeance>
                <CreateCourses></CreateCourses>
              </Dropdown.Menu>
            </Dropdown>

           

            <Apps className={classes.icon} />

            <Menu id="simple-menu" keepMounted>
              <MenuItem>Join Classes</MenuItem>
              <MenuItem>Add Classes</MenuItem>
            </Menu>
            <div>
              <Avatar className={classes.icon} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
