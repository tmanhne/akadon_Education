import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";

import { trialDateDecide } from "../../../api";
import ScheduleList from "../../utils/ScheduleList";
import TimeLength from "../../utils/TimeLength";
import DeclineModal from "./modals/DeclineModal";
import TrialdayModal from "./modals/TrialdayModal";

const BidDetail = ({ bid, request }) => {
  const history = useHistory();
  const [declineModal, setDeclineModal] = useState(false);
  const [trialdayModal, setTrialdayModal] = useState(false);
  const [loading, setLoading] = useState([]);
  const { t } = useTranslation(["common", "request-page", "request-detail"]);

  const free_time = bid.free_time || [];

  function renderDayInWeek(arr) {
    return arr
      .map((item) => {
        if (item === 0) {
          return "CN";
        } else {
          return item * 1 + 1;
        }
      })
      .join(", ");
  }

  async function handleAccept() {
    const payload = {
      contract_id: request.id,
      bid_id: bid.id,
      decide: 1,
    };

    setLoading(true);
    const res = await trialDateDecide(payload);
    setLoading(false);

    if (res.status < 400) {
      toast.success(t("request-detail:accept_success"));
      history.push(`/dashboard/courses/pending-course/${request.id}`);
    } else if (res.response) {
      toast.error(` ${t("toast:er_1")}  ${res.response.status} !`);
    }
  }

  return (
    <div className="request-detail__bid-detail pt-3">
      <h4 className="mb-3 text-bold2">{t("request-detail:teach_request")}</h4>

      <div className="mb-12px flex-box">
        <span className="text-grey init-flex-basis mr-2">
          {t("course-length")}
        </span>
        <span className="text-dark text-bold1">
          {bid.number_lesson} {t("lesson")}{" "}
        </span>
      </div>

      <div className="mb-12px flex-box">
        <span className="text-grey init-flex-basis mr-2">
          {t("lesson-length")}
        </span>
        <span className="text-dark text-bold1">
          <TimeLength length={bid.lesson_time_length} />
        </span>
      </div>

      <div className="mb-12px flex-box">
        <span className="text-grey init-flex-basis mr-2">
          {t("start-date")}
        </span>
        <span className="text-dark text-bold1">{bid.start_date}</span>
      </div>

      <div className="mb-12px flex-box">
        <span className="text-grey init-flex-basis mr-2">{t("end-date")}</span>
        <span className="text-dark text-bold1">{bid.end_date}</span>
      </div>

      {request.is_pre_study && (
        <div className="mb-12px">
          <span className="text-grey mr-2 mb-2 d-inline-block">
          {t("request-detail:trial_date")}
          </span>
          <div className="schedule mb-12px">
            <ScheduleList schedule={bid.pre_study_time || []} />
          </div>
        </div>
      )}

      <div className="flex-box align-items-start">
        <span className="text-grey init-flex-basis text-nowrap mr-2">
        {t("request-detail:free_time")}
        </span>
        <div>
          {free_time.map((time, index) => (
            <p key={index} className="text-bold1">
              {time.start_time.slice(0, 5)} - {time.end_time.slice(0, 5)} / Thứ{" "}
              {renderDayInWeek(time.day_in_week)}
            </p>
          ))}
        </div>
      </div>

      <div className="mb-12px flex-box align-items-start">
        <span className="text-grey init-flex-basis text-nowrap mr-2">
          {t("teach-plan")}
        </span>
        <span className="text-dark text-bold1">{bid.contract_plan}</span>
      </div>

      <div className="mb-12px flex-box align-items-start">
        <span className="text-grey init-flex-basis text-nowrap mr-2">
          {t("course-objective")}
        </span>
        <span className="text-dark text-bold1">{bid.goal}</span>
      </div>

      <div className="center-box">
        <button
          className="cancel-btn mr-2"
          onClick={() => setDeclineModal(true)}
        >
          {t("request-detail:reject")}
        </button>

        {bid.pre_study_time && bid.pre_study_time.length > 0 ? (
          <button
            onClick={() => setTrialdayModal(true)}
            className="main-btn d-inline-block px-3 bg-hightlight font-weight-bold orange-btn-hover ml-2"
          >
            {t("request-detail:free_trial")}
          </button>
        ) : (
          <button onClick={handleAccept} className="main-btn d-inline-block">
            {t("request-detail:accept")}
          </button>
        )}
      </div>

      <Modal
        isOpen={declineModal}
        centered={true}
        contentClassName="card-style p-0"
      >
        <DeclineModal setModal={setDeclineModal} bidId={bid.id} />
      </Modal>

      <Modal
        isOpen={trialdayModal}
        centered={true}
        contentClassName="card-style p-0"
      >
        <TrialdayModal
          setModal={setTrialdayModal}
          bidId={bid.id}
          pre_study_time={bid.pre_study_time || []}
        />
      </Modal>
    </div>
  );
};

BidDetail.propTypes = {
  bid: PropTypes.object,
};

export default BidDetail;
