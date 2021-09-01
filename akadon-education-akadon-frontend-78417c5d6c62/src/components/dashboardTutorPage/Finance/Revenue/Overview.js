import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CashIcon from "../../../../assets/icons/cash-icon.svg";
import CurrencyFormat from "../../../utils/CurrencyFormat";
import { getUser } from "../../../../api";
import BankList from "./BankList";
import { useTranslation } from "react-i18next";

function Overview() {
  const initCash = {
    totalCash: 0,
    availableCash: 0,
  };
  const [cash, setCash] = useState(initCash);
  const {t} = useTranslation(["payment"]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        const { virt_amount, real_amount } = res.data;
        setCash({ totalCash: virt_amount, availableCash: real_amount });
      } catch (error) {
      }
    })();
  }, []);

  return (
    <>
      <h5 className="text-bold2 text-hightlight1 mb-12px">{t("payment:overview")}</h5>

      <div className="revenue__overview flex-box align-items-stretch w-100 mb-4">
        <div className="card-style mr-3 py-2 border-radius-2">
          <div className="flex-box align-items-start mb-3">
            <div className="mb-2 flex-grow">
              <p className="text-dark text-bold2 mb-0 text-center flex-grow mt-12px mb-3">
              {t("payment:overview-1")}
              </p>
              <p className="h1 mb-4 font-weight-bold text-center text-hightlight3">
                <CurrencyFormat value={cash.totalCash} amountOnly={true} />
              </p>
            </div>
            <Link
              to="/dashboard-tutor/withdrawal"
              className="main-btn text-nowrap bg-hightlight pt-12px pb-12px px-4"
            >
              <img src={CashIcon} width={24} alt="cash" className="mr-12px" />
              {t("payment:overview-2")}
            </Link>
          </div>
          <div>
            <span className="text-dark mr-12px">{t("payment:overview-3")}</span>
            <span className="text-dark text-bold2">
              <CurrencyFormat value={cash.availableCash} amountOnly={true} />
            </span>
          </div>
          <p className="mb-0 text-grey text-small">{t("payment:overview-4")}</p>
        </div>

        <BankList />
      </div>
    </>
  );
}

Overview.propTypes = {};

export default Overview;
