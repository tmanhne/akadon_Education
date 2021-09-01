// Author LongHoang

import React from "react";
import { useTranslation } from "react-i18next";
import studentpic from "../../assets/images/ld-student-new.svg";
import tutorpic from "../../assets/images/ld-tutor-new.svg";
import logowhite from "../../assets/images/logowhite.svg";
import "./index.scss";
import LandingBox from "./LandingBox";

const LandingChoose = () => {
  const { t } = useTranslation(["landing-type"]);
  const student = {
    title: t("landing-type:text_1"),
    button: t("landing-type:text_4"),
    cover: studentpic,
    link: "/giasu",
    dataLayer: "tutor",
  };
  const tutor = {
    title: t("landing-type:text_2"),
    button: t("landing-type:text_4"),
    cover: tutorpic,
    link: "/hocvien",
    dataLayer: "student",
  };
  return (
    <div className="landing-choose">
      <div className="d-flex justify-content-center title-logo mb-4">
        <img src={logowhite} alt="akadon" />
      </div>

      <div className="d-flex justify-content-center type-mobile">
        <LandingBox data={student} />
        <LandingBox data={tutor} />
      </div>
    </div>
  );
};

export default LandingChoose;
