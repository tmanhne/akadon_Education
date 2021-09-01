import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import CurrencyFormat from "../utils/CurrencyFormat";
import Subject from "../utils/Subject";
import Level from "../utils/Level";
import TimeLength from "../utils/TimeLength";
function TrialLessonCard({ lesson, status, tutor_free_time }) {
  const { t } = useTranslation(["common","video"]);
  function convertDayInWeek(day) {
    if (day === 0) return "CN";
    return day + 1;
  }

  const free_time_str = tutor_free_time.map((time, index) => (
    <p key={index} className="mb-2">
      {time.start_time.slice(0, 5)} - {time.end_time.slice(0, 5)}, Thứ{" "}
      {time.day_in_week.map(convertDayInWeek).join(", ")}
    </p>
  ));

  return (
    <div className="card-style border-radius-2 box-shadow p-3 h-100">
      <div className="flex-box mb-12px">
        <h5 className="mb-0 text-bold2 flex-grow">{t("request_content")}</h5>
        <div
          className={`text-small text-bold2 border-radius-1 py-1 pl-12px pr-12px ${
            status === 0 ? "active-status" : "inactive-status"
          }`}
        >
          {t("pending")}
        </div>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("request-header")}</span>
        <span className="text-bold2">{lesson.request_header}</span>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("subject-name")}</span>
        <span className="text-bold2">
          <Subject subject={lesson.subject_name} />
        </span>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("level")}</span>
        <span className="text-bold2">
          <Level level={lesson.subject_level} />
        </span>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("is-offline")}</span>
        <span className="text-bold2 text-hightlight3">
          {lesson.offline_flg ? "Offline" : "Online"}
        </span>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("budget")}</span>
        <span className="text-bold2 text-hightlight">
          <CurrencyFormat value={lesson.fee} />
        </span>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("lesson-length")}</span>
        <span className="text-bold2">
          <TimeLength length={lesson?.lesson_time_length} />
        </span>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("free_time")}</span>
        <span className="text-bold2">{free_time_str}</span>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("is_trial")}</span>
        <span className="text-bold2">
          {lesson.is_pre_study ? t("yes") : t("no")}
        </span>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("student-info")}</span>
        <p className="text-bold1 mb-0">{lesson.student_info}</p>
      </div>

      <div className="mb-2">
        <span className="text-grey mr-2">{t("student-propose")}</span>
        <p className="text-bold1 mb-0">{lesson.student_propose}</p>
      </div>
    </div>
  );
}

TrialLessonCard.propTypes = {
  lesson: PropTypes.object,
  status: PropTypes.number,
};

export default TrialLessonCard;
