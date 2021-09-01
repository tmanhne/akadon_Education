import React from "react";
import note1 from "../../../assets/images/note6.png";
import note3 from "../../../assets/images/note6pay.png";
import { useTranslation, Trans } from "react-i18next";

const StepContent3 = () => {
  const { t } = useTranslation("Note-page");
  return (
    <div className="content dashtip">
      <div className="mt-3 ml-3 mr-3">
        {t("step_5")}
        <p className="content_text mt-3 ml-5">
          <Trans
            i18nKey={t("content_9")}
            components={{
              span: <span />,
            }}
          />
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
