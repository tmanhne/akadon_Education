import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Img from "../../../assets/images/start-lesson.jpg";
import ToastContent from "../../utils/ToastContent";
import CountDown from "../../utils/CountDown";

function StartLesson0({ user, arrStr, subject_name, userRootUrl, t }) {
  if (!user || !arrStr) return <div></div>;
  let expiryTimes = new Date();
  expiryTimes.setMinutes(expiryTimes.getMinutes() + 30);

  const Image = <img src={Img} width={145} alt="toastify" />;

  const Content = (
    <div className="ml-3">
      <p className="mb-2 text-left">{t("notify:start_in_30_minute")}</p>
      <div className="mb-2 text-left">
        <span className="text-dark text-bold2">{t("notify:subject")}{subject_name}</span>
      </div>
      <div className="mb-3 text-left">
        <FontAwesomeIcon
          className="text-small text-grey mr-3"
          icon={["fas", "chalkboard-teacher"]}
        />
        <span className="text-small text-grey">{t("notify:tutor")}: </span>
        <span className="text-dark text-bold2">{user.name}</span>
      </div>
      <div className="flex-box">
        <div>
          <CountDown expiryTimes={expiryTimes} />
        </div>
        <Link
          to={`/${userRootUrl}/courses/${arrStr[1]}/${arrStr[2]}`}
          className="mt-2 main-btn py-2 px-3 ml-2 text-decoration-none text-nowrap"
        >
          {t("notify:detail")}
        </Link>
      </div>
    </div>
  );

  return <ToastContent Image={Image} Content={Content} />;
}

StartLesson0.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
  userRootUrl: PropTypes.string,
};

export default StartLesson0;
