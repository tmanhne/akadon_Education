import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ToastContent from "../../utils/ToastContent";
import Img from "../../../assets/images/request-change-bid-contract.jpg";

function RequestChangeBidContract({ user, arrStr, subject_name, userRootUrl, t }) {
  if (!user || !arrStr) return <div></div>;

  const Image = <img src={Img} width={155} alt="toastify" />;

  const Content = (
    <div>
      <p className="mb-0 text-center mb-2">
        {t("notify:student")} <span className="text-bold2">{user.name}</span>
        {t("notify:change_bid_contract_1")}
        <span className="text-dark text-bold2"> E-contract</span>
        {t("notify:change_bid_contract_2")}
        <span className="text-bold2"> {subject_name}</span>
        {t("notify:change_bid_contract_3")}
      </p>
      <Link
        to={`/${userRootUrl}/e-contract-change-log/${arrStr[1]}/${arrStr[2]}}`}
        className="mt-2 main-btn py-2 px-5 text-decoration-none"
      >
        {t("notify:detail")}
      </Link>
    </div>
  );

  return <ToastContent Image={Image} Content={Content} />;
}

RequestChangeBidContract.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
};

export default RequestChangeBidContract;
