import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Modal, Card } from "reactstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";

import "./index.scss";
import CurrencyFormat from "../../utils/CurrencyFormat";
import ScheduleList from "../../utils/ScheduleList";
import TimeLength from "../../utils/TimeLength";

const ShowFeeTime = ({
  requestContent,
  date,
  suggestRange,
  is_pre_study,
  setIsStep1Done,
}) => {
  const { t } = useTranslation(["common", "suggest", "toast"]);
  const [scheduleModel, setScheduleModel] = useState(false);

  const renderRange = suggestRange?.map((range, index) => {
    const { start_time, end_time, day_in_week } = range;
    // long thêm check nếu học viên đăng yêu cầu thì gọi thêm moment  nếu không thì get thẳng giá trị props
    const startShow = moment(start_time).format("HH:mm");

    const endShow = moment(end_time).format("HH:mm");

    return (
      <p className="text-dark text-bold2 ml-2 mr-2 mb-12px" key={index}>
        {startShow} - {endShow} /{" "}
        {day_in_week
          .sort()
          .map((date) => (date === 0 ? "CN" : "Thứ " + (date * 1 + 1)))
          .join(", ")}
      </p>
    );
  });

  return (
    <>
      <div className="card-style mt-3">
        <div className="flex-box text-bold2 mb-3">
          <h6 className="mb-0 text-bold2 flex-grow">{t("suggest:sug_22")}</h6>
          <button
            onClick={() => setIsStep1Done(false)}
            className="edit-icon center-box rounded-circle border-0 text-light bg-hightlight-1"
          >
            <FontAwesomeIcon icon={["fal", "pencil"]} />
          </button>
        </div>
        <div>
          <div className="mb-12px">
            <span className="text-grey mr-2">{t("suggest:sug_3")}:</span>
            <span className="text-hightlight text-bold2">
              <CurrencyFormat value={requestContent.fee} />
            </span>
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2"> {t("suggest:sug_4")}:</span>
            <span className="text-dark text-bold2">
              {requestContent.number_lesson}{" "}
              {requestContent.contract_type * 1 === 1
                ? t("suggest:sug_29")
                : requestContent.contract_type * 1 === 2
                ? t("suggest:sug_30")
                : requestContent.contract_type * 1 === 0
                ? t("suggest:sug_28")
                : t("suggest:sug_31")}
            </span>
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2"> {t("suggest:sug_5")}:</span>
            <span className="text-dark text-bold2">
              <TimeLength length={requestContent.lesson_time_length} />
            </span>
          </div>

          <div className="mb-12px">
            <span className="text-grey mr-2"> {t("suggest:sug_6")}:</span>
            <span className="text-dark text-bold2">
              {moment(requestContent.start_date).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className="mb-12px">
            <span className="text-grey mr-2"> {t("suggest:sug_7")}:</span>
            <span className="text-dark text-bold2">
              {moment(requestContent.end_date).format("DD/MM/YYYY")}
            </span>
          </div>

          <div className="mb-12px">
            <span className="text-grey mr-1">{t("suggest:sug_8")}:</span>
            <span className="d-inline-flex flex-column">{renderRange}</span>
          </div>

          {is_pre_study && (
            <div className="mb-12px">
              <span className="text-grey mr-2"> {t("suggest:sug_35")}:</span>
              <span
                onClick={() => setScheduleModel(true)}
                className="text-bold2 text-hightlight1 cursor-pointer"
              >
                {t("suggest:sug_36")}
              </span>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={scheduleModel}
        className="request-form-modal card-style"
        style={{ marginTop: "20vh" }}
      >
        <Card className="card-style p-0">
          <div className="mr-3 ml-3">
            <ScheduleList schedule={date} />
          </div>

          <div className="flex-box justify-content-center mt-3">
            <div
              className="cancel-btn px-4 mr-3 cursor-pointer"
              onClick={() => setScheduleModel(false)}
            >
              {t("suggest:sug_37")}
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default ShowFeeTime;
