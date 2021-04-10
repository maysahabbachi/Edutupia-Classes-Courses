/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { Dropdown } from "react-bootstrap";

import { toAbsoluteUrl } from "../_metronic/_helpers";
import {
  DropdownCustomToggler,
  DropdownMenu4,
} from "../_metronic/_partials/dropdowns";
import DropdownSeanceActions from "./CreateSeance/DropdownSeanceActions";

export function CardTest({ className }) {
  return (
    <>
      {/* Header */}

      {/* Body */}
      <div className="card-body pt-0">
        <div className="d-flex align-items-center mb-9 bg-white rounded p-5">
          <span className="svg-icon svg-icon-warning mr-5 svg-icon-lg">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}></SVG>
          </span>

          <div className="d-flex flex-column flex-grow-1 mr-2">
            <a
              href="#"
              className="font-weight-bold text-dark-100 text-hover-primary font-size-lg mb-1"
            ></a>
            {localStorage.getItem("seanceName")}
            <span className="text-muted font-weight-bold">Due in 2 Days</span>
          </div>

          <div className="card-toolbar">
            <Dropdown className="dropdown-inline" alignRight>
              <Dropdown.Toggle
                id="dropdown-toggle-top"
                as={DropdownCustomToggler}
              >
                <i className="ki ki-bold-more-ver" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <DropdownSeanceActions />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
