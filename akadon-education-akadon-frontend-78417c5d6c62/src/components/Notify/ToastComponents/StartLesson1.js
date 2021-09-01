import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Img from "../../../assets/images/start-lesson.jpg";
import ToastContent from "../../utils/ToastContent";

function StartLesson1({ user, arrStr, subject_name, userRootUrl, t }) {
  if (!user || !arrStr) return <div></div>;

  const Image = <img src={Img} width={145} alt="toastify" />;

  const Content = (
    <div className="ml-3">
      <p className="mb-2 text-left">
        {t("notify:start_lesson") + arrStr[4] && arrStr[4].split(":").slice(0, 2).join(":")} {t("notify:tomorow")} {arrStr[3]}
      </p>
      <div className="mb-2 text-left">
        <span className="text-dark text-bold2">{t("notify:subject")} {subject_name}</span>
      </div>
      <div className="mb-3 text-left">
        <FontAwesomeIcon
          className="text-small text-grey mr-2"
          icon={["fas", "chalkboard-teacher"]}
        />
        <span className="text-small text-grey">{t("notify:tutor")}: </span>
        <span className="text-dark text-bold2">{user.name}</span>
      </div>
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

StartLesson1.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
  userRootUrl: PropTypes.string,
};

export default StartLesson1;
