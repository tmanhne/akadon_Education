// Author LONG

import React from "react";
import { Trans } from "react-i18next";

import "./index.scss";
import stconnect from "../../assets/images/studentcontect.svg";
import tutor from "../../assets/images/studentcontecttutor.svg";

function SpecDetail({ check, t }) {
  return (
    <div className="Spec-content d-flex flex-wrap mt-5">
      <div className="spec-left position-relative">
        <ul className="m-0 p-0 pl-4">
          <li>
            <Trans
              i18nKey="landing-page:block_7_text_7"
              components={{
                strong: <strong />,
              }}
            />
          </li>
          <li className="mt-3">{t("block_7_text_8")}</li>
        </ul>
        <img src={tutor} alt="pic" className="m-0 position-absolute" />
      </div>
      <div className="spec-right position-relative">
        <ul className="m-0 text-head text-bold2">
          <li>{t("block_7_text_9")}</li>
        </ul>
        <ul className="text-sub mt-3 mb-3">
          <li>
            <span>
              <img src={check} alt="icon" className="m-0" />
              {t("block_7_text_10")}
            </span>
          </li>
          <li className="mt-1">
            <span>
              <img src={check} alt="icon" className="m-0" />{" "}
              {t("block_7_text_11")}
            </span>
          </li>
          <li className="mt-1">
            <span>
              <img src={check} alt="icon" className="m-0" />{" "}
              {t("block_7_text_12")}
            </span>
          </li>
        </ul>
        <p className="m-0">{t("block_7_text_13")}</p>
        <img src={stconnect} alt="pic" className="m-0 position-absolute" />
      </div>
    </div>
  );
}

export default SpecDetail;
