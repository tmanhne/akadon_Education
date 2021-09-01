import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function StepBox({ step }) {
  const { t } = useTranslation("Sign-up-page");
  return (
    <div className="forget-password__step-box flex-box text-small">
      <div className="flex-box">
        <div className={`step mr-12px ${step >= 0 && "active-step"}`}>1</div>
        <span className={`text-bold2 ${step >= 0 ? "text-dark" : "text-grey"}`}>
        {t("forget-password-step-1")}
        </span>
      </div>
      <div
        style={{ letterSpacing: "5px" }}
        className={`mx-2 mb-2 ${step >= 1 ? "text-hightlight" : "text-grey"}`}
      >
        .....
      </div>
      <div className="flex-box">
        <div className={`step mr-12px ${step >= 2 && "active-step"}`}>2</div>
        <span className={`text-bold2 ${step >= 2 ? "text-dark" : "text-grey"}`}>
        {t("forget-password-step-2")}
        </span>
      </div>
      <div
        style={{ letterSpacing: "5px" }}
        className={`mx-2 mb-2 ${step >= 2 ? "text-hightlight" : "text-grey"}`}
      >
        .....
      </div>
      <div className="flex-box">
        <div className={`step mr-12px ${step >= 3 && "active-step"}`}>3</div>
        <span className={`text-bold2 ${step >= 3 ? "text-dark" : "text-grey"}`}>
        {t("forget-password-step-3")}
        </span>
      </div>
    </div>
  );
}

StepBox.propTypes = { step: PropTypes.number };

export default StepBox;
