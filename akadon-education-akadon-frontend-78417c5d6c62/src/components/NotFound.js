import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../assets/images/404.png";
import "./landingPage/index.scss";
import HeaderStep from "./landingPage/NoteTip/HeaderStep";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation(["landing-page"]);
  return (
    <>
      <HeaderStep t={t} />

      <div className="header-block__content404">
        <img className=" mt-3" src={PageNotFound} alt="student-tutor" />
        <span className="text404">{t("404")}</span>
        <Link className="main-btn  but404" to="/" alt="home">
          {t("nav_home")}
        </Link>
      </div>
    </>
  );
};

export default NotFound;
