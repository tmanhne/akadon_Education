import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ProfileIcon from "../../../assets/icons/profile.svg";

const TutorBanner = ({ name, profile_complete }) => {
  const { t } = useTranslation(["home-page", "common", "upgrade"]);

  return (
    <>
      {!profile_complete && (
        <div className="update-profile-warning flex-box border-radius-1 position-relative py-3 px-4 mb-4">
          <img
            src={ProfileIcon}
            width={32}
            alt="update profile warning"
            className="mr-12px"
          />
          <p className="mb-0 text-bold1 text-small">{t("complete-profile")}</p>
        </div>
      )}

      <div className="banner flex-box p-3 border-radius-3 mb-3">
        <div className="text-box">
          <h3 className="font-weight-bold">
            {t("welcome")}, {name}!
          </h3>

          <div className="flex-box">
            <p className="mb-0 text-bold1 mr-5">{t("start-teaching")}</p>
            <Link
              to="/dashboard-tutor/profile"
              className="main-btn py-0 px-4 text-nowrap text-uppercase"
            >
              {t("tutor-cta")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ user }) => {
  const { name, profile_complete } = user.info;
  return { name, profile_complete };
};

export default connect(mapStateToProps, null)(TutorBanner);
