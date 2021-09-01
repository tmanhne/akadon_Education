import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./index.scss";

function StudentBanner({ name }) {
  const { t } = useTranslation("home-page");

  return (
    <div className="banner p-3 border-radius-3">
      <h3 className="font-weight-bold mb-3 text-truncate">
        {t("welcome")}, {name}!
      </h3>

      <div className="flex-box">
        <p className="text-bold1 h5 mr-5 mb-0">{t("start-learning")}</p>
        <Link
          to="/dashboard/request/request-form"
          className="main-btn py-0 px-4 text-nowrap"
        >
          {t("student-cta")}
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  const { name } = user.info;
  return { name };
};

export default connect(mapStateToProps, null)(StudentBanner);
