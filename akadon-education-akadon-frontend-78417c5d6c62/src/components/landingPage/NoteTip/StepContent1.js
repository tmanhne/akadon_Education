import React from "react";
import note1 from "../../../assets/images/note1.png";
import note2 from "../../../assets/images/note1-2.png";
import note3 from "../../../assets/images/note1femal.png";
import note4 from "../../../assets/images/note1mal.png";
import { useTranslation, Trans } from "react-i18next";

const StepContent1 = () => {
  const { t } = useTranslation( "Note-page");
  return (
    <div className="content dashtip">
      <div className="mt-3 ml-3 mr-3">
      {t("step")}
        <p className="content_text mt-3 ml-5">
        <Trans
            i18nKey={t("content")}
            components={{
              span: <span />,
            }}
          />
         
        </p>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        <div className="pic-slide">
          <img src={note1} alt="step1"/>
        </div>
        <div className="pic-slide">
          <img src={note2} alt="step1"/>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <img src={note4} alt="step1" />
        <img src={note3} alt="step1" />
      </div>
    </div>
  );
};

export default StepContent1;
