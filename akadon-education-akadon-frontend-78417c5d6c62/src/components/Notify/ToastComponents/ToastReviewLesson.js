import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ToastContent from "../../utils/ToastContent";
import Img from "../../../assets/images/review-lesson.jpg";

function ToastReviewLesson({ t, user, arrStr, subject_name, userRootUrl }) {
  if (!user || !arrStr) return <div></div>;

  const Image = <img src={Img} width={159} alt="toastify" />;

  const Content = (
    <div className="ml-3">
      <p className="mb-3 text-center">
        {t("notify:review_lesson_1")}
        <span className="text-dark text-bold2">
          {t("notify:lesson_1")} {arrStr[3] + " " + subject_name}
        </span>
        {t("notify:of_tutor")}
        <span className="text-dark text-bold2">{arrStr[4]}. </span>
        {t("notify:feel")}
      </p>

      <Link
        to={`/${userRootUrl}/courses/${arrStr[1]}/${arrStr[2]}`}
        className="mt-2 main-btn py-2 px-5 text-decoration-none"
      >
        {t("notify:detail")}
      </Link>
    </div>
  );

  return <ToastContent Image={Image} Content={Content} />;
}

ToastReviewLesson.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
  userRootUrl: PropTypes.string,
};

export default ToastReviewLesson;
