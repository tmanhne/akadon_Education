import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import "./index.scss";
import CurrentCourses from "./CurrentCourses";
import PendingCourses from "./PendingCourses";
import DoneCourses from "./DoneCourses";

const Courses = ({ userType, match }) => {
  const { t } = useTranslation(["course-page", "toast"]);
  // LOCAL STATE BTN LEFT OR RIGHT
  const [direction, setDirection] = useState("open");

  function Direct() {
    if (direction === "open")
      return (
        <div className=" d-flex justify-content-end">
          <span onClick={() => setDirection("happen")}>
            {t("course-page:ongoing")} {">>"}
          </span>
        </div>
      );
    if (direction === "happen")
      return (
        <div className=" d-flex justify-content-between">
          <span onClick={() => setDirection("open")}>
            {"<<"} {t("course-page:pending")}
          </span>{" "}
          <span onClick={() => setDirection("done")}>
            {t("course-page:completed")}
            {">>"}
          </span>
        </div>
      );
    if (direction === "done")
      return (
        <div className=" d-flex justify-content-start">
          <span onClick={() => setDirection("happen")}>
            {"<<"} {t("course-page:ongoing")}
          </span>
        </div>
      );
  }

  return (
    <div className="courses h-100">
      <h4 className="mb-12px font-weight-bold">{t("title")}</h4>
      <div className="courses__content mb-3 flex-wrap flex-box align-items-stretch justify-content-between">
        {/* CALL FUNCTION */}
        <div className="courses__content__direction w-100 mb-1">
          {Direct(direction)}
        </div>

        <div
          className={` ${
            direction === "open" && direction
          } card-style border-radius-2 py-3 px-2`}
        >
          <PendingCourses match={match} t={t} userType={userType} />
        </div>
        <div
          className={` ${
            direction === "happen" && direction
          } card-style border-radius-2 py-3 px-2`}
        >
          <CurrentCourses t={t} userType={userType} match={match} />
        </div>
        <div
          className={` ${
            direction === "done" && direction
          } card-style border-radius-2 py-3 px-2`}
        >
          <DoneCourses match={match} userType={userType} t={t} />
        </div>
      </div>
    </div>
  );
};

Courses.propTypes = {
  userType: PropTypes.string,
  match: PropTypes.object,
};

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};

export default connect(mapStateToProps)(Courses);
