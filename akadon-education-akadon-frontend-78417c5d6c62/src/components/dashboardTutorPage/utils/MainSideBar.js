import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Logo from "../../../assets/images/text-logo.png";
import SmallLogo from "../../../assets/icons/small-logo.svg";
import { useTranslation } from "react-i18next";

const MainSideBar = () => {
  const [toggle, setToggle] = useState(false);
  const [expand, setExpand] = useState(false);
  const { t } = useTranslation(["sidebar", "common", "Note-page"]);

  // LONG BỎ SỰ KIỆN CLICK KHI ĐANG THU GỌN VÀ GỘP VÀO ONCLICK

  function handleExpand() {
    if (toggle) {
      setExpand(!expand);
      setToggle(!toggle);
    } else {
      setExpand(!expand);
    }
  }

  return (
    <div
      className={`dashboard-page__sidebar pl-0 ${
        expand ? "expanded-sidebar" : "full-sidebar"
      }`}
    >
      <div className="main-sidebar position-relative box-shadow h-100">
        {/* logo */}
        {/*  LONG AAD target="_blank" */}
        <Link to="/" target="_blank" className="logo">
          {expand ? (
            <img className="px-2" width={60} src={SmallLogo} alt="akadon" />
          ) : (
            <img className="px-2" src={Logo} alt="akadon" />
          )}
        </Link>

        {/* List */}
        <ListGroup>
          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard-tutor/home`}
              activeClassName="active"
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "home"]} />
              <span className="text-nowrap">{t("sidebar-home")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard-tutor/requests-list`}
              activeClassName="active"
            >
              <FontAwesomeIcon
                className="mr-3"
                icon={["fas", "comment-alt-dots"]}
              />
              <span className="text-nowrap">
                {t("sidebar:student_requests")}
              </span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard-tutor/request?status=save`}
              activeClassName="active"
            >
              <FontAwesomeIcon
                className="mr-3"
                icon={["fas", "comment-alt-dots"]}
              />
              <span className="text-nowrap">{t("sidebar-requests")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard-tutor/courses?status=pending`}
              activeClassName="active"
            >
              <FontAwesomeIcon
                className="mr-3"
                icon={["fas", "chalkboard-teacher"]}
              />
              <span className="text-nowrap">{t("sidebar-courses")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard-tutor/calendar`}
              activeClassName="active"
            >
              <FontAwesomeIcon
                className="mr-3"
                icon={["fas", "calendar-alt"]}
              />
              <span className="text-nowrap">{t("sidebar-schedule")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="finance-item flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <div
              style={{ height: "56px" }}
              className="flex-box align-items-center text-grey pr-4 w-100"
              onClick={() => setToggle(!toggle)}
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "receipt"]} />
              <div className="flex-box w-100">
                <span className="flex-grow text-nowrap">
                  {t("sidebar-payment")}
                </span>
                <FontAwesomeIcon
                  icon={["fal", `${toggle ? "angle-up" : "angle-down"}`]}
                />
              </div>
            </div>
          </ListGroupItem>
          {/* LONG THÊM ĐIỀU KIỆN EXPAND VÀ UncontrolledDropdown */}
          {expand ? (
            <UncontrolledDropdown direction="right">
              <DropdownToggle className="border-0 p-0 center-box mb-0">
                <FontAwesomeIcon className="mr-3" icon={["fas", "receipt"]} />
                <span className="flex-grow text-nowrap chang">
                  {t("sidebar-payment")}
                </span>
              </DropdownToggle>
              <DropdownMenu className="box-shadow border-radius-2 border p-0">
                <DropdownItem className="border-bottom color-btn-hover">
                  <NavLink
                    to={`/dashboard-tutor/finance/revenue?status=all`}
                    className="flex-box align-items-center border-0 text-decoration-none text-dark pl-1"
                    activeClassName="active"
                  >
                    <span>{t("sub-payment-1")}</span>
                  </NavLink>
                </DropdownItem>
                <DropdownItem className="border-bottom color-btn-hover">
                  <NavLink
                    to={`/dashboard-tutor/finance/banking`}
                    className="flex-box align-items-center border-0 text-decoration-none text-dark pl-1"
                    activeClassName="active"
                  >
                    <span>{t("sub-payment-2")}</span>
                  </NavLink>
                </DropdownItem>
                <DropdownItem className="border-bottom color-btn-hover">
                  <NavLink
                    to={`/dashboard-tutor/finance/payment`}
                    className="flex-box align-items-center border-0 text-decoration-none text-dark pl-1"
                    activeClassName="active"
                  >
                    <span>{t("sub-payment-3")}</span>
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            toggle && (
              <div>
                <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
                  <NavLink
                    to={`/dashboard-tutor/finance/revenue?status=all`}
                    className="flex-box align-items-center border-0 text-decoration-none pl-4 text-grey"
                    activeClassName="active"
                  >
                    <span>{t("sub-payment-1")}</span>
                  </NavLink>
                </ListGroupItem>

                <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
                  <NavLink
                    to={`/dashboard-tutor/finance/banking`}
                    className="flex-box align-items-center border-0 text-decoration-none pl-4 text-grey"
                    activeClassName="active"
                  >
                    <span>{t("sub-payment-2")}</span>
                  </NavLink>
                </ListGroupItem>

                <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
                  <NavLink
                    to={`/dashboard-tutor/finance/payment`}
                    className="flex-box align-items-center border-0 text-decoration-none pl-4 text-grey"
                    activeClassName="active"
                  >
                    <span>{t("sub-payment-3")}</span>
                  </NavLink>
                </ListGroupItem>
              </div>
            )
          )}

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4 hand">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard-tutor/news`}
              activeClassName="active"
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "book"]} />
              <span>{t("sidebar-akadon-service")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4 hand">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard-tutor/notetip`}
              activeClassName="active"
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "book"]} />
              <span>{t("sidebar:guidelines")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard-tutor/system-messages`}
              activeClassName="active"
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "envelope"]} />
              <span>{t("sidebar:system_message")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="econtract-icon hightlight-box w-100 border-0 p-0 pl-4">
            <NavLink
              className="text-decoration-none center-box mr-4 text-light text-bold2 border-radius-2 text-nowrap orange-btn-hover disable-overlay"
              // to={`/dashboard-tutor/e-contract?type=pre-accept`}
              to="#"
              activeClassName="active"
            >
              {!expand ? t("sidebar-econtract") : "E"}
            </NavLink>
          </ListGroupItem>
        </ListGroup>

        <div
          onClick={handleExpand}
          className="expan-icon bg-light position-absolute cursor-pointer center-box rounded-circle box-shadow text-hightlight1"
        >
          <FontAwesomeIcon
            icon={["fal", `${expand ? "angle-right" : "angle-left"}`]}
            className="mr-3"
          />
        </div>
      </div>
    </div>
  );
};

export default MainSideBar;
