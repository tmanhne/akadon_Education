import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ToastContent from "../../utils/ToastContent";
import Img from "../../../assets/images/contract-finish.jpg";

function ContractFinish({ user, arrStr, subject_name, userRootUrl, t }) {
  if (!user || !arrStr) return <div></div>;

  const Image = <img src={Img} width={155} alt="toastify" />;

  const Content = (
    <div className="ml-3">
      <p className="mb-2 text-center">{t("notify:start_course")}</p>
      <div className="mb-2 text-left">
        <span>{t("notify:subject")}</span>
        <span className="text-dark text-bold2">{subject_name}</span>
      </div>
      <div className="mb-3 text-left">
        <span>{t("notify:tutor")}: </span>
        <span className="text-dark text-bold2">{user.name}</span>
      </div>
      <Link
        to={`/${userRootUrl}/courses/${arrStr[1]}`}
        className="mt-2 main-btn py-2 px-5 text-decoration-none"
      >
        {t("notify:detail")}
      </Link>
    </div>
  );

  return <ToastContent Image={Image} Content={Content} />;
}

ContractFinish.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
};

export default ContractFinish;
