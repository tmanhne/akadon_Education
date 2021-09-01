import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { getPaymentHistory } from "../../../../api";
import FormatTimestamp from "../../../utils/FormatTimestamp";
import CurrenctFormat from "../../../utils/CurrencyFormat";
import SubLoader from "../../../utils/SubLoader";
import {useQuery} from "../../../../module";
import { useTranslation } from "react-i18next";

function Total({ dateRange }) {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const query = useQuery();
  const status = query.get("status");
  const {t} = useTranslation(["payment"]);

  let paymentToRender = payment;

  useEffect(() => {
    getPayment();
  }, []);

  async function getPayment() {
    try {
      if (status === "all" && payment.length === 0) {
        const res = await getPaymentHistory();
        setLoading(false)
        setPayment([...res.data.transaction]);
      }
    } catch (error) {
    }
  }

  (function filterPayment() {
    paymentToRender = payment.filter((pay) => {
      let isDate = true;
      if (dateRange && dateRange.from) {
        const startTime = new Date(dateRange.from).getTime();
        const endTime = new Date(dateRange.to).getTime();
        const time = new Date(pay.payment_datetime).getTime();
        isDate = time >= startTime && time <= endTime;
      }
      return isDate;
    });
  })();

  const PaymentStatus = ({status}) => {
    if (status * 1 === 0) {
      return (
        <div className="status-success center-box mx-auto text-bold1 text-small border-radius-1 py-1 text-hightlight3">
          {t("payment:status-3")}
        </div>
      );
    } else {
      return (
        <div className="status-fail center-box mx-auto text-bold1 text-small border-radius-1 py-1 text-hightlight">
          {t("payment:status-4")}
        </div>
      );
    }
  };

  if (loading) {return <SubLoader />}

  return (
    <div className="revenue__history-all table-wrapper">
      <table className="w-100 bg-light border-radius-2">
        <thead className="border-radius-2">
          <tr>
            <th className="text-center">{t("payment:item-1-field-1")}</th>
            <th className="text-center" colSpan={3}>
            {t("payment:item-1-field-2")}
            </th>
            <th className="text-center">{t("payment:item-1-field-3")}</th>
            <th className="text-center">{t("payment:item-1-field-4")}</th>
          </tr>
        </thead>
        <tbody>
          {payment.length === 0 && (
            <tr>
              <td className="text-grey text-center" colSpan={6}>
              {t("payment:empty-payment")}
              </td>
            </tr>
          )}

          {payment.length > 0 && paymentToRender.length === 0 && (
            <tr>
              <td className="text-grey text-center" colSpan={6}>
              {t("payment:empty-filter")}
              </td>
            </tr>
          )}
          {payment.length > 0 &&
            paymentToRender.length > 0 &&
            paymentToRender.map((pay, index) => {
              const borderBottom = paymentToRender.length - 1 === index;
              return (
                <tr key={"payment-" + index}>
                  <td className={`text-center p-3 ${!borderBottom && "border-bottom"}`}>
                    <FormatTimestamp timestamp={pay.payment_datetime} />
                  </td>
                  <td className={`text-center p-3 ${!borderBottom && "border-bottom"}`} colSpan={3}>
                    {pay.vpc_OrderInfo}
                  </td>
                  <td className={`text-center p-3 ${!borderBottom && "border-bottom"} text-bold1`}>
                    <CurrenctFormat value={pay.vpc_Amount} />
                  </td>
                  <td className={`text-center p-3 ${!borderBottom && "border-bottom"}`}>
                    <PaymentStatus status={pay.vpc_TxnResponseCode * 1} />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  );
}

Total.propTypes = { dateRange: PropTypes.array };

export default Total;
