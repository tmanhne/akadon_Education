import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SuccessImg from "../../assets/images/change-password-success.svg";

export default function Success() {
  const { t } = useTranslation(["Sign-up-page", "common"]);
  return (
    <div>
      <div className="center-box mb-4">
        <img src={SuccessImg} width={500} alt="get password success" />
      </div>
      <p className="mb-4 text-dark text-bold2 text-center">
        {t("Sign-up-page:create_password_success")}
      </p>
      <div className="center-box mb-4">
        <Link
          to="/user/login"
          className="main-btn h5 mb-0 py-0 text-bold2 text-decoration-none"
          style={{ width: "15rem" }}
        >
          {t("Sign-up-page:login-now")}
        </Link>
      </div>
    </div>
  );
}
