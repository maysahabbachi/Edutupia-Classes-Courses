/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import CreateClassesGroup from "../../components/CreateClassesGroup/CreateClassesGroup";
import CreateClass from "../../components/CreateClass/CreateClass";
import CreateSeance from "../../components/CreateSeance/CreateSeance";
import CreateCourses from "../../components/CreateCourses/CreateCourses";
import { Dropdown } from "semantic-ui-react";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import { shallowEqual, useSelector } from "react-redux";
import { toAbsoluteUrl, checkIsActive } from "../../_metronic/_helpers";

export function HeaderMenu({ layoutProps }) {
  const result = useSelector((state) => state.auth.user);
  console.log(result.username);
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  if (result.username === "admin") {
    return (
      <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
      >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive("/group")}`}
          >
            <NavLink className="menu-link" to="/Group">
              <span className="menu-text">Classes</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>

          <li
            className={`menu-item menu-item-rel ${getMenuItemActive("/group")}`}
          >
            <NavLink className="menu-link" to="/Group">
              <span className="menu-text">Group</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive("/djh")}`}
          >
            <NavLink className="menu-link" to="/azfj">
              <span className="menu-text">Quizzes</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive("/group")}`}
          >
            <NavLink className="menu-link" to="/Group">
              <span className="menu-text">Create Admin</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive("/group")}`}
          >
            <NavLink className="menu-link" to="/Group">
              <span className="menu-text">Professors</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/Meetopia"
            )}`}
          >
            <NavLink className="menu-link" to="/Meetopia">
              <span className="menu-text">Meetopia</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>

          {/*end::1 Level*/}

          {/*Classic submenu*/}
          {/*begin::1 Level*/}

          {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
      </div>
    );
  } else
    return (
      <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
      >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}

          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/Professors"
            )}`}
          >
            <NavLink className="menu-link" to="/Professors">
              <span className="menu-text">Professors</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive("/djh")}`}
          >
            <NavLink className="menu-link" to="/hjgjh">
              <span className="menu-text">khkj</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive("/group")}`}
          >
            <NavLink className="menu-link" to="/Group">
              <span className="menu-text">Group</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>

          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
              "/Meetopia"
            )}`}
          >
            <NavLink className="menu-link" to="/Meetopia">
              <span className="menu-text">Meetopia</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>

          {/*end::1 Level*/}

          {/*Classic submenu*/}
          {/*begin::1 Level*/}

          {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
      </div>
    );
}
