import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import comingsoon from "../../../src/assets/images/cml.svg";
import "./index.scss";
import { useTranslation } from "react-i18next";

function PageComingSoon({ userType }) {
  const url = `/${
    userType === "student" ? "dashboard" : "dashboard-tutor"
  }/home`;
  const { t } = useTranslation("comming");

  return (
    <div className="flex-grow mx-auto page-coming">
      <img className="mx-auto mb-5" src={comingsoon} alt="Page coming soon" />
      <p className="h4 mb-5 mt-5 text-cener">{t("text_1")}</p>
      <Link
        className="main-btn d-block py-3 mx-auto"
        to={url}
        alt="back to home page"
      >
        {t("text_3")}
      </Link>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};

export default connect(mapStateToProps, null)(PageComingSoon);
