import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Img from "../../../../assets/images/payment-image-1.jpg";
import CurrencyFormat from "../../../utils/CurrencyFormat";
import { paymentUrl } from "../../../../module";
import {SubLoader} from "../../../utils";

function Remind({ setModal, modal, contractId, t }) {
  // LOCAL STATE DECLARATIONS
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // SIDE EFFECTS
  useEffect(() => {
    createPaymentUrl();
  }, [modal.payload]);

  // FUNCTION DECLARATIONS
  async function createPaymentUrl() {
    const lesson = modal.payload;
    if (!lesson) return;

    const fee = lesson.fee || 0;
    const lesson_id = lesson.id;

    const paymentTitle = "LESSON_PAYMENT";
    const vpc_Amount = `${fee * 1 === 0 ? 1 : fee}00`;
    const vpc_ReturnURL = `${window.location.origin}/dashboard/payment/${contractId}`;

    const payload = { lesson_id };

    setLoading(true);
    const url = await paymentUrl(
      paymentTitle,
      vpc_Amount,
      vpc_ReturnURL,
      payload
    );
    setLoading(false);

    setUrl(url);
  }

  if (!modal.payload) {
    return <div></div>;
  }

  if (!url) return <SubLoader />;

  return (
    <div className="payment-modal p-3">
      <div className="text-right text-grey">
        <FontAwesomeIcon
          onClick={() => setModal({ ...modal, isOpen: false })}
          icon={["fal", "times"]}
          className="h4 mb-0"
        />
      </div>

      <div className="text-center mb-4">
        <img src={Img} alt="payment image" />
      </div>
      <p className="text-center text-dark text-bold1 px-5 mb-4">
        {t("payment:payment_confirm")}
        <strong className="ml-2">
          <CurrencyFormat value={modal.payload.fee} amountOnly={true} />
        </strong>
        ?
      </p>
      <div className="center-box px-5">
        <button
          onClick={() => setModal({ ...modal, isOpen: false })}
          className={`cancel-btn w-50 mr-3 ${
            loading && "disable-overlay boder-rd-100"
          }`}
        >
          {t("payment:cancel")}
        </button>
        <a
            href={url}
            className="main-btn px-5 w-50"
          >
            {t("payment:checkout")}
          </a>
      </div>
    </div>
  );
}

Remind.propTypes = {
  setModal: PropTypes.func,
  modal: PropTypes.object,
  contractId: PropTypes.string,
};

export default Remind;
