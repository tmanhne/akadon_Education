import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import ExclamationIcon from "../../../assets/icons/exclamation-icon.svg";
import CurrencyFormat from "../../utils/CurrencyFormat";
import FormatTimeStamp from "../../utils/FormatTimestamp";
import Subject from "../../utils/Subject";
import Level from "../../utils/Level";
import SubjectImage from "../../utils/SubjectImage";
import TimeLength from "../../utils/TimeLength";
import PushCountDown from "../PushRequestHistory/PushCountDown";

const Request = ({ request, setModal, bidList, setPush }) => {
  const {
    is_pre_study,
    created_datetime,
    request_header,
    subject_name,
    subject_level,
    offline_flag,
    fee,
    lesson_time_length,
    free_time,
    end_date,
    student_info,
    student_propose,
    city,
    district,
    expired_datetime,
  } = request;

  const { t } = useTranslation([
    "common",
    "econtract-detail",
    "request-page",
    "request-detail",
  ]);

  function renderDayInWeek(arrOfDay) {
    return arrOfDay
      .map((day) => {
        if (day * 1 === 0) {
          return "CN";
        } else {
          return day * 1 + 1;
        }
      })
      .join(", ");
  }

  return (
    <div className="px-1">
      <h5 className="text-dark flex-grow text-bold2 mb-3">
        {t("request-detail:request_content")}
      </h5>
      {/* LOGIC KHI CÓ DANH SÁCH BID CỦA GIA SƯ MWOIS HIỂN THỊ ĐẨY TIN TUYỂN */}
      {bidList && (
        <>
          {request.priority * 1 === 1 ? (
            <div
              className="w-100 d-flex justify-content-center mb-4 py-2 text-hightlight"
              style={{ background: "#FFE3D9" }}
            >
              {t("request-detail:time")}
              <div className="text-bold2 ml-1 ">
                <PushCountDown
                  expireDate={expired_datetime || moment().add(7, `d`)}
                />
              </div>
            </div>
          ) : (
            <div
              className="btn text-nowrap mb-4 text-light bg-hightlight-1 boder-radius-4 w-100 py-2 text-bold2 "
              style={{ fontSize: "16px" }}
              onClick={() => setPush({ isOpen: true, content: { ...request } })}
            >
              {t("request-page:push-status-1")}
            </div>
          )}
        </>
      )}

      <div className="flex-box">
        <div className="align-self-start">
          <SubjectImage subject={subject_name} width={109} height={109} />
        </div>

        <div className="ml-12px">
          <div className="mb-3">
            <span className="text-grey mr-2">{t("common:created-date")}</span>
            <span className="text-dark text-bold2">
              <FormatTimeStamp timestamp={created_datetime} />
            </span>
          </div>

          <div className="mb-3">
            <span className="text-grey mr-2">{t("request-header")}</span>
            <span className="text-dark text-bold2">{request_header}</span>
          </div>

          <div className="mb-3">
            <span className="text-grey mr-2">{t("subject-name")}</span>
            <span className="text-dark text-bold2">
              <Subject subject={subject_name} />
            </span>
          </div>

          <div className="mb-3">
            <span className="text-grey mr-2">{t("level")}</span>
            <span className="text-dark text-bold2">
              <Level level={subject_level} />
            </span>
          </div>

          <div className="mb-3">
            <span className="text-grey mr-2">{t("common:is-offline")}</span>
            <span className="text-dark text-bold2">
              {offline_flag
                ? t("econtract-detail:offline")
                : t("econtract-detail:online")}
            </span>
          </div>

          <div className="mb-3">
            <span className="text-grey mr-2">{t("budget")}</span>
            <span className="text-hightlight3 text-bold2">
              <CurrencyFormat value={fee} />
              <img width={12} src={ExclamationIcon} alt="exclamation" />
            </span>
          </div>

          <div className="mb-3">
            <span className="text-grey mr-2">{t("lesson-length")}</span>
            <span className="text-dark text-bold2">
              <TimeLength length={lesson_time_length} />
            </span>
          </div>

          {offline_flag && (
            <>
              <div className="mb-3">
                <span className="text-grey mr-2">{t("city")}</span>
                <span className="text-dark text-bold2">{city}</span>
              </div>
              <div className="mb-3">
                <span className="text-grey mr-2">{t("district")}</span>
                <span className="text-dark text-bold2">{district}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-box flex-wrap">
        <span className="text-grey mr-2 align-self-start text-nowrap">
          {t("request-detail:your_free_time")}
        </span>
        {free_time &&
          free_time.map((range, index) => (
            <p className="text-bold2" key={index}>
              {range.start_time.slice(0, 5)} - {range.end_time.slice(0, 5)} /
              {t("request-detail:day")} {renderDayInWeek(range.day_in_week)}
            </p>
          ))}
      </div>

      <div className="mb-3">
        <span className="text-grey mr-2">{t("request-detail:is_trial")}</span>
        <span className="text-bold2">
          {is_pre_study ? t("request-detail:yes") : t("request-detail:no")}
        </span>
      </div>

      <div className="mb-3">
        <span className="text-grey mr-2">{t("request-detail:due_date")}</span>
        <span className="text-bold2">{end_date || t("request-detail:no")}</span>
      </div>

      <div className="mb-3">
        <span className="text-grey mr-2">{t("student-info")}</span>
        <span className="text-bold2">{student_info}</span>
      </div>

      <div className="mb-4" style={{ lineHeight: "1.75" }}>
        <span className="text-grey mr-2">{t("student-propose")}</span>
        <span className="text-bold2">{student_propose}</span>
      </div>

      <div className="center-box mb-4">
        <button
          onClick={() => setModal(true)}
          className="cancel-btn flex-box px-4 text-bold2"
        >
          <FontAwesomeIcon icon={["fas", "times"]} className="mr-3 h4 mb-0" />
          {t("request-detail:cancel")}
        </button>
      </div>
    </div>
  );
};

Request.propTypes = {
  request: PropTypes.object,
  suggestRange: PropTypes.array,
};

export default Request;
