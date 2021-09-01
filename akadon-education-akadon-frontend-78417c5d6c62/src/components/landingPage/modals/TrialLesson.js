import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import YesIcon from "../../../assets/images/ld-yes.png";
import NoIcon from "../../../assets/images/ld-no.png";

function TrialLesson({ t, modal, setModal }) {
  const { payload } = modal;
  const dataleyer = (is_pre_study) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "heroFlow",
      step: 5,
      stepDetail: {
        heroFlowFreeTrial: is_pre_study,
      },
    });
  };
  return (
    <>
      <FontAwesomeIcon
        className="text-grey h4 mb-0"
        icon={["fas", "arrow-left"]}
        onClick={() => setModal({ ...modal, payload: { ...payload, step: 4 } })}
      />
      <h4 className="mb-4 font-weight-bold text-center">
        {t("landing-page:req_16")}
      </h4>

      <div className="trial-container flex-box align-items-stretch px-5 mb-5">
        <div
          onClick={() => {
            setModal({
              ...modal,
              payload: { ...payload, is_pre_study: true, step: 6 },
            });
            dataleyer(true);
          }}
          className="trial-box w-50 border-radius-2 mr-4"
        >
          <div className="img-box center-box mb-12px cursor-pointer">
            <img src={YesIcon} alt="trial lesson" />
          </div>
          <h4 className="font-weight-bold text-center mb-2">
            {t("landing-page:req_17")}
          </h4>
          <p className="mb-4 px-2 text-center">{t("landing-page:req_18")}</p>
        </div>

        <div
          onClick={() => {
            setModal({
              ...modal,
              payload: { ...payload, is_pre_study: false, step: 6 },
            });
            dataleyer(false);
          }}
          className="trial-box w-50 border-radius-2"
        >
          <div className="img-box center-box mb-12px cursor-pointer">
            <img src={NoIcon} alt="trial lesson" />
          </div>
          <h4 className="font-weight-bold text-center mb-2">
            {t("landing-page:req_19")}
          </h4>
          <p className="mb-4 px-2 text-center">{t("landing-page:req_20")}</p>
        </div>
      </div>
    </>
  );
}

TrialLesson.propTypes = {
  modal: PropTypes.object,
  setModal: PropTypes.func,
};

export default TrialLesson;
