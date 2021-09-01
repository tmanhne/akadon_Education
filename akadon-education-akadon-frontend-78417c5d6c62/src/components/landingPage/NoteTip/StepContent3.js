import React from "react";
import note1 from "../../../assets/images/note3.png";
import note3 from "../../../assets/images/note3negot.png";
import { useTranslation, Trans } from "react-i18next";

const StepContent3 = () => {
  const { t } = useTranslation( "Note-page");
  return (
    <div className="content dashtip">
      <div className="mt-3 ml-3 mr-3">
      {t("step_2")}
        <p className="content_text mt-3 ml-5">
        <Trans
            i18nKey={t("content_3")}
            components={{
              span: <span />,
            }}
          />
        </p>
        <p className="content_text mt-3 ml-5">
        {t("content_4")}
        </p>
        <p className="text-note">
        <Trans
            i18nKey={t("content_5")}
            components={{
              mau: <span style={{ fontWeight: "bold",color: "#0367b4" }}/>,
              span: <span style={{ fontWeight: "bold", textDecoration: "underline" }} />
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
