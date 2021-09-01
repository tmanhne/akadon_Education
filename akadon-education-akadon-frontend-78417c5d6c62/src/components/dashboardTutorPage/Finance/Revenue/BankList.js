import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Input, Label } from "reactstrap";

import BankCardImg from "../../../../assets/icons/bank-card.svg";
import OptionActiveIcon from "../../../../assets/icons/option-active-icon.svg";
import OptionIcon from "../../../../assets/icons/option-icon.svg";
import { getBankList } from "../../../../api";
import { useTranslation } from "react-i18next";

function BankList() {
  const [bankList, setBankList] = useState([]);
  const { t } = useTranslation(["payment"]);

  const defaulBank = bankList.find((bank) => bank.is_default === true) || {};
  const bankCard =
    Object.keys(defaulBank).length > 0 ? defaulBank.bank_card.slice(-4) : "";
  // SIDE EFFECTS
  useEffect(() => {
    fetchBankList();
  }, []);

  async function fetchBankList() {
    const res = await getBankList();
    if (res.status < 400) {
      const data = res.data || [];
      let fetchedData = [];
      data.map((d) => {
        if (d.is_default) {
          fetchedData.unshift(d);
        } else {
          fetchedData.push(d);
        }
      });
      setBankList([...fetchedData]);
    }
  }

  return (
    <div className="bank-list card-style border-radius-2">
      <h6 className="text-bold2 text-center mb-4 mt-12px">
        {t("payment:overview-5")}
      </h6>

      <div className="mb-12px flex-box align-items-start mb-4">
        <div className="text-bold2 w-75 flex-shrink-1 mr-2 flex-grow">
          <p className="mb-0 text-truncate">
            {defaulBank.bank}
          </p>
          <div>
            <FontAwesomeIcon
              className="text-small-1 mr-1"
              icon={["fas", "asterisk"]}
            />
            <FontAwesomeIcon
              className="text-small-1 mr-1"
              icon={["fas", "asterisk"]}
            />
            <FontAwesomeIcon
              className="text-small-1 mr-1"
              icon={["fas", "asterisk"]}
            />
            <FontAwesomeIcon
              className="text-small-1 mr-2"
              icon={["fas", "asterisk"]}
            />
            <span>{bankCard}</span>
          </div>
        </div>

        <div className="default-box text-nowrap border-radius-1 py-1 px-2 text-light text-bold2 text-small">
        {t("payment:default")}
        </div>
      </div>

      <div className="center-box">
        <Link
          to="/dashboard-tutor/finance/banking"
          className="main-btn px-5 pt-12px pb-12px text-decoration-none"
        >
          {t("payment:overview-6")}
        </Link>
      </div>
    </div>
  );
}

BankList.propTypes = {};

export default BankList;
