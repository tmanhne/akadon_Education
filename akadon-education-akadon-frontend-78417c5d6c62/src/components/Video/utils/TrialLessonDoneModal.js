import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Img from "../../../assets/images/add-lesson-success.jpg";
function TrialLessonDoneModal({ setModal, modal, userType, match, t }) {
  const { lessonNo, courseId } = match.params;
  return (
    <>
      <div className="flex-box p-3 mb-3 border-bottom">
        <h5 className="text-bold2 text-center text-bold2 flex-grow mb-0">
          {userType === "student"
            ? t("video:student_trial_done")
            : t("video:tutor_trial_done")}
        </h5>
        <FontAwesomeIcon
          icon={["fal", "times"]}
          className="h4 mb-0 text-grey"
          onClick={() => setModal({...modal, trialLessonDone: false})}
        />
      </div>

      <div className="text-center mb-3">
        <img src={Img} width={170} alt="trial lesson status" />
      </div>
      {userType === "student" ? (
        <p className="text-center px-4">
          {t("video:student_trial_1")}
          <Link to="/dashboard/courses?status=pending">
            {t("video:student_trial_2")}
          </Link>
          {t("video:student_trial_3")}
        </p>
      ) : (
        <p className="text-center px-4">
          {t("video:tutor_trial")}
          <Link to={`/dashboard-tutor/courses/pending/${courseId}`}>
            Econtract
          </Link>
        </p>
      )}
    </>
  );
}

TrialLessonDoneModal.propTypes = {};

export default TrialLessonDoneModal;
