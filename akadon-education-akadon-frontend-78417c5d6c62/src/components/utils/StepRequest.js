import React from "react";
import { useTranslation, Trans } from "react-i18next";

const StepRequest = ({ step }) => {
  const { t } = useTranslation("request-step");
  return (
    <div className="step-request card-style border-radius-2 flex-box justify-content-start px-3 py-0">
      <div className="hidden-text flex-box align-items-center my-3">
        <label
          className={`step rounded-circle center-box mb-0 mr-2 font-weight-bold text-grey 
          ${step >= 1 && "active-step"}         
          `}
        >
          1
        </label>
        <span
          className={`text-center fist text-nowrap
          ${step >= 1 ? "text-dark text-bold2" : "text-grey"}          
          `}
        >
          <Trans i18nKey="request-step:step-1" components={{ br: <br /> }} />
        </span>
      </div>
      <div
        className={`${
          step > 1 ? "text-hightlight" : "text-grey"
        } center-box mx-3 flex-grow text-center text-nowrap`}
      >
        -------
      </div>
      <div className="hidden-text flex-box align-items-center my-3">
        <label
          className={`step rounded-circle center-box mb-0 mr-2 font-weight-bold text-grey         
          ${step >= 2 && "active-step"}
         
          `}
        >
          2
        </label>
        <span
          className={`text-center text-nowrap        
          ${step >= 2 ? "text-dark text-bold2" : "text-grey"}         
          `}
        >
          {t("step-2")}
        </span>
      </div>
      <div
        className={`${
          step > 2 ? "text-hightlight" : "text-grey"
        } center-box mx-3 flex-grow text-center text-nowrap`}
      >
        -------
      </div>
      <div className="hidden-text flex-box align-items-center my-3">
        <label
          className={`step rounded-circle center-box mb-0 mr-2 font-weight-bold text-grey         
          ${step >= 3 && "active-step"}         
          `}
        >
          3
        </label>
        <span
          className={`text-center text-nowrap        
          ${step >= 3 ? "text-dark text-bold2" : "text-grey"}       
          `}
        >
          <Trans i18nKey="request-step:step-3" components={{ br: <br /> }} />
        </span>
      </div>
      <div
        className={`${
          step > 3 ? "text-hightlight" : "text-grey"
        } center-box mx-3 flex-grow text-center text-nowrap`}
      >
        -------
      </div>
      <div className="hidden-text flex-box align-items-center my-3">
        <label
          className={`step rounded-circle center-box mb-0 mr-2 font-weight-bold text-grey         
          ${step >= 4 && "active-step"}         
          `}
        >
          4
        </label>
        <span
          className={`text-center text-nowrap       
          ${step >= 4 ? "text-dark text-bold2" : "text-grey"}         
          `}
        >
          <Trans i18nKey="request-step:step-4" components={{ br: <br /> }} />
        </span>
      </div>
      <div
        className={`${
          step > 4 ? "text-hightlight" : "text-grey"
        } center-box mx-3 flex-grow text-center text-nowrap`}
      >
        -------
      </div>
      <div className="hidden-text flex-box align-items-center justify-content-end my-3">
        <label
          className={`step rounded-circle center-box mb-0 mr-2 font-weight-bold text-grey         
          ${step === 5 && "active-step"}
          `}
        >
          5
        </label>
        <span
          className={`text-center pl-2 pr-2 last        
          ${step === 5 ? "text-dark text-bold2" : "text-grey"}
          `}
        >
          {t("step-5")}
        </span>
      </div>
    </div>
  );
};
export default StepRequest;
