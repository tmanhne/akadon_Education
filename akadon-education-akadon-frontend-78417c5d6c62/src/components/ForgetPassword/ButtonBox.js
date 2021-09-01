import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

function ButtonBox({ setStep, step, handleNext }) {
  const { t } = useTranslation(["Sign-up-page", "common"]);
  return (
    <div className="forget-password__button-box center-box">
      <div
        onClick={() => setStep(step - 1)}
        className="center-box mr-3 px-3 goback-hard"
      >
        <FontAwesomeIcon icon={["fal", "arrow-left"]} />
        <p className="flex-grow text-center mb-0 ml-3">
          {t("common:back-btn")}
        </p>
      </div>
      <div onClick={handleNext} className="flex-box main-btn px-3 py-0">
        <p className="flex-grow text-center mb-0">{t("common:next-btn")}</p>
        <FontAwesomeIcon icon={["fal", "arrow-right"]} />
      </div>
    </div>
  );
}

ButtonBox.propTypes = { setStep: PropTypes.func, step: PropTypes.number };

export default ButtonBox;
