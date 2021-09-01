import React from "react";
import { useTranslation } from "react-i18next";
import note1 from "../../../assets/images/note5.png";
import note3 from "../../../assets/images/note5learn.png";

const StepContent3 = () => {
  const { t } = useTranslation( "Note-page");
  return (
    <div className="content dashtip">
        <div className="mt-3 ml-3 mr-3">
      {t("step_4")}
        <p className="content_text mt-3 ml-5">
        {t("content_8")}
        </p>
      </div>
      <div className="d-flex justify-content-center midle">
        <img src={note1} alt="step1" />
      </div>
      <div className="d-flex justify-content-end mr-3">
        <img src={note3} alt="step1" />
      </div>
    </div>
  );
};

export default StepContent3;
