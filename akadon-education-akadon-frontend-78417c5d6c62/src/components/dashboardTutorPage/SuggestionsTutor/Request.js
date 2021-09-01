import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import React from "react";
import moment from "moment";

import ExclamationIcon from "../../../assets/icons/exclamation-icon.svg";
import CurrencyFormat from "../../utils/CurrencyFormat";

import FormatTimeStamp from "../../utils/FormatTimestamp";
import SubjectImage from "../../utils/SubjectImage";
import FreeKind from "../StudentRequestDetail/FreeKind";
import TimeLength from "../../utils/TimeLength";

const Request = ({ request }) => {
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
  } = request;
  const { t } = useTranslation(["common", "econtract-detail","video","suggest"]);
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
      <h5 className="text-dark flex-grow text-bold2 mb-2">
      {t("video:txt_1")}
      </h5>

      {/* LONG logic bị nhầm và thêm ui */}
      <div className="text-small d-inline-block mb-12px">
        <FreeKind status={is_pre_study} />
      </div>

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
            <span className="text-dark text-bold2">{subject_name}</span>
          </div>

          <div className="mb-3">
            <span className="text-grey mr-2">{t("level")}</span>
            <span className="text-dark text-bold2">{subject_level}</span>
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

          <div className="mb-3">
            <span className="text-grey mr-2">{t("city")}</span>
            <span className="text-dark text-bold2">
              {offline_flag ? city : ""}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">{t("district")}</span>
            <span className="text-dark text-bold2">
              {offline_flag ? district : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-box mb-3">
        <span className="text-grey mr-2 align-self-start text-nowrap">
        {t("suggest:sug_14")}:
        </span>
        {free_time &&
          free_time.map((range, index) => (
            <p className="text-bold2" key={index}>
              {range.start_time.slice(0, 5)} - {range.end_time.slice(0, 5)} /
              Thứ {renderDayInWeek(range.day_in_week)}
            </p>
          ))}
      </div>

      <div className="mb-3">
        <span className="text-grey mr-2">{t("suggest:sug_13")}:</span>
        <span className="text-bold2">
          {end_date && moment(end_date).format("DD/MM/YYYY")}
        </span>
      </div>

      <div className="mb-3">
        <span className="text-grey mr-2">{t("student-info")}</span>
        <span className="text-bold2">{student_info}</span>
      </div>

      <div className="mb-4" style={{ lineHeight: "1.75" }}>
        <span className="text-grey mr-2">{t("student-propose")}</span>
        <span className="text-bold2">{student_propose}</span>
      </div>
    </div>
  );
};

Request.propTypes = {
  request: PropTypes.object,
  suggestRange: PropTypes.array,
};

export default Request;
