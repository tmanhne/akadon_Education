import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ImgOnline from "../../../assets/images/ld-online.png";
import ImgOffline from "../../../assets/images/ld-offline.png";

function SelectOfflineOrOnline({ t, modal, setModal }) {
  function nextStep(value) {
    const { payload } = modal;
    const step = value ? 2 : 3;
    setModal({
      ...modal,
      payload: { ...payload, is_offline: value, step },
    });
  }

  return (
    <>
      <div className="text-right">
        <FontAwesomeIcon
          className="text-grey h4 mb-0"
          icon={["fal", "times"]}
          onClick={() => setModal({ ...modal, isOpen: false })}
        />
      </div>
      <h4 className="mb-2 font-weight-bold text-center">
        {t("landing-page:req_3")}
      </h4>
      <p className="text-grey text-center mb-3">{t("landing-page:req_4")}</p>

      <div className="online-offline-card center-box align-items-stretch w-100">
        <div
          onClick={() => {
            nextStep(false);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "heroFlow",
              step: 2,
              stepDetail: {
                heroFlowStudyMode: false,
              },
            });
          }}
          className="is-online border-radius-3 cursor-pointer mr-4"
        >
          <div className="center-box mb-12px">
            <img src={ImgOnline} alt="online" />
          </div>
          <h4 className="mb-2 text-center font-weight-bold">
            {t("landing-page:req_5")}
          </h4>
          <p className="mb-4 px-2 text-center">{t("landing-page:req_6")}</p>
        </div>

        <div
          onClick={() => nextStep(true)}
          className="is-offline border-radius-3 cursor-pointer"
        >
          <div className="center-box mb-12px">
            <img src={ImgOffline} alt="online" />
          </div>
          <h4 className="mb-2 text-center font-weight-bold">
            {t("landing-page:req_7")}
          </h4>
          <p className="mb-4 px-2 text-center">{t("landing-page:req_8")}</p>
        </div>
      </div>
    </>
  );
}

SelectOfflineOrOnline.propTypes = {
  modal: PropTypes.object,
  setModal: PropTypes.func,
};

export default SelectOfflineOrOnline;
