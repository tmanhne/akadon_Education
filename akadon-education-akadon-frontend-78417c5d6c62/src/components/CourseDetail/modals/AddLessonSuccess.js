import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Img from "../../../assets/images/add-lesson-success.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddLessonSuccess({ setModal, userType, t }) {
  return (
    <>
      <div className="flex-box mb-4">
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
        {t("course-detail:add_lesson_text_1")}
        {userType === "student" ? t("course-detail:tutor") : t("course-detail:student")}
        {t("course-detail:add_lesson_text_2")}
        {userType === "student" ? t("course-detail:tutor") : t("course-detail:student")}
        {t("course-detail:add_lesson_text_3")}
      </p>
    </>
  );
}

AddLessonSuccess.propTypes = { setModal: PropTypes.func };

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};

export default connect(mapStateToProps, null)(AddLessonSuccess);
