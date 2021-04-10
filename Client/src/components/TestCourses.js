/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../_metronic/_helpers";

export function TestCourses({ className }) {
  return (
    <div className={`card card-custom ${className}`}>
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
                  authors
                </th>
                <th style={{ minWidth: "200px" }} />

                <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                  action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="pr-0">
                  <div className="symbol symbol-50 symbol-light mt-1">
                    <span className="symbol-label">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/avatars/001-boy.svg")}
                        className="h-75 align-self-end"
                      ></SVG>
                    </span>
                  </div>
                </td>
                <td className="pl-0">
                  <a
                    href="#"
                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    Brad Simmons
                  </a>
                  <span className="text-muted font-weight-bold text-muted d-block">
                    HTML, JS, ReactJS
                  </span>
                </td>

                <td className="pr-0 text-right">
                  <a
                    href="#"
                    className="btn btn-icon btn-light btn-hover-primary btn-sm"
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
            </tbody>
          </table>
        </div>
        {/* end::Table */}
      </div>
      {/* end::Body */}
    </div>
  );
}
