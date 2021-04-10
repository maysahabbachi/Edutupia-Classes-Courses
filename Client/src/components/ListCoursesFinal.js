/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import SVG from "react-inlinesvg";
import { useDispatch, useSelector } from "react-redux";
import { RetrieveCoursesByIdSeance } from "../redux/Slices/courses";
import { toAbsoluteUrl } from "../_metronic/_helpers";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import { Tooltip } from "@material-ui/core";
import { Dropdown, Image, OverlayTrigger } from "react-bootstrap";
import {
  DropdownCustomToggler,
  DropdownMenu3,
} from "../_metronic/_partials/dropdowns";
import DropdownActions from "./DropdownActions";

export default function ListCoursesFinal({ className }) {
  const courses = useSelector((state) => state.courses.coursesBySeance);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RetrieveCoursesByIdSeance(localStorage.getItem("seanceURL")));
  }, [localStorage.getItem("seanceURL")]);

  return (
    <>
      <div className="row">
        {courses.map((c, index) => (
          <div className="col-xl-4">
            <div className={`card card-custom ${className}`}>
              {/* begin::Body */}
              <div className="card-body d-flex flex-column">
                <div className="flex-grow-1 pb-5">
                  {/* begin::Info */}
                  <div className="d-flex align-items-center pr-2 mb-6">
                    <span className="text-muted font-weight-bold font-size-lg flex-grow-1">
                      <ReactTimeAgo date={c.dateCreation} locale="en-US" />
                    </span>

                    <div className="card-toolbar">
                      <Dropdown className="dropdown-inline" alignRight>
                        <Dropdown.Toggle
                          id="dropdown-toggle-top"
                          as={DropdownCustomToggler}
                        >
                          <i className="ki ki-bold-more-ver" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                          <DropdownActions idCourses={c._id} name={c.name} />
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  {/* end::Info */}

                  {/* begin::Link */}
                  <a
                    href="#"
                    className="text-dark font-weight-bolder text-hover-primary font-size-h4"
                  >
                    {c.name}
                  </a>
                  {/* end::Link */}

                  {/* begin::Desc */}
                  <p className="text-dark-50 font-weight-normal font-size-lg mt-6">
                    {c.description}
                  </p>
                  {/* end::Desc */}
                </div>
                {/* begin::Team */}
                <div className="d-flex align-items-center">
                  {/* begin::Pic */}
                  {c.files.map((f, index) => (
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
                  ))}
                </div>
                {/* end::Team */}
              </div>
              {/* end::Body */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
