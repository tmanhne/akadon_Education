// Author LONG

import React from "react";
import "./index.scss";
import stconnect from "../../assets/images/studentcontect.svg";
import tutor from "../../assets/images/studentcontecttutor.svg";

function SpecDetailTutor({ check, t }) {
  return (
    <div className="Spec-content d-flex flex-wrap mt-5">
      <div className="spec-left position-relative">
        <ul className="m-0 p-0 pl-4">
          <li>
            <span>{t("block_8_text_19")}</span>
          </li>
          <li className="mt-3">
            <span>{t("block_8_text_20")}</span>
          </li>
        </ul>
        <img src={tutor} alt="pic" className="m-0 position-absolute" />
      </div>
      <div className="spec-right position-relative">
        <ul className="m-0 text-head text-bold2">
          <li>
            <span>{t("block_8_text_21")}</span>
          </li>
        </ul>
        <ul className="text-sub mt-3 mb-3">
          <li>
            <span>
              <img src={check} alt="icon" className="m-0" />
              {t("block_8_text_22")}
            </span>
          </li>
          <li className="mt-1">
            <span>
              <img src={check} alt="icon" className="m-0" />
              {t("block_8_text_23")}
            </span>
          </li>
        </ul>
        <p className="m-0">
        {t("block_8_text_24")}
        </p>
        <img src={stconnect} alt="pic" className="m-0 position-absolute" />
      </div>
    </div>
  );
}

export default SpecDetailTutor;
