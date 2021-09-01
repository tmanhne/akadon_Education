import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

import CurrencyFormat from "../../utils/CurrencyFormat";
import TimeLength from "../../utils/TimeLength";
function TimeAndFee({
  suggestRange,
  timeAndFee,
  setIsTimeAndFeeDone,
  isTimeAndFeeDone,
  studentSend,
  tutor,
}) {
  const { t } = useTranslation(["request-form", "common"]);

  const renderRange = suggestRange?.map((range, index) => {
    const { start_time, end_time, day_in_week } = range;
    // long thêm check nếu học viên đăng yêu cầu thì gọi thêm moment  nếu không thì get thẳng giá trị props
    const startShow = studentSend
      ? moment(start_time).format("HH:mm")
      : start_time;
    const endShow = studentSend ? moment(end_time).format("HH:mm") : end_time;

    return (
      <p className="text-dark text-bold2 ml-2 mr-2 mb-12px" key={index}>
        {startShow} - {endShow} /{t("request-form:day_eng")}
        {day_in_week
          .sort()
          .map((date) =>
            date === 0
              ? t("request-form:sunday")
              : t("request-form:day") + (date * 1 + 1)
          )
          .join(", ")}
      </p>
    );
  });

  return (
    <div className="card-style border-radius-2 p-3 mb-12px">
      <div className="flex-box mb-12px">
        <h6 className="text-dark flex-grow mb-0 text-bold2">{t("header-2")}</h6>
        {isTimeAndFeeDone && (
          <div
            onClick={() => setIsTimeAndFeeDone(false)}
            className="circle-icon btn center-box rounded-circle bg-hightlight-1"
          >
            <FontAwesomeIcon icon={["fal", "pencil"]} />
          </div>
        )}
      </div>

      <div className="pl-4 mb-12px">
        <span className="text-grey mr-2">{t("common:fee")}</span>
        <span className="text-hightlight text-bold2">
          <CurrencyFormat value={timeAndFee.fee} />
        </span>
      </div>

      <div className="pl-4 mb-12px">
        <span className="text-grey mr-2">{t("common:lesson-length")}:</span>
        <span className="text-dark text-bold2">
          <TimeLength length={timeAndFee.lessonTimeLength} />
        </span>
      </div>

      <div className="pl-4 flex-box flex-wrap align-items-start">
        <span className="text-grey mr-1 mb-12px">
          {t("request-form:your_free_time")}:
        </span>

        <div className="text-dark text-bold2">
          {renderRange ? renderRange : t("request-form:no")}
        </div>
      </div>

      <div className="pl-4 mb-12px">
        <span className="text-grey mr-2">
          {t("request-form:online_free_time")}:
        </span>
        <span className="text-dark text-bold2">
          {timeAndFee.is_pre_study
            ? t("request-form:yes")
            : t("request-form:no")}
        </span>
      </div>

      <div className="pl-4 mb-12px">
        <span className="text-grey mr-2">{t("common:end-date")}</span>
        <span className="text-dark text-bold2">
          {/* nếu là gia sư k  cần phải format */}
          {tutor
            ? timeAndFee.end_date
            : timeAndFee.end_date
            ? moment(timeAndFee.end_date).format("DD/MM/YYYY")
            : t("request-form:no")}
        </span>
      </div>
    </div>
  );
}

TimeAndFee.propTypes = {
  timeAndFee: PropTypes.object,
  setIsTimeAndFeeDone: PropTypes.func,
  isTimeAndFeeDone: PropTypes.bool,
};

export default TimeAndFee;
