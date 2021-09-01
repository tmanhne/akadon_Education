import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.scss";
import studentIcon from "../../assets/icons/student-icon.svg";
import teacherIcon from "../../assets/icons/teacher-icon.svg";

function LoginType({ setRole, setStep }) {
  const { t } = useTranslation(["Sign-up-page", "common"]);
  function handleNext(role) {
    setRole(role);
    setStep(2);
  }
  return (
    <div className="user-type-box h-100 pl-3">
      <h6 className="mb-5 font-weight-normal">{t("Sign-up-page:login-as")}</h6>
      <div
        onClick={() => handleNext(1)}
        className="user-type flex-box cursor-pointer"
      >
        <img src={teacherIcon} alt="teacher" className="mr-3" width={36} />
        <h5 className="font-weight-bold flex-grow mb-0">
          {t("Sign-up-page:teacher")}
        </h5>
        <FontAwesomeIcon icon={["fas", "arrow-right"]} />
      </div>
      <div
        onClick={() => handleNext(0)}
        className="user-type flex-box cursor-pointer"
      >
        <img src={studentIcon} alt="student" className="mr-3" width={36} />
        <h5 className="font-weight-bold flex-grow mb-0">
          {t("Sign-up-page:student")}
        </h5>
        <FontAwesomeIcon icon={["fas", "arrow-right"]} />
      </div>
    </div>
  );
}

LoginType.propTypes = { setRole: PropTypes.func, role: PropTypes.number };

export default LoginType;
