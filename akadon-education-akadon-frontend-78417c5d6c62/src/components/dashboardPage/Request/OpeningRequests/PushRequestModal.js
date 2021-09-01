import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Paymentnotify from "../../../../assets/images/Paymentnotify.png";
import { paymentUrl } from "../../../../module";
import SubLoader from "../../../utils/SubLoader";
import CurrencyFormat from "../../../utils/CurrencyFormat";

function PushRequestModal({ modal, setModal, push_contract_to_top_fee, t }) {
  // LOCAL STATE DECLARATIONS
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // SIDE EFFECTS
  useEffect(() => {
    (async () => {
      const paymentTitle = "PUSH_REQUEST_TO_TOP_PAYMENT";
      const vpc_Amount = push_contract_to_top_fee.toString() + "00";
      const vpc_ReturnURL = `${window.location.origin}/dashboard/request?status=open-request`;

      const payload = { contract_id: modal.content.id };
      const url = await paymentUrl(
        paymentTitle,
        vpc_Amount,
        vpc_ReturnURL,
        payload
      );
      setLoading(false);
      setUrl(url);
    })();
  }, []);

  if (loading) {
    return <SubLoader />;
  }

  return (
    <>
      <div className="center-box mb-3">
        <Link to="/">
          <img className="logo" src={Paymentnotify} alt="akadon" />
        </Link>
      </div>

      <h3 className="text-semibol text-center mb-4">
        {t("request-page:header-6")}
      </h3>

      <p className="text-center mb-4">
        {t("request-page:push_text")}{" "}
        <CurrencyFormat value={push_contract_to_top_fee} amountOnly={true} />
      </p>

      <div className="mb-4 text-center">
        <a href={url} className="btn main-btn  w-50">
          {t("request-page:push_now")}
        </a>
        {/* <a href="/dashboard/comingsoon" className="btn main-btn  w-50">
          Đẩy tin ngay
        </a> */}
      </div>

      <div className="mb-12px text-center">
        <span
          onClick={() => setModal({ ...modal, isOpen: false })}
          className="btn-link text-center cursor-pointer"
          style={{ color: "black", width: "20rem" }}
        >
          {t("request-page:no_thanks")}
        </span>
      </div>
    </>
  );
}

const mapStateToProps = ({ user }) => {
  const { push_contract_to_top_fee } = user.info;
  return { push_contract_to_top_fee };
};

PushRequestModal.propTypes = {
  modal: PropTypes.object,
  setModal: PropTypes.func,
};

export default connect(mapStateToProps, null)(PushRequestModal);
