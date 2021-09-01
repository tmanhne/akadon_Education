// AUTHOR LONG
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";

import "./index.scss";
import { rejectBidContract } from "../../../../api";
import { useTranslation } from "react-i18next";

const DeclineModal = ({ setModal, bidId }) => {
  const { t } = useTranslation(["toast", "request-detail"]);
  // LOCAL STATE
  const [loading, setLoading] = useState(false);
  const [decline, setDecline] = useState("");

  // INIT DATA
  const declineList = [
    t("request-detail:reason_1"),
    t("request-detail:reason_2"),
    t("request-detail:reason_3"),
    t("request-detail:reason_4"),
    t("request-detail:reason_5"),
    t("request-detail:reason_6"),
  ];

  async function handleDecline() {
    if (loading) {
      return true;
    }

    if (!decline) {
      toast.error(t("toast:er_24"));
      return;
    }

    const payload = { bid_contract_id: bidId, reject_reason: decline };

    setLoading(true);
    const res = await rejectBidContract(payload);
    setLoading(false);

    if (res.status < 400) {
      toast.success(t("request-detail:toast_text") + decline);
      setModal(false);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status}`);
    }
  }

  return (
    <>
      <div className="flex-box border-bottom justify-content-center mb-3 p-3">
        <h5 className="text-center mb-0 text-bold2 flex-grow">
          {t("request-detail:reject")}
        </h5>
        <FontAwesomeIcon
          className="text-grey h4 mb-0"
          icon={["fal", "times"]}
          onClick={() => setModal(false)}
        />
      </div>

      <p className="text-center px-5">{t("request-detail:reject_question")}</p>

      <div className="flex-box flex-wrap px-3 mb-4">
        {declineList.map((declineStr) => (
          <p
            key={declineStr}
            className={`${
              decline === declineStr && "active"
            } decline-str py-2 px-3 mr-2 cursor-pointer`}
            onClick={() => setDecline(declineStr)}
          >
            {declineStr}
          </p>
        ))}
      </div>

      <div className="flex-box justify-content-center mt-3 mb-4">
        <button
          className="cancel-btn px-5 mr-2"
          disabled={loading}
          onClick={() => setModal(false)}
        >
          {t("request-detail:back")}
        </button>
        <button
          disabled={loading}
          className="main-btn px-5 ml-2"
          onClick={handleDecline}
        >
          {t("request-detail:accept")}
        </button>
      </div>
    </>
  );
};

export default DeclineModal;
