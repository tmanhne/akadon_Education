import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import empty from "../../assets/images/empty-course-happen.png";

function EmptyCourse({ userType, t }) {
  if (userType === "student") {
    return (
      <div className="empty position-relative">
        <div className="content w-100 position-absolute">
          <p className="text-center">{t("emptyhappen")}</p>
          <div className="center-box">
            <Link
              to={`/dashboard/request/request-form`}
              className="main-btn text-nowrap text-decoration-none py-0 font-weight-bold"
            >
              {t("post")}
            </Link>
          </div>
        </div>
        <img className="w-100" src={empty} alt="empty" />
      </div>
    );
  } else {
    return (
      <div className="empty position-relative">
        <p className="content position-absolute">{t("empty")}</p>
        <img className="w-100" src={empty} alt="empty" />
      </div>
    );
  }
}

EmptyCourse.propTypes = { userType: PropTypes.string, t: PropTypes.func };

export default EmptyCourse;
