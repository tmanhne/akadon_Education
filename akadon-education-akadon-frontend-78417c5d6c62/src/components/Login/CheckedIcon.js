import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CheckedIcon({ role, userType }) {
  return (
    <div style={{ width: "4rem", height: "40px" }} className="center-box">
      <div
        className={`fake-icon center-box rounded-circle mr-3 ${
          role === userType && "fake-icon-active"
        }`}
      >
        {role === userType && (
          <FontAwesomeIcon
            className="text-hightlight1"
            icon={["fas", "check-circle"]}
          />
        )}
      </div>
    </div>
  );
}

CheckedIcon.propTypes = { role: PropTypes.number };

export default CheckedIcon;
