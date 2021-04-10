import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Editclasses,
  GetClaseesById,
  getClassesByIdGroup,
} from "../../redux/Slices/classes";
import {
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import { getclassesGroup } from "../../redux/Slices/classesGroup";
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
function FormEditClass(props) {
  const classes = useStyles();
  const [Name, SetName] = useState("");
  const [Section, SetSection] = useState("");
  const groupes = useSelector((state) => state.classesGroup.list);

  const dispatch = useDispatch();
  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

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

  useEffect(() => {
    dispatch(GetClaseesById(props.idClass)).then((response) => {
      console.log(response);
      SetName(response.payload.name);
      SetSection(response.payload.section);
      SetSelectedItem(response.payload.idGroup);
    });
    dispatch(getclassesGroup());
  }, [dispatch]);

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    await console.log(selectedItem);
  };

  const handleChangeSection = (e) => {
    SetSection(e.target.value);
    console.log(e.target.value);
  };

  const Editclass = () => {
    const EditedClass = {
      name: Name,
      section: Section,
      _id: props.idClass,
      idGroup: selectedItem,
    };

    dispatch(Editclasses(EditedClass)).then(() => {
      dispatch(getClassesByIdGroup(localStorage.getItem("classGroupURL")));
    });
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
        onClick={Editclass}
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

export default FormEditClass;
