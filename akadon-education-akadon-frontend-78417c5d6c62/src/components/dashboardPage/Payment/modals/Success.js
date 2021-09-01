import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Img from "../../../../assets/images/paymentSuccess.png";

function Success({ setModal, t }) {
  return (
    <>
      <div className="text-right">
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          icon={["fal", "times"]}
          className="text-grey mb-0 h4"
        />
      </div>

      <img src={Img} alt="Payment" width={254} className="mb-4 mx-auto" />

      <h5 className="font-weight-normal text-uppercase mb-12px text-center text-hightlight3">
        {t("payment:lesson_paid")}
      </h5>

      <p className="mx-5 text-center mb-5">{t("payment:payment_success")}</p>
    </>
  );
}

Success.propTypes = {
  setModal: PropTypes.func,
};

export default Success;
