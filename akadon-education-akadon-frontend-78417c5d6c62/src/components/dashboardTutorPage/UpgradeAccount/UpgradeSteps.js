import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function UpgradeSteps({ step }) {
  const { t } = useTranslation("upgrade");
  return (
    <div className="step-box flex-box mb-4">
      {/* STEP 1 */}
      <div
        className={`${
          step >= 1 && "step-active"
        } step-count rounded-circle border center-box font-weight-bold text-grey mr-12px`}
      >
        1
      </div>
      <p className={`${step >= 1 && "text-active"} text-bold2 text-grey mb-0`}>
        {t("step-1")}
      </p>
      <div
        className={`${
          step >= 1 ? "text-dark" : "text-grey"
        } center-box mx-3 text-nowrap`}
      >
        --------
      </div>
      {/* STEP 2 */}
      <div
        className={`${
          step >= 2 && "step-active"
        } step-count rounded-circle border center-box font-weight-bold text-grey mr-12px`}
      >
        2
      </div>
      <p
        className={`${
          step >= 2 ? "text-dark" : "text-grey"
        } text-bold2 text-grey mb-0`}
      >
        {t("step-2")}
      </p>
      <div
        className={`${
          step >= 2 ? "text-dark" : "text-grey"
        } center-box mx-3 text-grey text-nowrap`}
      >
        --------
      </div>
      {/* STEP 3 */}
      <div
        className={`${
          step >= 3 && "step-active"
        } step-count rounded-circle border center-box font-weight-bold text-grey mr-12px`}
      >
        3
      </div>
      <p
        className={`${
          step >= 3 ? "text-dark" : "text-grey"
        } text-bold2 text-grey mb-0`}
      >
        {t("step-3")}
      </p>
    </div>
  );
}

UpgradeSteps.propTypes = {
  step: PropTypes.number
};

export default UpgradeSteps;
