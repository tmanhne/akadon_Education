// Author LONGHOANG
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import Invoice from "../../../../assets/images/invoice_detail.png";
import { useTranslation } from "react-i18next";

function ViewDetail({ setModal, modal }) {
  const { t } = useTranslation("payment");

  const Pay = modal?.vpc_Amount;
  const Id = modal?.vpc_OrderInfo;

  return (
    <>
      <div className="flex-box border-bottom w-100 justify-content-center text-center p-2 mb-2">
        <h5 className="flex-grow text-bold2 mb-0" style={{ fontSize: "20px" }}>
          {t("invoice_1")}
        </h5>
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          icon={["fal", "times"]}
          className="text-grey mb-0  h4"
        />
      </div>

      <img src={Invoice} alt="Payment" width={254} className="mb-4 mx-auto" />

      <ul className="text-hightlight1 pb-2" style={{ fontSize: "16px" }}>
        <li>
          <span className="text-grey"> {t("invoice_2")}</span>
          <span className="text-bold2 text-dark">
            {Pay} {t("invoice_5")}
          </span>
        </li>
        <li>
          <span className="text-grey"> {t("invoice_3")}</span>
          <span className="text-bold2 text-dark"> 0 {t("invoice_5")}</span>
        </li>
        <li>
          <span className="text-grey"> {t("invoice_4")}</span>
          <span className="text-bold2 text-dark"> {Id}</span>
        </li>
      </ul>
    </>
  );
}

ViewDetail.propTypes = {
  setModal: PropTypes.func,
};

export default ViewDetail;
