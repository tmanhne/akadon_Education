import React from "react";
import PropTypes from "prop-types";

import ToastContent from "../../utils/ToastContent";
import StudentIcon from "../../../assets/icons/student-icon.svg";
import TeachIcon from "../../../assets/icons/teacher-icon.svg";

function AddLesson({ userType, subject_name, userName, t }) {
  const icon = userType === "student" ? TeachIcon : StudentIcon;
  const user = userType === "student" ? t("notify:tutor")+":"  : t("notify:student")+":";

  const Image = <></>;
  const Content = (
    <div className="text-left">
      <p className="mb-2">
        {t("notify:student") + " " + userName + t("notify:add_lesson")}
      </p>
      <div className="edit-lesson-toast border-radius-1 pl-12px pr-12px py-2 mb-2">
        <h6 className="mb-2 text-bold2">{subject_name}</h6>
        <div>
          <img src={icon} />
          <span className="text-grey mx-2">{user}</span>
          <span className="text-bold1 text-dark">{userName}</span>
        </div>
      </div>
      <button className="main-btn">{t("notify:detail")}</button>
    </div>
  );
  return <ToastContent Image={Image} Content={Content} />;
}

AddLesson.propTypes = {
  userType: PropTypes.string,
  subject_name: PropTypes.string,
  userName: PropTypes.string,
  t: PropTypes.func,
};

export default AddLesson;
