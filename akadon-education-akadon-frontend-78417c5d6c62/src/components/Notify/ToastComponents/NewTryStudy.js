// AUTHOR LONGHOANG
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ToastContent from "../../utils/ToastContent";
import Img from "../../../assets/images/contract-finish.jpg";

function NewTryStudy({ user, arrStr, userRootUrl, t }) {
  if (!user || !arrStr) return <div></div>;

  const Image = <img src={Img} width={155} alt="toastify" />;

  const Content = (
    <div className="ml-3">
      <p className="mb-2 text-center">{t("notify:accept_trial")}</p>
      <div className="mb-2 text-left">
        <span>{t("notify:course_1")}</span>
        <span className="text-dark text-bold2">{arrStr[1]}</span>
        <span>{t("notify:lesson_id")}</span>
        <span className="text-dark text-bold2">{arrStr[2]}</span>
      </div>
      <div className="mb-3 text-left">
        <span>{t("notify:start_from")}</span>
        <span className="text-dark text-bold2">{arrStr[4].split(":",2).join(":")}</span>
        <span>{t("notify:to")}</span>
        <span className="text-dark text-bold2">{arrStr[5].split(":",2).join(":")}</span>
        <span>{t("notify:day")} </span>
        <span className="text-dark text-bold2">{arrStr[3]}</span>
      </div>
      <Link
        to={`/${userRootUrl}/courses/${arrStr[1]}/${arrStr[2]}/video?status=trial`}
        className="mt-2 main-btn py-2 px-5 text-decoration-none"
      >
        {t("notify:detail")}
      </Link>
    </div>
  );

  return <ToastContent Image={Image} Content={Content} />;
}

NewTryStudy.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
};

export default NewTryStudy;
