import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import ExclamationIcon from "../../../assets/icons/exclamation-icon.svg";
import FreeKind from "../../dashboardTutorPage/StudentRequestDetail/FreeKind";
import CurrencyFormat from "../../utils/CurrencyFormat";
import FormatTimeStamp from "../../utils/FormatTimestamp";

import ScheduleList from "../../utils/ScheduleList";
import SubjectImage from "../../utils/SubjectImage";
import TimeLength from "../../utils/TimeLength";
import Subject from "../../utils/Subject";
import Level from "../../utils/Level";

const Request = ({ request, status, userType, setCancle, cancle, trail }) => {
  // EXTRACT PROPS
  const { schedule } = request;
  const { t } = useTranslation(["common", "econtract-detail", "free-kind"]);

  return (
    <div className="px-1">
      <div className="flex-box align-items-center mb-12px">
        <h5 className="text-dark flex-grow text-bold2 mb-0">
          {t("econtract-detail:title-1")}
        </h5>
        {userType === "student" && (
          <div
            style={{ background: "rgba(3, 103, 180, 0.3)" }}
            className="border-radius-1 text-hightlight1 text-bold1 px-2 py-1 text-nowrap"
            id="none"
          >
            {status}
          </div>
        )}
        {trail && <FreeKind status={true} />}
      </div>
      <div className="flex-box">
        <div className="align-self-start">
          <SubjectImage
            subject={request.subject_name}
            width={109}
            height={109}
          />
        </div>
        <div className="ml-12px">
          <div className="mb-3">
            <span className="text-grey mr-2">{t("common:created-date")}</span>
            <span className="text-dark text-bold2">
              <FormatTimeStamp timestamp={request.created_datetime} />
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">{t("request-header")}:</span>
            <span className="text-dark text-bold2">
              {request.request_header}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">{t("subject-name")}:</span>
            <span className="text-dark text-bold2">
              <Subject subject={request.subject_name} />
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">{t("level")}:</span>
            <span className="text-dark text-bold2">
              <Level level={request.subject_level} />
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">{t("common:is-offline")}:</span>
            <span className="text-dark text-bold2">
              {request.offline_flag
                ? t("econtract-detail:offline")
                : t("econtract-detail:online")}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">{t("budget")}:</span>
            <span className="text-hightlight3 text-bold2">
              <CurrencyFormat value={request.fee} />
              <img width={12} src={ExclamationIcon} alt="exclamation" />
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">{t("course-length")}</span>
            <span className="text-dark text-bold2">
              {request.number_lesson
                ? request.number_lesson +
                  <span className="ml-1">{t("lesson")}</span>
                : t("free-kind:txt_8")}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">{t("lesson-length")}:</span>
            <span className="text-dark text-bold2">
              <TimeLength length={request.lesson_time_length} />
            </span>
          </div>
          {request.offline_flag && (
            <>
              <div className="mb-3">
                <span className="text-grey mr-2">{t("city")}</span>
                <span className="text-dark text-bold2">{request.city}</span>
              </div>
              <div className="mb-3">
                <span className="text-grey mr-2">{t("district")}</span>
                <span className="text-dark text-bold2">{request.district}</span>
              </div>
            </>
          )}
          {request.start_date && (
            <div className="mb-3">
              <span className="text-grey mr-2">
                {t("common:start-course")}:
              </span>
              <span className="text-dark text-bold2">{request.start_date}</span>
            </div>
          )}
          {request.end_date && (
            <div className="mb-3">
              <span className="text-grey mr-2">{t("common:end-course")}</span>
              <span className="text-dark text-bold2">{request.end_date}</span>
            </div>
          )}
          <div className="mb-3">
            <p className="text-grey mr-2 mb-0">{t("schedule")}</p>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <ScheduleList schedule={schedule} />
      </div>
      <div className="mb-3" style={{ lineHeight: "1.75" }}>
        <p className="text-grey mb-0">{t("student-info")}</p>
        <p className="mb-0">{request.student_info}</p>
      </div>
      <div className="mb-4" style={{ lineHeight: "1.75" }}>
        <p className="text-grey mb-0">{t("student-propose")}</p>
        <p className="mb-0">{request.student_propose}</p>
      </div>
      {status === "Đang mở" && (
        <div className="center-box">
          <div
            onClick={() => setCancle(!cancle)}
            className="cancel-btn d-inline-block px-5 mx-auto mb-3"
          >
            <FontAwesomeIcon className="mr-2" icon={["fal", "times"]} />
            <span className="font-weight-bold">{t("delete-request")}</span>
          </div>
        </div>
      )}
    </div>
  );
};

Request.propTypes = {
  request: PropTypes.object,
  status: PropTypes.string,
};

export default Request;
