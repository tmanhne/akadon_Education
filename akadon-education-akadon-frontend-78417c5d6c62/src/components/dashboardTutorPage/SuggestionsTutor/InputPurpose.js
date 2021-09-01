import React, { useState } from "react";
import { Input, Label } from "reactstrap";
import PropTypes from "prop-types";
import ErrorHandler from "../../ErrorHandler";
import "./index.scss";

import { useTranslation } from "react-i18next";

const InputPurpose = ({ setRequestContent, requestContent, setIsStep2Done, isStep1Done }) => {
  const [error, setError] = useState("");

  const { t } = useTranslation(["suggest", "toast"]);
  if (!isStep1Done) {
    return (
      <div className="card-style border-radius-2 mt-3">
        <h6 className="text-grey mb-0 text-bold2">
        {t("suggest:sug_9")}
        </h6>
      </div>
    );
  }

  const handleNextStep = () => {
    if (!requestContent.contract_plan) {
      setError("plan");
      return;
    }
    if (!requestContent.goal) {
      setError("goal");
      return;
    }
    setError("");
    setIsStep2Done(true);
  };

  return (
    <div className="card-style  mt-3">
      <div className="titlestep text-bold2 mb-3 active">
      {t("suggest:sug_9")}
      </div>
      <div className="mb-12px">
        <Label className="text-bold2" for="student-wan">
        {t("suggest:sug_10")}<span className="text-danger">*</span>
          {error === "plan" && (
            <ErrorHandler error={t("suggest:sug_32")} />
          )}
        </Label>
        <Input
          className="border-radius-2"
          type="textarea"
          id="plan"
          value={requestContent.contract_plan}
          placeholder= {t("suggest:sug_39")}
          onChange={(e) =>
            setRequestContent({
              ...requestContent,
              contract_plan: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-12px">
        <Label className="text-bold2" for="student-wan">
        {t("suggest:sug_11")}<span className="text-danger">*</span>
          {error === "goal" && (
            <ErrorHandler error={t("suggest:sug_32")} />
          )}
        </Label>
        <Input
          className="border-radius-2"
          type="textarea"
          id="goal"
          value={requestContent.goal}
          placeholder= {t("suggest:sug_38")}
          onChange={(e) =>
            setRequestContent({
              ...requestContent,
              goal: e.target.value,
            })
          }
        />
      </div>
      <div
        className="main-btn shadow-btn-hover text-bold2 d-inline-block px-5"
        onClick={handleNextStep}
      >
         {t("suggest:sug_12")}
      </div>
    </div>
  );
};
InputPurpose.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default InputPurpose;
