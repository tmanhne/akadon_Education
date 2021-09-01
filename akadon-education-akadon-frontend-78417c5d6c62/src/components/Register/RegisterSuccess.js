import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import RS from "../../assets/images/register-success.svg";

const RegisterSuccess = ({ registerContent }) => {
  const { t } = useTranslation(["Sign-up-page", "common"]);
  const usertype =
    registerContent.role === 0 ? (
      <>{t("Sign-up-page:start-learning")}</>
    ) : (
      <>{t("Sign-up-page:start-work")}</>
    );

  return (
    <div className="flex-box flex-column justify-content-center">
      <img className="mb-4" width={360} src={RS} alt="register success" />
      <h4 className="text-bold2 text-dark text-center mb-4">
        {t("Sign-up-page:register-success")}
      </h4>
      <p className="text-grey mb-5 text-center">{usertype}</p>
      <Link
        to="/user/login"
        className="form4 main-btn font-weight-bold text-decoration-none w-50 center-box h5 mb-0 py-0"
        id="form4id"
      >
        {t("Sign-up-page:login-btn")}
      </Link>
    </div>
  );
};

export default RegisterSuccess;
