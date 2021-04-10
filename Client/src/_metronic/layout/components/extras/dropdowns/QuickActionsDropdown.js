/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import CreateClassesGroup from "../../../../../components/CreateClassesGroup/CreateClassesGroup";
import CreateClass from "../../../../../components/CreateClass/CreateClass";
import CreateSeance from "../../../../../components/CreateSeance/CreateSeance";
import CreateCourses from "../../../../../components/CreateCourses/CreateCourses";

export function QuickActionsDropdown() {
  const bgImage = toAbsoluteUrl("/media/misc/bg-2.jpg");
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.quick-actions.layout") ===
        "offcanvas",
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && (
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="quick-actions-tooltip">Quick actions</Tooltip>}
        >
          <div className="topbar-item">
            <div
              className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1"
              id="kt_quick_actions_toggle"
            >
              <span className="svg-icon svg-icon-xl svg-icon-primary">
                <SVG
                  src={
                    process.env.PUBLIC_URL +
                    "/media/svg/icons/Files/File-plus.svg"
                  }
                />
              </span>
            </div>
          </div>
        </OverlayTrigger>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown drop="down" alignRight>
          <Dropdown.Toggle
            as={DropdownTopbarItemToggler}
            id="kt_quick_actions_panel_toggle"
          >
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="quick-actions-tooltip">Class Management</Tooltip>
              }
            >
              <div className="btn btn-icon btn-hover-transparent-white btn-dropdown btn-lg mr-1">
                <span className="svg-icon svg-icon-xl">
                  <SVG
                    src={
                      process.env.PUBLIC_URL +
                      "/media/svg/icons/Files/File-plus.svg"
                    }
                  />
                </span>
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <form>
              {/* begin: Head */}
              <div
                className="d-flex flex-column align-items-center justify-content-center pt-10 pb-10 bgi-size-cover bgi-no-repeat rounded-top"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <h3 className="text-white font-weight-bold font-size-5">
                  Quick Actions
                </h3>
                <span className="btn btn-success btn-sm btn-bold btn-font-md mt-2">
                  23 tasks pending
                </span>
              </div>
              {/* end: Head */}

              <div className="row row-paddingless">
                <CreateClassesGroup></CreateClassesGroup>
                <CreateClass></CreateClass>

                <CreateSeance></CreateSeance>

                <CreateCourses></CreateCourses>
              </div>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
