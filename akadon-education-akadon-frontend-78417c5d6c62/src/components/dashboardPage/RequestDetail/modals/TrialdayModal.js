import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { submitTrialDate } from "../../../../api";
import { useTranslation } from "react-i18next";

function TrialdayModal({ setModal, pre_study_time, bidId }) {
  const { t } = useTranslation(["toast", "request-detail"]);
  const [trialday, setTrialday] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const trialdays = pre_study_time.map((time, index) => ({
    ...time,
    id: index,
  }));

  async function submitTrialDay() {
    if (!trialday) {
      toast.error(t("toast:er_25"));
      return;
    }

    const payload = {
      bid_contract_id: bidId,
      lesson_date: trialday.date,
      start_time: trialday.start_time,
      end_time: trialday.end_time,
    };

    setLoading(true);
    const res = await submitTrialDate(payload);
    setLoading(false);

    if (res.status < 400) {
      toast.success(t("request-detail:toast_success"));
      history.push("/dashboard/request?status=pre-accept-bid");
      setModal(false);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  return (
    <>
      <div className="flex-box px-4 py-3 mb-3 border-bottom">
        <h5 className="flex-grow text-center mb-0 text-bold2">
          {t("request-detail:select_trial_day")}
        </h5>
        <FontAwesomeIcon
          onClick={() => setModal(false)}
          icon={["fal", "times"]}
          className="text-grey h4 mb-0"
        />
      </div>

      <p className="px-5 mb-4 text-center">
        {t("request-detail:please_select_date")}
      </p>

      <div className="flex-box mb-4 px-4 flex-wrap">
        {trialdays.map((day) => (
          <p
            key={day.id}
            onClick={() => setTrialday(day)}
            style={
              trialday && trialday.id === day.id
                ? { background: "#EAF4FC" }
                : {}
            }
            className="border-radius-1 border cursor-pointer py-2 px-3 mr-2"
          >
            {day.start_time.slice(0, 5)}-{day.end_time.slice(0, 5)} -{" "}
            {moment(day.date, "DD/MM/YYYY").format("DD/MM")}
          </p>
        ))}
      </div>

      <div className="center-box mb-3 px-4">
        <button
          disabled={loading}
          onClick={() => setModal(false)}
          className="cancel-btn w-50 mr-3"
        >
          {t("request-detail:back")}
        </button>
        <button
          onClick={submitTrialDay}
          disabled={loading}
          className="main-btn w-50"
        >
          {t("request-detail:accept")}
        </button>
      </div>
    </>
  );
}

TrialdayModal.propTypes = {
  setModal: PropTypes.func,
  pre_study_time: PropTypes.array,
  bidId: PropTypes.number,
};

export default TrialdayModal;
