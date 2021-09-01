import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import Logo from "../../assets/images/mobile-menu-logo.png";

function MobileMenu({ userType, setMenu }) {
  const { t } = useTranslation(["sidebar", "Note-page"]);

  const rootUrl = userType === "student" ? "/dashboard" : "/dashboard-tutor";
  const urlsList = [
    { url: `${rootUrl}/home`, icon: "home", text: t("sidebar-home") },
    {
      url: `${rootUrl}/request`,
      icon: "comment-alt-dots",
      text: t("sidebar-requests"),
    },
    {
      url: `${rootUrl}/courses`,
      icon: "chalkboard-teacher",
      text: t("sidebar-courses"),
    },
    {
      url: `${rootUrl}/calendar`,
      icon: "calendar-alt",
      text: t("sidebar-schedule"),
    },
    { url: `${rootUrl}/payment`, icon: "receipt", text: t("sidebar-payment") },
    {
      url: `${rootUrl}/news`,
      icon: "book",
      text: t("sidebar-akadon-service"),
    },
    { url: `${rootUrl}/notetip`, icon: "book", text: t("guidelines") },
    {
      url: `${rootUrl}/system-messages`,
      icon: "envelope",
      text: t("sidebar:system_message"),
    },
  ];

  return (
    <div id="mobile-menu" className="mobile-menu p-3 position-fixed bg-light">
      <div className="flex-box mb-4">
        <Link to="/" className="flex-grow">
          <img src={Logo} alt="akadon" width={89} />
        </Link>
        <div className="flex-grow text-right align-self-start">
          <FontAwesomeIcon
            onClick={() => setMenu(false)}
            className="h4 mb-0"
            icon={["fal", "times"]}
          />
        </div>
      </div>

      <ListGroup>
        {urlsList.map((item) => (
          <ListGroupItem
            key={item.url}
            className="w-100 border-0 text-bold2 p-0"
            onClick={() => setMenu(false)}
          >
            <Link
              className="flex-box text-decoration-none text-dark h-100"
              to={item.url}
            >
              <FontAwesomeIcon className="mr-3" icon={["fas", item.icon]} />
              <span className="text-nowrap">{item.text}</span>
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

MobileMenu.propTypes = { userType: PropTypes.string, setMenu: PropTypes.func };

export default MobileMenu;
