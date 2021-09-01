import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CurrencyFormat from "../utils/CurrencyFormat";
import FormatTimeStamp from "../utils/FormatTimestamp";

// LISTING ALL CHANGED CONTRACTS
const EContractLog = ({ changeList }) => {
  const [hide, setHide] = useState(false);
  const HandleUp = () => {
    hide === true ? setHide(false) : setHide(true);
  };

  const { t } = useTranslation(["common", "econtract-detail"]);

  return (
    <div className="e-contract-change-log__log card-style border-radius-2 py-0 px-2 mb-3">
      <div className="header bg-hightlight text-bold1 text-light mb-2">
        <div> </div>
        {t("econtract-detail:econtract-log")}
        <div
          className={`${hide === true ? "active" : "de-active"} pr-2`}
          onClick={HandleUp}
        >
          <FontAwesomeIcon icon={["fas", "chevron-up"]} className="mx-2" />
        </div>
      </div>
      {changeList !== 0 &&
        hide === false &&
        changeList.map((change) => (
          <div key={change.id}>
            <div className="p-2 mb-2" style={{ background: "#EAF4FC" }}>
              <p className="mb-1 flex-grow">
                <FormatTimeStamp timestamp={change.created_datetime} />
                <FontAwesomeIcon icon={["fas", "circle"]} className="circle" />
                {change.user}
              </p>

              {change.contract_fee !== change.fee && (
                <div className="mb-2 pl-3 text-nowrap">
                  <span className="text-grey mr-2">{t("common:budget")}</span>
                  <span className="modify-field text-grey mr-1">
                    <CurrencyFormat value={change.contract_fee} />
                  </span>
                  <FontAwesomeIcon
                    icon={["fal", "arrow-right"]}
                    className="mx-2 text-hightlight1"
                  />
                  <span className="px-2 new-value">
                    <CurrencyFormat value={change.fee} />
                  </span>
                </div>
              )}

              {change.contract_number_lesson !== change.number_lesson && (
                <div className="mb-2 pl-3 text-nowrap">
                  <span className="text-grey mr-2">
                    {t("common:course-length")}
                  </span>
                  <span className="modify-field text-grey mr-1">
                    {change.contract_number_lesson} {t("common:lesson")}
                  </span>
                  <FontAwesomeIcon
                    icon={["fal", "arrow-right"]}
                    className="mx-2 text-hightlight1"
                  />
                  <span className="px-2 new-value">
                    {change.number_lesson}
                    <span className="ml-1">{t("common:lesson")}</span>
                  </span>
                </div>
              )}

              {change.contract_lesson_time_length !==
                change.lesson_time_length && (
                <div className="mb-2 pl-3 text-nowrap">
                  <span className="text-grey mr-2">
                    {t("common:lesson-length")}
                  </span>
                  <span className="modify-field text-grey mr-1">
                    {change.contract_lesson_time_length} {t("common:hour")}
                  </span>
                  <FontAwesomeIcon
                    icon={["fal", "arrow-right"]}
                    className="mx-2 text-hightlight1"
                  />
                  <span className="px-2 new-value">
                    {change.lesson_time_length} {t("common:hour")}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default EContractLog;
