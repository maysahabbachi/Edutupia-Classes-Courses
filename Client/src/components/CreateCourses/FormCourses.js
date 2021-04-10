import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

import {
  AddCourses,
  RetrieveCoursesByIdSeance,
} from "../../redux/Slices/courses";
import { getSeances } from "../../redux/Slices/seances";
import { Button, Form } from "react-bootstrap";

function FormCourses() {
  const [Name, SetName] = useState("");
  const [Description, SetDescription] = useState("");
  const courses = useSelector((state) => state.seances.list);
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeances());
  }, [dispatch]);

  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeDescription = (e) => {
    SetDescription(e.target.value);
    console.log(e.target.value);
  };

  const [selectedItem, SetSelectedItem] = useState(0);
  const CoursesOptions = [{ key: Number, text: "", value: "" }];

  for (let i = 0; i < courses.length; i++) {
    const option = {
      key: courses[i]._id,
      text: courses[i].name,
      value: courses[i].name,
    };

    CoursesOptions.push(option);
  }

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    // await console.log(selectedItem);
  };

  const addcourse = (e) => {
    e.preventDefault();

    dispatch(AddCourses(selectedItem, Name, Description, files)).then(() => {
      dispatch(RetrieveCoursesByIdSeance(localStorage.getItem("seanceURL")));
    });
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);

    if (status === "done") {
      setFiles(files.concat(file));
      console.log(files);
    }
    if (status === "removed") {
      let multiple_resource = files.slice();
      multiple_resource = files.filter((u) => {
        return u !== file;
      });
      setFiles(multiple_resource);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name of Class here ..."
            required
            value={Name}
            onChange={handleChangeName}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Select a Seance of this Class</Form.Label>
          <Form.Control
            as="select"
            value={selectedItem}
            onChange={handleChangeSelect}
            placeholder="Seance List"
          >
            {CoursesOptions.map((c, index) => (
              <option key={index} value={c.key}>
                {c.value}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="your Description here ..."
            value={Description}
            onChange={handleChangeDescription}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDropezone">
          <Form.Label>Choose you files</Form.Label>
          <Dropzone
            styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
            canCancel={true}
            canRemove={true}
            canRestart={true}
            onChangeStatus={handleChangeStatus}
          />
        </Form.Group>
        <br />
        <Button
          variant="primary"
          type="submit"
          position="right"
          onClick={addcourse}
        >
          Add
        </Button>
      </Form>
    </div>
  );
}

export default FormCourses;
