import {
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Addclasses, getClassesByIdGroup } from "../../redux/Slices/classes";
import { getclassesGroup } from "../../redux/Slices/classesGroup";
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

function FormClass() {
  const classes = useStyles();
  const [Name, SetName] = useState("");
  const [Section, SetSection] = useState("");
  const groupes = useSelector((state) => state.classesGroup.list);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getclassesGroup());
  }, [dispatch]);
  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };
  const [labelWidth, setLabelWidth] = React.useState(0);

  const [selectedItem, SetSelectedItem] = useState(0);
  const ClassesOptions = [{ key: Number, text: "", value: "" }];

  for (let i = 0; i < groupes.length; i++) {
    const option = {
      key: groupes[i]._id,
      text: groupes[i].name,
      value: groupes[i].name,
    };

    ClassesOptions.push(option);
  }

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    await console.log(selectedItem);
  };

  const handleChangeSection = (e) => {
    SetSection(e.target.value);
    console.log(e.target.value);
  };

  const addclass = () => {
    const classes = {
      name: Name,
      section: Section,
      idGroup: selectedItem,
    };

    dispatch(Addclasses(classes)).then(() => {
      dispatch(getClassesByIdGroup(localStorage.getItem("classGroupURL")));
    });
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

        <Select
          value={selectedItem}
          onChange={handleChangeSelect}
          input={<OutlinedInput name="Groupe" id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {ClassesOptions.map((c, index) => (
            <MenuItem key={index} value={c.key}>
              {c.text}
            </MenuItem>
          ))}
        </Select>

        <TextField
          id="outlined-name"
          label="Section"
          className={classes.textField}
          value={Section}
          onChange={handleChangeSection}
          margin="normal"
          variant="outlined"
          required
        />

        <Button
          onClick={addclass}
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

export default FormClass;
