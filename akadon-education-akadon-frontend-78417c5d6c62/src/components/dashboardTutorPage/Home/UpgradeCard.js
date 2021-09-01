import React from "react";
import { Link } from "react-router-dom";

import StandardIcon from "../../../assets/icons/user-standard-icon-1.svg";
import ProIcon from "../../../assets/icons/user-pro-icon.svg";
import { useTranslation } from "react-i18next";

export default function UpgradeCard() {
  const { t } = useTranslation(["home-page", "common"]);
  return (
    <div className="dashboard-tutor-home__upgrade card-style border-radius-2 flex-box">
      <div className="margin-box">
        <h4 className="text-hightlight1 text-center mb-12px text-bold2">
          {t("block-2-tutor")}
        </h4>
        <p className="mb-4 text-center">
          {/* <Link to="#" className="text-hightlight cursor-not-allowed">
            {t("common:view-more")}
          </Link> */}
        </p>
        <div className="cta-box center-box">
          <Link
            to="/dashboard-tutor/upgrade-account/1"
            className="standard-btn text-decoration-none center-box main-btn py-1 mr-4 w-50"
          >
            <img
              src={StandardIcon}
              alt="standard user"
              width={36}
              className="mr-12px"
            />
            <span>{t("home-page:block-2-tutor-1")}</span>
          </Link>
          <Link
            to="/dashboard-tutor/upgrade-account/2"
            className="pro-btn text-decoration-none center-box main-btn py-1 w-50"
          >
            <img src={ProIcon} alt="pro user" width={36} className="mr-12px" />
            <span>{t("home-page:block-2-tutor-2")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
