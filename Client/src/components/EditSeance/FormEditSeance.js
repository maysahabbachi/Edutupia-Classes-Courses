import {
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getClasses } from "../../redux/Slices/classes";

import {
  Editseances,
  GetSeancesById,
  getseancesByIdClass,
} from "../../redux/Slices/seances";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

function FormEditSeance(props) {
  const { id } = useParams();
  const [Name, SetName] = useState("");

  const classes = useSelector((state) => state.classes.list);

  const dispatch = useDispatch();
  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

  const [selectedItem, SetSelectedItem] = useState(0);
  const ClassesOptions = [{ key: Number, text: "", value: "" }];

  for (let i = 0; i < classes.length; i++) {
    const option = {
      key: classes[i]._id,
      text: classes[i].name,
      value: classes[i].name,
    };

    ClassesOptions.push(option);
  }

  useEffect(() => {
    dispatch(GetSeancesById(localStorage.getItem("seanceURL"))).then(
      (response) => {
        console.log(response);
        SetName(response.payload.name);
        console.log(response.payload.idClasses);
        SetSelectedItem(response.payload.idClasses);
      }
    );
    dispatch(getClasses());
  }, [localStorage.getItem("seanceURL")]);

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    await console.log(selectedItem);
  };

  const EditSeances = () => {
    const EditedSeance = {
      name: Name,
      _id: localStorage.getItem("seanceURL"),
      idClasses: selectedItem,
    };

    dispatch(Editseances(EditedSeance)).then(() => {
      dispatch(getseancesByIdClass(localStorage.getItem("classURL")));
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
      <Link to="/insideClass">
        <Button
          onClick={EditSeances}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Edit
          <EditIcon className={classes.rightIcon} />
        </Button>
      </Link>
    </form>
  );
}

export default FormEditSeance;
