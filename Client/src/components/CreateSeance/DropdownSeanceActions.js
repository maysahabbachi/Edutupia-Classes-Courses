import React from "react";
import EditSeance from "../EditSeance/EditSeance";
import DeleteSeance from "./DeleteSeance";

export default function DropdownSeanceActions(props) {
  return (
    <>
      {/*begin::Naviigation*/}
      <ul className="navi">
        {/* <li className="navi-separator mb-3 opacity-70"></li> */}
        <EditSeance></EditSeance>
        <DeleteSeance></DeleteSeance>
      </ul>

      {/*end::Naviigation*/}
    </>
  );
}
