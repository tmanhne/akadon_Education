import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import { useTranslation } from "react-i18next";

const RegisterProgress = ({ step }) => {
  const { t } = useTranslation(["Sign-up-page", "common"]);
  return (
    <div className="register-page__progress d-flex flex-wrap mb-4">
      <div
        className={`flex-box position-relative mb-3 step ${
          step >= 1 && "step-active"
        }`}
      >
        <div
          id="step-1"
          className="font-weight-bold center-box rounded-circle text-grey border mr-1"
        >
          1
        </div>
        <UncontrolledTooltip
          placement="top"
          className={`register-progress-tooltip ${
            step >= 1 && "active-tooltip"
          }`}
          innerClassName={`${step >= 1 && "text-dark"} box-shadow`}
          autohide={false}
          hideArrow={true}
          target="step-1"
        >
          {t("Sign-up-page:register-step-1")}
        </UncontrolledTooltip>
        <span className="text-grey">{t("Sign-up-page:register-step-1")}</span>
        <p
          className={`dots-style flex-grow center-box mb-2 ${
            step >= 2 ? "text-hightlight" : "text-grey"
          }`}
        >
          .....
        </p>
      </div>

      <div className={`flex-box mb-3 step ${step >= 2 && "step-active"}`}>
        <div
          id="step-2"
          className="font-weight-bold center-box rounded-circle text-grey border mr-1"
        >
          2
        </div>
        <UncontrolledTooltip
          placement="top"
          className={`register-progress-tooltip ${
            step >= 2 && "active-tooltip"
          }`}
          innerClassName={`${step >= 2 && "text-dark"} box-shadow`}
          autohide={false}
          hideArrow={true}
          target="step-2"
        >
          {t("Sign-up-page:register-step-2")}
        </UncontrolledTooltip>
        <span className="text-grey">{t("Sign-up-page:register-step-2")}</span>
        <p
          className={`dots-style flex-grow center-box mb-2 ${
            step >= 2 ? "text-hightlight" : "text-grey"
          }`}
        >
          .....
        </p>
      </div>

      <div className={`flex-box mb-3 step ${step >= 3 && "step-active"}`}>
        <div
          id="step-3"
          className="font-weight-bold center-box rounded-circle text-grey border mr-1"
        >
          3
        </div>
        <UncontrolledTooltip
          placement="top"
          className={`register-progress-tooltip ${
            step >= 3 && "active-tooltip"
          }`}
          innerClassName={`${step >= 3 && "text-dark"} box-shadow`}
          autohide={false}
          hideArrow={true}
          target="step-3"
        >
          {t("Sign-up-page:register-step-3")}
        </UncontrolledTooltip>
        <span className="text-grey">{t("Sign-up-page:register-step-3")}</span>
        <p
          className={`dots-style flex-grow center-box mb-2 ${
            step >= 2 ? "text-hightlight" : "text-grey"
          }`}
        >
          .....
        </p>
      </div>

      <div className={`flex-box mb-3 step ${step >= 4 && "step-active"}`}>
        <div
          id="step-4"
          className="font-weight-bold center-box rounded-circle text-grey border mr-1"
        >
          4
        </div>
        <UncontrolledTooltip
          placement="top"
          className={`register-progress-tooltip ${
            step >= 4 && "active-tooltip"
          }`}
          innerClassName={`${step >= 4 && "text-dark"} box-shadow`}
          autohide={false}
          hideArrow={true}
          target="step-4"
        >
          {t("Sign-up-page:register-step-4")}
        </UncontrolledTooltip>
        <span className="text-grey">{t("Sign-up-page:register-step-1")}</span>
      </div>
    </div>
  );
};

export default RegisterProgress;
