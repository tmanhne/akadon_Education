import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation, Trans } from "react-i18next";

import WelcomeImg from "../../assets/images/welcome-image.png";

export default function WelcomeModal({setWelcomeModal}) {
  const { t } = useTranslation("toast");
  return (
    <div className="card-style px-3 pt-3 pb-4">
      <div className="text-right text-grey">
        <FontAwesomeIcon onClick={() => setWelcomeModal(false)} icon={["fas", "times"]} />
      </div>
      <div className="center-box">
        <img
          className="mx-auto mb-12px"
          src={WelcomeImg}
          width={298}
          alt="akadon welcome"
        />
      </div>
      <p className="text-center px-5 text-dark">
        {t("welcome")}
      </p>
    </div>
  );
}
