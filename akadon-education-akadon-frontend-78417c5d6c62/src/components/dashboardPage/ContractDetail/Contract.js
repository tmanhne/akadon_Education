import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { getChatToken, editContractDecided } from "../../../api";
import ExclamationIcon from "../../../assets/icons/exclamation-icon.svg";
import CurrencyFormat from "../../utils/CurrencyFormat";
import ScheduleList from "../../utils/ScheduleList";
import Cancelled from "./Cancelled/Cancelled";
import UserBox from "./UserBox";

const Contract = ({
  request,
  bid,
  userType,
  setEditModal,
  setAcceptModal,
  match,
  listChange,
}) => {
  // state open cancle
  const [cancel, setCancel] = useState(false);
  const [WaitSend, setWaitSend] = useState(false);

  const changeStudentBid = {
    fee: listChange.contract_fee !== listChange.fee ? true : false,
    number_lesson:
      listChange.contract_number_lesson !== listChange.number_lesson
        ? true
        : false,
    lesson_time_length:
      listChange.contract_lesson_time_length !== listChange.lesson_time_length
        ? true
        : false,
    schedule: listChange.schedule ? listChange.schedule : bid.schedule,
  };

  // PROPS EXTRACT
  const { student, tutor, id } = request;
  const latestUpdate = request.updated_datetime;
  const tutorId = bid.tutor && bid.tutor.id;
  const bidId = bid.id;
  const changedContent = {
    fee: request.fee !== bid.fee ? true : false,
    number_lesson: request.number_lesson !== bid.number_lesson ? true : false,
    lesson_time_length:
      request.lesson_time_length !== bid.lesson_time_length ? true : false,
  };

  // USE HISTORY HOOK
  const history = useHistory();
  const { t } = useTranslation(["econtract-detail", "common", "toast"]);

  // FUNCTION DECLARATIONS
  const handleChat = async () => {
    if (!tutorId) {
      toast.error(t("toast:er_13"), { autoClose: false });
      return false;
    }
    const payload = { entity_id: tutorId, chat_message_type: "DM" };
    const res = await getChatToken(payload);
    if (res.status < 400) {
      history.push(`/${match.path.split("/")[1]}/messages/${res.data.room}`);
    } else if (res.response) {
      toast.error(t("toast:er_14"), { autoClose: false });
    }
  };

  // tutor accept/cancle
  const handleCheckEditEContract = async (decide) => {
    if (userType === "tutor") {
      if (request.status !== 7) {
        return true;
      }
    }
    setWaitSend(true);
    if (WaitSend) {
      return true;
    }
    const payload = { request_change_id: listChange.id, decide };
    const res = await editContractDecided(payload);

    if (res.status < 400) {
      decide === 0 && toast.success("Bạn đã từ chối thay đổi E-Contract !");
      decide === 1 && toast.success("Bạn đã chấp thay đổi E-Contract !");
      const url =
        decide === 1
          ? `/dashboard-tutor/courses/pending/${request.id}/${bid.id}`
          : "/dashboard-tutor/home";
      history.push(url);
    } else {
      toast.error(t("toast:er_15"), {
        autoClose: false,
      });
      setWaitSend(false);
    }
  };

  // PREPARING DATA FOR SCHEDULE LIST
  const schedule = bid.schedule || request.schedule;
  let events = [];
  let uniqueEvents = [];
  let monthSchedules = [];

  if (schedule) {
    // GET UNIQUE EVENTS
    events = schedule.map((s) => ({
      ...s,
      date: s.date && s.date.split("/").reverse().join("-"),
    }));
    let uniqueDates = [...new Set(events.map((evt) => evt.date))];
    uniqueDates.map((date) => {
      let event = events.filter((evt) => evt.date === date)[0];
      uniqueEvents.push(event);
    });
    // SPLIT UNIQUE EVENTS INTO EACH MONTH EVENTS
    monthSchedules = [
      ...new Set(
        uniqueEvents.map((evt) => {
          return evt.date && evt.date.split("-").slice(0, 2).join("-");
        })
      ),
    ];
  }

  return (
    <div className="contract-detail-1__contract card-style border-radius-2 mb-3">
      {tutor && student && (
        <UserBox
          tutor={tutor}
          student={student}
          latestUpdate={latestUpdate}
          statusRe={request.status}
        />
      )}
      {/* <div className="flex-box align-items-start">
        <FontAwesomeIcon
          className="text-hightlight2 mr-2 mt-2"
          icon={["fas", "sticky-note"]}
        />
        <p className="text-small font-italic " style={{ color: "#FF6D34"}}>
          Gia sư và học viên trao đổi thêm về thông tin khóa học và có quyền
          thay đổi chi tiết khóa học dựa trên sự đồng ý của cả hai bên
        </p>
      </div> */}
      <div className="flex-box">
        <div className="w-80">
          <div className="mb-12px">
            <span className="text-grey mr-2">{t("common:subject-name")}</span>
            <span className="text-dark text-bold2">{request.subject_name}</span>
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2">{t("common:level")}</span>
            <span className="text-dark text-bold2">
              {request.subject_level}
            </span>
          </div>
          <div className="mb-12px text-nowrap">
            <span className="text-grey mr-2">{t("common:fee")}</span>
            <span
              className={`${
                changedContent.fee ? "modify-field" : "text-hightlight3"
              } ${changeStudentBid.fee ? "modify-field" : ""} text-bold2 mr-1`}
            >
              <CurrencyFormat value={request.fee} />
            </span>
            <img src={ExclamationIcon} alt="exclamation" className="mr-2" />
            {changedContent.fee && (
              <>
                <FontAwesomeIcon
                  icon={["fal", "arrow-right"]}
                  className="mx-2 text-hightlight1"
                />
                <span
                  className={`${
                    changeStudentBid.fee ? "modify-field" : ""
                  } new-value d-inline-block px-2 text-bold1`}
                >
                  <CurrencyFormat value={bid.fee} />
                </span>
              </>
            )}
            {changeStudentBid.fee && (
              <>
                <FontAwesomeIcon
                  icon={["fal", "arrow-right"]}
                  className="mx-2 text-hightlight1"
                />
                <span className="new-value d-inline-block px-2 text-bold1">
                  <CurrencyFormat value={listChange.fee} />
                </span>
              </>
            )}
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2">{t("common:course-length")}</span>
            <span
              className={`${changedContent.number_lesson && "modify-field"} ${
                changeStudentBid.number_lesson && "modify-field"
              } text-dark text-bold2`}
            >
              {request.number_lesson}{" "}
              <span className="ml-1">{t("common:lesson")}</span>
            </span>
            {changedContent.number_lesson && (
              <>
                <FontAwesomeIcon
                  icon={["fal", "arrow-right"]}
                  className="mx-2 text-hightlight1"
                />
                <div
                  className={`${
                    changeStudentBid.number_lesson && "modify-field"
                  } new-value d-inline-block px-2 text-bold1`}
                >
                  {bid.number_lesson} {t("common:lesson")}
                </div>
              </>
            )}
            {changeStudentBid.number_lesson && (
              <>
                <FontAwesomeIcon
                  icon={["fal", "arrow-right"]}
                  className="mx-2 text-hightlight1"
                />
                <div className="new-value d-inline-block px-2 text-bold1">
                  {listChange.number_lesson} {t("common:lesson")}
                </div>
              </>
            )}
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2">{t("common:lesson-length")}</span>
            <span
              className={`${
                changedContent.lesson_time_length && "modify-field"
              } ${
                changeStudentBid.lesson_time_length && "modify-field"
              } text-dark text-bold2`}
            >
              {request.lesson_time_length} {t("common:hour")}
            </span>
            {changedContent.lesson_time_length && (
              <>
                <FontAwesomeIcon
                  icon={["fal", "arrow-right"]}
                  className="mx-2 text-hightlight1"
                />
                <div
                  className={`${
                    changeStudentBid.lesson_time_length && "modify-field"
                  } new-value d-inline-block px-2 text-bold1`}
                >
                  {bid.lesson_time_length || 0} {t("common:hour")}
                </div>
              </>
            )}
            {changeStudentBid.lesson_time_length && (
              <>
                <FontAwesomeIcon
                  icon={["fal", "arrow-right"]}
                  className="mx-2 text-hightlight1"
                />
                <div className="new-value d-inline-block px-2 text-bold1">
                  {listChange.lesson_time_length || 0} {t("common:hour")}
                </div>
              </>
            )}
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2">{t("common:is-offline")}</span>
            <span className="text-dark text-bold2">
              {request.offline_flag
                ? "Offline (Gia sư tại nhà)"
                : "Online (Học trực tuyến)"}
            </span>
          </div>
        </div>
        {/* Button here */}
        <div
          className={`align-self-start ml-auto had ${
            userType === "tutor" && "disable-overlay"
          }`}
        >
          <div onClick={() => setEditModal(true)} className="main-btn px-4">
            {t("econtract-detail:edit-btn")}
          </div>
        </div>
        {/* Button here */}
      </div>
      {request.offline_flag && (
        <>
          <div className="flex-box mb-12px">
            <div className="w-50">
              <span className="text-grey mr-2">{t("common:city")}</span>
              <span className="text-dark text-bold2">{request.city}</span>
            </div>
            <div className="w-50">
              <span className="text-grey mr-2">{t("common:district")}</span>
              <span className="text-dark text-bold2">{request.district}</span>
            </div>
          </div>
        </>
      )}
      <div className="flex-box mb-12px">
        <div className="w-50">
          <span className="text-grey mr-2">{t("common:start-date")}</span>
          <span className="text-dark text-bold2">
            {bid.start_date || "Not setting yet"}
          </span>
        </div>
        <div className="w-50">
          <span className="text-grey mr-2">{t("common:end-date")}</span>
          <span className="text-dark text-bold2">
            {bid.end_date || "Not setting yet"}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <p className="mb-12px text-grey">{t("common:schedule")}</p>
      </div>
      <div className="mb-3">
        <ScheduleList schedule={listChange.schedule || request.schedule} />
      </div>
      <div className="mb-12px">
        <p className="text-grey mb-2">{t("common:teach-plan")}</p>
        <p className="mb-0 text-dark text-bold1" style={{ lineHeight: "1.75" }}>
          {bid.contract_plan}
        </p>
      </div>
      <div className="mb-12px">
        <p className="text-grey mb-2">{t("common:student-info")}</p>
        <p className="mb-0 text-dark text-bold1" style={{ lineHeight: "1.75" }}>
          {request.student_info}
        </p>
      </div>
      <div className="mb-12px">
        <p className="text-grey mb-2">{t("common:student-propose")}</p>
        <p className="mb-0 text-dark text-bold1" style={{ lineHeight: "1.75" }}>
          {request.student_propose}
        </p>
      </div>
      <div className="cta-box my-5 flex-box justify-content-around">
        <div
          onClick={handleChat}
          className="mr-3 bg-hightlight main-btn textlight text-bold2 orange-btn-hover"
        >
          {userType === "student"
            ? t("econtract-detail:chat-with-tutor")
            : t("econtract-detail:chat-with-student")}
        </div>
        {userType === "student" && (
          <>
            <div
              onClick={() => setAcceptModal(true)}
              className="mr-3 main-btn textlight text-bold2"
            >
              {t("common:accept")}
            </div>
            <div
              onClick={() => setCancel(!cancel)}
              className="cancel-btn text-hightlight1 text-bold2"
            >
              {t("common:cancel")}
            </div>
            {cancel && (
              <Cancelled
                cancel={cancel}
                setCancel={setCancel}
                bidId={bidId}
                id={id}
              />
            )}
          </>
        )}
        {userType === "tutor" && (
          <>
            <div
              onClick={() => handleCheckEditEContract(1)}
              className={`${request.status !== 7 && "disable-overlay"}
              ${WaitSend && "disable-overlay"}
               mr-3 main-btn textlight text-bold2`}
            >
              {t("common:accept")}
            </div>
            <div
              onClick={() => handleCheckEditEContract(0)}
              className={`${request.status !== 7 && "disable-overlay"}
              ${WaitSend && "disable-overlay"}
               cancel-btn cancle text-hightlight1 text-bold2`}
            >
              {t("common:cancel")}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Contract.propTypes = {
  request: PropTypes.object,
  bid: PropTypes.object,
  userType: PropTypes.string,
  setEditModal: PropTypes.func,
  setAcceptModal: PropTypes.func,
  match: PropTypes.object,
};

export default Contract;
