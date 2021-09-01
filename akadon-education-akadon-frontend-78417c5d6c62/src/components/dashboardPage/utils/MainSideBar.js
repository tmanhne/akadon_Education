import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import "./index.scss";
import Logo from "../../../assets/images/akadon-logo.svg";
import SmallLogo from "../../../assets/icons/small-logo.svg";
import { ListGroup, ListGroupItem } from "reactstrap";

export default function MainSideBar() {
  const [expand, setExpand] = useState(false);
  const { t } = useTranslation(["sidebar", "Note-page"]);
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
              to={`/dashboard/home`}
              activeClassName="active"
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "home"]} />
              <span className="text-nowrap">{t("sidebar-home")}</span>{" "}
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard/request?status=open-request`}
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
              to={`/dashboard/courses?status=pending`}
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
              to={`/dashboard/calendar`}
              activeClassName="active"
            >
              <FontAwesomeIcon
                className="mr-3"
                icon={["fal", "calendar-alt"]}
              />
              <span className="text-nowrap">{t("sidebar-schedule")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard/payment`}
              activeClassName="active"
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "receipt"]} />
              <span className="text-nowrap">{t("sidebar-payment")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard/news`}
              activeClassName="active"
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "book"]} />
              <span>{t("sidebar-akadon-service")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard/notetip`}
              activeClassName="active"
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "book"]} />
              <span>{t("guidelines")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="flex-grow w-100 border-0 text-bold2 p-0 pl-4">
            <NavLink
              className="flex-box align-items-center text-grey text-decoration-none d-block pr-4 w-100"
              to={`/dashboard/system-messages`}
              activeClassName="active"
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", "envelope"]} />
              <span>{t("sidebar:system_message")}</span>
            </NavLink>
          </ListGroupItem>

          <ListGroupItem className="econtract-icon hightlight-box w-100 border-0 p-0 pl-4 ">
            <NavLink
              className="text-decoration-none px-2 center-box mr-4 text-light text-bold2 border-radius-2 text-nowrap orange-btn-hover disable-overlay"
              // to={`/dashboard/e-contract?type=pre-accept`}
              to="#"
              activeClassName="active"
            >
              {!expand ? t("sidebar-econtract") : "E"}
            </NavLink>
          </ListGroupItem>
        </ListGroup>

        <div
          onClick={() => setExpand(!expand)}
          className="expan-icon bg-light position-absolute cursor-pointer center-box rounded-circle box-shadow text-hightlight1"
        >
          <FontAwesomeIcon
            className="mr-3"
            icon={["fal", `${expand ? "angle-right" : "angle-left"}`]}
          />
        </div>
      </div>
    </div>
  );
}
