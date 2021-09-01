import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import studentIcon from "../../assets/icons/student-icon.svg";
import teacherIcon from "../../assets/icons/teacher-icon.svg";

const UserTypeRegister = ({ registerContent, setRegisterContent, setStep }) => {
  const { t } = useTranslation(["Sign-up-page", "common"]);
  function handleNext(role) {
    setRegisterContent({ ...registerContent, role });
    setStep(1);
  }
  return (
    <div className="register-page__user-type-register">
      <p className="mb-5">{t("Sign-up-page:select-account")}</p>
      <div
        onClick={() => handleNext(1)}
        className="user-type flex-box cursor-pointer"
      >
        <img src={teacherIcon} alt="teacher" className="mr-3" width={36} />
        <h5 className="font-weight-bold flex-grow mb-0">
          {t("common:teacher")}
        </h5>
        <FontAwesomeIcon icon={["fas", "arrow-right"]} />
      </div>
      <div
        onClick={() => handleNext(0)}
        className="user-type flex-box cursor-pointer"
      >
        <img src={studentIcon} alt="student" className="mr-3" width={36} />
        <h5 className="font-weight-bold flex-grow mb-0">
          {t("common:student")}
        </h5>
        <FontAwesomeIcon icon={["fas", "arrow-right"]} />
      </div>
    </div>
  );
};

export default UserTypeRegister;
