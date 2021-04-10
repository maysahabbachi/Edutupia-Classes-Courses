import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteResources,
  GetCoursesById,
  RetrieveCoursesByIdSeance,
  UpdateCourses,
  UpdateResources,
} from "../../redux/Slices/courses";
import SVG from "react-inlinesvg";

import { getSeances } from "../../redux/Slices/seances";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { TestCourses } from "../TestCourses";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
export default function FormEditCourses(props) {
  const [Name, SetName] = useState("");
  const [Description, SetDescription] = useState("");
  const courses = useSelector((state) => state.seances.list);
  const [files, setFiles] = useState([]);
  const Resources = useSelector((state) => state.courses.Resources);
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeances());
    const test = dispatch(GetCoursesById(props.idCourses)).then((response) => {
      console.log(response);
      SetName(response.payload.name);
      SetDescription(response.payload.description);
      SetSelectedItem(response.payload.idSeances);
      setFiles(response.payload.files);
    });
    console.log(files);
  }, [dispatch]);

  const handleChangeName = (e) => {
    SetName(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeDescription = (e) => {
    SetDescription(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    // await console.log(selectedItem);
  };

  const EditCourses = (e) => {
    e.preventDefault();

    dispatch(
      UpdateCourses(props.idCourses, Name, Description, Resources, selectedItem)
    ).then(() => {
      dispatch(RetrieveCoursesByIdSeance(localStorage.getItem("seanceURL")));
    });
  };

  const handleRemoveUpload = (e, res) => {
    console.log(res);
    dispatch(DeleteResources(res));
    console.log("Trigger remove photo");
    console.log(Resources);
  };

  const handleChangeStatus = async ({ meta, file }, status) => {
    console.log(status, meta, file);

    if (status === "done") {
      var formData = new FormData();
      formData.append("files", file);
      await Axios.post("http://localhost:5000/course/upload", formData).then(
        (response) => {
          console.log(response.data.result.reqFiles[0]);
          dispatch(UpdateResources(response.data.result.reqFiles[0]));
        }
      );
      console.log("Trigger update photo");
      console.log(Resources);
    }
    if (status === "removed") {
      let files = files.slice();
      files = files.filter((u) => {
        return u !== file;
      });
      setFiles(files);
    }
  };

  const Preview = ({ meta }) => {
    const { name, percent, status } = meta;
    return <span></span>;
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

        <Dropzone
          inputContent="Drop Files here or click to choose ..."
          onChangeStatus={handleChangeStatus}
          canCancel={false}
          canRemove={false}
          canRestart={false}
          PreviewComponent={Preview}
        />

        <div className={`card card-custom card-stretch gutter-b`}>
          {/* begin::Header */}

          {/* end::Header */}

          {/* begin::Body */}
          <div className="card-body py-0">
            {/* begin::Table */}
            <div className="table-responsive">
              <table
                className="table table-head-custom table-vertical-center"
                id="kt_advance_table_widget_1"
              >
                <thead>
                  <tr className="text-left">
                    <th className="pr-0" style={{ width: "50px" }}>
                      Files
                    </th>
                    <th style={{ minWidth: "200px" }} />

                    <th
                      className="pr-0 text-right"
                      style={{ minWidth: "150px" }}
                    >
                      action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Resources.map((f, index) => (
                    <tr>
                      <td className="pr-0">
                        <div className="symbol symbol-50 symbol-light mt-1">
                          <a href={f} target="_blank" rel="noopener noreferrer">
                            {f.split(".").pop() === "png" ||
                            f.split(".").pop() === "jpg" ||
                            f.split(".").pop() === "jpeg" ||
                            f.split(".").pop() === "gif" ? (
                              <div>
                                <Image
                                  style={{
                                    margin: "2px",
                                    height: "50px",
                                    width: "50px",
                                  }}
                                  src={f}
                                  className="h-75 align-self-end"
                                  thumbnail
                                />
                              </div>
                            ) : f.split(".").pop() === "doc" ||
                              f.split(".").pop() === "pdf" ||
                              f.split(".").pop() === "css" ||
                              f.split(".").pop() === "csv" ||
                              f.split(".").pop() === "html" ||
                              f.split(".").pop() === "js" ||
                              f.split(".").pop() === "xml" ||
                              f.split(".").pop() === "mp4" ||
                              f.split(".").pop() === "zip" ? (
                              <div>
                                <SVG
                                  style={{
                                    margin: "2px",
                                    height: "50px",
                                    width: "50px",
                                  }}
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/media/svg/files/" +
                                    f.split(".").pop() +
                                    ".svg"
                                  }
                                  className="h-75 align-self-end"
                                ></SVG>
                              </div>
                            ) : (
                              <div>
                                <SVG
                                  style={{
                                    margin: "2px",
                                    height: "50px",
                                    width: "50px",
                                  }}
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/media/svg/icons/Files/Deleted-file.svg"
                                  }
                                  className="h-75 align-self-end"
                                ></SVG>
                              </div>
                            )}
                          </a>
                        </div>
                      </td>
                      <td className="pl-0">
                        <a
                          href="#"
                          className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                        >
                          {f.split("-").pop()}
                        </a>
                        <span className="text-muted font-weight-bold text-muted d-block">
                          {f.split(".").pop()} File
                        </span>
                      </td>

                      <td className="pr-0 text-right">
                        <a
                          href="#"
                          className="btn btn-icon btn-light btn-hover-primary btn-sm"
                          onClick={(e) => {
                            handleRemoveUpload(e, f);
                          }}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG
                              src={toAbsoluteUrl(
                                "/media/svg/icons/General/Trash.svg"
                              )}
                            ></SVG>
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Body */}
        </div>

        <br />
        <Button
          variant="primary"
          type="submit"
          position="right"
          onClick={EditCourses}
        >
          Add
        </Button>
      </Form>
    </div>
  );
}
