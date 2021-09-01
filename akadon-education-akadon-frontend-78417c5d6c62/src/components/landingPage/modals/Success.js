import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Img from "../../../assets/images/ld-request-success.png";

export default function Success({ t, modal, setModal }) {
  const dataleyer = (type) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "heroFlow",
      step: 7,
      stepDetail: {
        heroFlowTypeLogin: type,
      },
    });
  };
  return (
    <>
      <div className="text-right">
        <FontAwesomeIcon
          onClick={() => setModal({ ...modal, isOpen: false })}
          icon={["fas", "times"]}
          className="h4 mb-0 text-grey"
        />
      </div>

      <div className="text-center mb-3">
        <img src={Img} width={219} alt="success" />
      </div>

      <h4 className="text-bold2 mb-12px text-center">
        {t("landing-page:req_32")}
      </h4>

      <p className="text-grey text-small text-center mb-4">
        {t("landing-page:req_33")}
      </p>

      <Link
        to="/user/login"
        className="login-btn main-btn-new d-block mb-4 text-uppercase mx-5 py-0 gtm_request_login"
        onClick={() => dataleyer("login")}
      >
        {t("landing-page:req_34")}
        <FontAwesomeIcon
          icon={["fas", "arrow-right"]}
          className="btn-arrow facebook-class"
        />
      </Link>

      <p className="text-center mb-12px">{t("landing-page:req_35")}</p>
      <Link
        to="/user/register"
        className="main-btn-new d-block text-uppercase mx-5 mb-4 py-0 gtm_request_register"
        onClick={() => dataleyer("register")}
      >
        {t("landing-page:req_36")}
        <FontAwesomeIcon
          icon={["fas", "arrow-right"]}
          className="btn-arrow facebook-class"
        />
      </Link>
    </>
  );
}
