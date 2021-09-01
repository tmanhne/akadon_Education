import React from "react";
import PropTypes from "prop-types";

import Img from "../../../assets/images/add-lesson-success.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditLessonSuccess({ setModal, userType, t }) {
  const user =
    userType === "student"
      ? t("course-detail:tutor")
      : t("course-detail:student");
  return (
    <>
      <div className="flex-box mb-4 p-3">
        <div className="text-center flex-grow">
          <img src={Img} alt="add lesson success" />
        </div>
        <FontAwesomeIcon
          icon={["fal", "times"]}
          className="align-self-start h4 text-grey mb-0"
          onClick={() => setModal(false)}
        />
      </div>

      <p className="text-center px-5">
        {t("course-detail:edit_lesson_success_1")}
        {user}
        {t("course-detail:wait")} {user}
        {t("course-detail:edit_lesson_success_2")}
      </p>
    </>
  );
}

EditLessonSuccess.propTypes = { setModal: PropTypes.func };

export default EditLessonSuccess;
