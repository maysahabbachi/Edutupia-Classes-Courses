import React from "react";
import DeleteCoursesModal from "./CreateCourses/DeleteCoursesModal";
import EditCourses from "./EditCourses/EditCourses";

export default function DropDownActions(props) {
  return (
    <>
      {/*begin::Naviigation*/}
      <ul className="navi">
        {/* <li className="navi-separator mb-3 opacity-70"></li> */}
        <EditCourses idCourses={props.idCourses}></EditCourses>

        <DeleteCoursesModal
          name={props.name}
          idCourses={props.idCourses}
        ></DeleteCoursesModal>
      </ul>
      {/*end::Naviigation*/}
    </>
  );
}
