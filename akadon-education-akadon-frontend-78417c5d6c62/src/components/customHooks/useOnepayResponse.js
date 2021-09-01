import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useQuery, generateOnepayHash } from "../../module";
import { updatePayment } from "../../api";

import { useTranslation } from "react-i18next";

function useOnepayResponse() {
  const { t } = useTranslation("toast");
  const [paymentResponse, setPaymentResponse] = useState({
    status: "",
    payload: "",
  });
  const query = useQuery();

  useEffect(() => {
    handleResponse();
  }, []);

  async function handleResponse() {
    const vpc_Amount = query.get("vpc_Amount");
    const vpc_Card = query.get("vpc_Card");
    const vpc_CardNum = query.get("vpc_CardNum");
    const vpc_CardUid = query.get("vpc_CardUid");
    const vpc_Command = query.get("vpc_Command");
    const vpc_CurrencyCode = query.get("vpc_CurrencyCode");
    const vpc_Locale = query.get("vpc_Locale");
    const vpc_MerchTxnRef = query.get("vpc_MerchTxnRef");
    const vpc_Merchant = query.get("vpc_Merchant");
    const vpc_Message = query.get("vpc_Message");
    const vpc_OrderInfo = query.get("vpc_OrderInfo");
    const vpc_PayChannel = query.get("vpc_PayChannel");
    const vpc_SecureHash = query.get("vpc_SecureHash");
    const vpc_TokenExp = query.get("vpc_TokenExp");
    const vpc_TokenNum = query.get("vpc_TokenNum");
    const vpc_TransactionNo = query.get("vpc_TransactionNo");
    const vpc_TxnResponseCode = query.get("vpc_TxnResponseCode");

    // CHECK IS REDIRECT PAYMENT LINK FROM ONEPAY
    if (vpc_TxnResponseCode === null) return;

    // 1. Check is vpc_SecureHash valid
    const queryString = query.toString();
    const queryArr = queryString.split("&");
    const { length } = queryArr;
    const hashString = queryArr.slice(0, length - 1).join("&");
    const hash = generateOnepayHash(hashString);
    if (hash !== vpc_SecureHash) {
      toast.error(t("toast:er_9"));
      return;
    }

    // 2. Check vpc_TxnResponseCode error
    if (vpc_TxnResponseCode * 1 !== 0) {
      // const error = catchOnePayError(vpc_TxnResponseCode);
      // toast.error(error);
      setPaymentResponse({ status: "fail" });
      return;
    }

    // 3. Call api
    const payload = {
      vpc_Amount,
      vpc_Card,
      vpc_CardUid,
      vpc_CurrencyCode,
      vpc_Command,
      vpc_Locale,
      vpc_MerchTxnRef,
      vpc_Merchant,
      vpc_Message,
      vpc_OrderInfo,
      vpc_PayChannel,
      vpc_SecureHash,
      vpc_TokenExp,
      vpc_TokenNum,
      vpc_TransactionNo,
      vpc_TxnResponseCode,
    };
    const res = await updatePayment(payload);
    if (res.status < 400) {
      setPaymentResponse({ status: "success", payload: vpc_OrderInfo });
    } else {
      setPaymentResponse({ status: "fail" });
    }
  }
  return paymentResponse;
}

export default useOnepayResponse;
