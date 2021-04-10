import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { AddclassesGroup } from "../../redux/Slices/classesGroup";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));
function FormClassesGroup() {
  const classes = useStyles();
  const [Name, SetName] = useState("");
  const dispatch = useDispatch();
  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

  const addclassesGroup = () => {
    const classesGroup = {
      name: Name,
    };

    dispatch(AddclassesGroup(classesGroup));
  };

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={Name}
          onChange={handleChangeName}
          margin="normal"
          variant="outlined"
          required
        />

        <Button
          onClick={addclassesGroup}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Add
          <AddIcon className={classes.rightIcon} />
        </Button>
      </form>
    </div>
  );
}

export default FormClassesGroup;
