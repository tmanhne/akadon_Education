import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageNotFoundImg from "../assets/images/404.png";

function PageNotFound({ userType }) {
  const url = `/${
    userType === "student" ? "dashboard" : "dashboard-tutor"
  }/home`;
  const { t } = useTranslation(["landing-page"]);
  return (
    <div className="flex-grow mx-auto mt-5">
      <img
        className="mx-auto mb-5"
        src={PageNotFoundImg}
        width={649}
        alt="Page not found"
      />
      <p className="h4 mb-5 text-center">{t("404")}</p>
      <Link
        style={{ width: "20rem" }}
        className="main-btn d-block py-3 mx-auto"
        to={url}
        alt="back to home page"
      >
        {t("nav_home")}
      </Link>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  const { userType } = user.info;
  return { userType };
};

export default connect(mapStateToProps, null)(PageNotFound);
