import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";

import {
  EditclassesGroup,
  GetclassesGroupById,
} from "../../redux/Slices/classesGroup";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

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

function FormEditClassesGroup(props) {
  const classes = useStyles();
  const [Name, SetName] = useState("");

  const dispatch = useDispatch();
  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    dispatch(GetclassesGroupById(props.idGroup)).then((response) => {
      console.log(response);
      SetName(response.payload.name);
    });
  }, [props.idGroup]);

  const Editclasses = () => {
    const EditedClass = {
      name: Name,
      _id: props.idGroup,
    };

    dispatch(EditclassesGroup(EditedClass));
  };

  return (
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
        onClick={Editclasses}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Edit
        <EditIcon className={classes.rightIcon} />
      </Button>
    </form>
  );
}

export default FormEditClassesGroup;
