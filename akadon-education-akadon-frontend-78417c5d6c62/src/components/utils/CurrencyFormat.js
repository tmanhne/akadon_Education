import React from "react";
import { useTranslation } from "react-i18next";

const CurrencyFormat = ({ value, amountOnly }) => {
  const { t } = useTranslation(["request-page", "common"]);
  const valueArray = value ? value.toString().split("") : [];
  const valueLength = valueArray.length;
  const formatedValue = valueArray
    .reverse()
    .map((value, index) => {
      if ((index + 1) % 3 === 0 && index + 1 < valueLength) {
        return `.${value}`;
      }
      return value;
    })
    .reverse()
    .join("");
  return (
    <span className="setcol">
      {formatedValue || 0} {amountOnly ? t("common:money-sign") : t("currency-unit")}
    </span>
  );
};

export default CurrencyFormat;
