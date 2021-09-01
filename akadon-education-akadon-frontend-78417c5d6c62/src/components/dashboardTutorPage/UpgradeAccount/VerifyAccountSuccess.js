import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

import Img from "../../../assets/images/verify-account-success.jpg";
import { paymentUrl } from "../../../module";
import useOnepayResponse from "../../customHooks/useOnepayResponse";

function VerifyAccountSuccess({
  accountType,
  setStep,
  upgrade_acc_to_premium_fee,
  upgrade_acc_to_standard_fee,
}) {
  // LOCAL STATE DECLARATIONS
  const [url, setUrl] = useState("");

  const paymentResponse = useOnepayResponse();

  const history = useHistory();
  const { pathname } = history.location;

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      let paymentTitle, vpc_Amount;
      if (accountType === 1) {
        paymentTitle = "UPGRADE_STANDARD_ACCOUNT_PAYMENT";
        vpc_Amount = upgrade_acc_to_standard_fee.toString() + "00";
      }

      if (accountType === 2) {
        paymentTitle = "UPGRADE_PROFESSIONAL_ACCOUNT_PAYMENT";
        vpc_Amount = upgrade_acc_to_premium_fee.toString() + "00";
      }

      const vpc_ReturnURL = `${window.location.origin}/dashboard-tutor/upgrade-account/${accountType}`;
      const payload = {};
      const url = await paymentUrl(
        paymentTitle,
        vpc_Amount,
        vpc_ReturnURL,
        payload
      );
      setUrl(url);
    })();
  }, []);

  useEffect(() => {
    if (paymentResponse && paymentResponse.status === "success") {
      setStep(4);
      history.push(pathname);
    }
  }, [paymentResponse]);

  return (
    <div className="center-box flex-column">
      <img
        src={Img}
        width={455}
        className="mb-12px"
        alt="verify user info success"
      />
      <p className="text-dark text-bold1 mb-4 text-center">
        Tài khoản của bạn đã được xác thực!
      </p>

      <a
        className="main-btn py-2 pl-4 pr-3 text-decoration-none"
        href={url}
        alt="payment redirect"
      >
        <span className="mr-3">Thanh toán</span>
        <FontAwesomeIcon icon={["fal", "arrow-right"]} />
      </a>

      {/* <a
        className="main-btn py-2 pl-4 pr-3 text-decoration-none"
        href="/dashboard-tutor/comingsoon"
        alt="payment redirect"
      >
        <span className="mr-3">Thanh toán</span>
        <FontAwesomeIcon icon={["fal", "arrow-right"]} />
      </a> */}
    </div>
  );
}

VerifyAccountSuccess.propTypes = {
  accountType: PropTypes.number,
  setStep: PropTypes.func,
};

export default VerifyAccountSuccess;
