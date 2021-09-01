import { Link } from "react-router-dom";
import React from "react";
import Img from "../../assets/images/mkt-fallback.jpg";

export default function FallbackRequest({ t }) {
  return (
    <div className="fallback-content mx-auto">
      <div className="text-center">
        <img src={Img} alt="fallback" width={321} />
      </div>
      <p className="text-hightlight text-center">{t("marketing:fallback_1")}</p>
      <h4 className="title text-bold2 text-center mb-3">
        <span>{t("marketing:fallback_2")}</span>
        <span>{t("marketing:fallback_3")}</span>
      </h4>
      <div className="center-box">
        <Link to="/user/register" className="main-btn flex-grow">
          {t("marketing:register")}
        </Link>
        <span className="text-bold2 text-center mx-3">{t("marketing:or")}</span>
        <Link to="/user/login" className="main-btn flex-grow">
          {t("marketing:login")}
        </Link>
      </div>
    </div>
  );
}
