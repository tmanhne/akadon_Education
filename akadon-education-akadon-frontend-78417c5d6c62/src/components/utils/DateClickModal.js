import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

import ErrorHandler from "../ErrorHandler";

const DateClickModal = ({ modal, setModal, setDate, date, lessons }) => {
  // EXTRACT PROPS
  const formatedDateModal = moment(modal).format("YYYY-MM-DD");
  const currentLessons = lessons.filter((ls) => {
    try {
      const formatedLessonDate = moment(ls.lesson_date, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      return formatedDateModal === formatedLessonDate;
    } catch (error) {
      // console.log(error);
    }
  });

  // LOCAL STATE DECLARATIONS
  const initDateTime = {
    date: moment(formatedDateModal).format("DD/MM/YYYY"),
    start_time: "",
    end_time: "",
  };
  const [err, setErr] = useState("");
  const [dateTime, setDateTime] = useState(initDateTime);
  const { t } = useTranslation("date");

  // SIDE EFFECTS
  useEffect(() => {
    const isSelectedDate = date.find((d) => {
      const formatedDate = moment(d.date, "DD/MM/YYYY").format("YYYY-MM-DD");
      return formatedDate === formatedDateModal;
    });
    if (isSelectedDate) {
      const { date, start_time, end_time } = isSelectedDate;
      const startTime = moment("1994-06-25 " + start_time).toDate();
      const endTime = moment("1994-06-25 " + end_time).toDate();
      setDateTime({ date, start_time: startTime, end_time: endTime });
    }
  }, [date, modal]);

  // FUNCTION DECLARATIONS
  function handleRemoveDate() {
    // FORMAT DATE TO YYYY-MM-DD
    const updatedDate = date.filter((d) => {
      const formatedDate = moment(d.date, "DD/MM/YYYY").format("YYYY-MM-DD");
      return formatedDate !== formatedDateModal;
    });
    setDate(updatedDate);
    setModal("");
  }

  function handleAddDate() {
    const { start_time, end_time } = dateTime;
    // 1. Check start_time and end_time is setting yet
    if (start_time === "" || end_time === "") {
      setErr(t("err_1"));
      return;
    }

    // 2. Reset error and check end_time (check by hours) is larger than start_time
    setErr("");

    const startTime = moment(start_time);
    const endTime = moment(end_time);
    if (startTime.diff(endTime, "minutes") >= 0) {
      setErr(t("err_2"));
      return;
    }

    // 3. Reset error and close modal
    setErr("");

    const isExistDate = date.find((d) => {
      const formatedDate = moment(d.date, "DD/MM/YYYY").format("YYYY-MM-DD");
      const formatedDateTime = moment(dateTime.date, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      return formatedDate === formatedDateTime;
    });

    if (isExistDate) {
      const updatedDate = date.map((d) => {
        const formatedDate = moment(d.date, "DD/MM/YYYY").format("YYYY-MM-DD");
        const formatedDateTime = moment(dateTime.date, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        );
        if (formatedDate === formatedDateTime) {
          return {
            start_time: moment(start_time).format("HH:mm"),
            end_time: moment(end_time).format("HH:mm"),
            date: moment(dateTime.date, "DD/MM/YYYY").format("DD/MM/YYYY"),
          };
        } else {
          return { ...d };
        }
      });
      setDate(updatedDate);
    } else {
      setDate([
        ...date,
        {
          start_time: moment(start_time).format("HH:mm"),
          end_time: moment(end_time).format("HH:mm"),
          date: moment(dateTime.date, "DD/MM/YYYY").format("DD/MM/YYYY"),
        },
      ]);
    }
    setModal("");
  }

  return (
    <div className="date-click-modal">
      <div
        style={{ margin: "0 -0.75rem 1rem -0.75rem" }}
        className="flex-box border-bottom px-3 pb-12px"
      >
        <h6 className="mb-0 flex-grow text-center text-bold2">Thời gian học</h6>
        <FontAwesomeIcon
          onClick={() => setModal("")}
          className="h4 mb-0 text-grey"
          icon={["fal", "times"]}
        />
      </div>

      {currentLessons.length > 0 && (
        <>
          <div className="flex-box align-items-center mb-3">
            <div
              style={{ height: "8px", width: "8px" }}
              className="rounded-circle bg-hightlight-1 mr-2"
            ></div>
            <span className="text-small text-grey">{t("subject")}</span>
          </div>
          <div className="ml-3 mb-3">
            {currentLessons.map((ls, index) => {
              // SERVER CAN NOT RETURN RIGHT FORMAT "HH:MM" THUS CLIENT IMPLEMENT IT BY HIM SELF
              const startTime = ls.start_time && ls.start_time.slice(0, 5);
              const endTime = ls.end_time && ls.end_time.slice(0, 5);
              return (
                <div key={index} className="flex-box mb-2">
                  <div className="text-bold1">
                    {startTime || "00:00"} - {endTime || "00:00"}
                  </div>
                  <div
                    style={{ width: "4px", height: "4px" }}
                    className="bg-hightlight-1 mx-3 rounded-circle"
                  ></div>
                  <div>{ls.subject_name}</div>
                  <div
                    style={{ width: "4px", height: "4px" }}
                    className="bg-hightlight-1 mx-3 rounded-circle"
                  ></div>
                  <div>{ls.tutor_name}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="flex-box align-items-center mb-5">
        <div
          style={{ height: "8px", width: "8px" }}
          className="rounded-circle bg-hightlight-1 mr-2"
        ></div>
        <div className="position-relative">
          <DatePicker
            selected={dateTime.start_time}
            onChange={(date) => setDateTime({ ...dateTime, start_time: date })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption={t("start_time")}
            dateFormat="HH:mm"
            placeholderText={t("start_time")}
            locale="vi"
            className="border border-radius-2 w-100 text-center"
          />
        </div>
        <div className="mx-3 text-bold2">-</div>
        <div className="position-relative">
          <DatePicker
            selected={dateTime.end_time}
            onChange={(date) => setDateTime({ ...dateTime, end_time: date })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption={t("end_time")}
            dateFormat="HH:mm"
            placeholderText={t("end_time")}
            locale="vi"
            className="border border-radius-2 w-100 text-center"
          />
        </div>
      </div>

      {err && (
        <p className="text-small mb-3">
          <ErrorHandler error={err} />
        </p>
      )}

      <div className="flex-box justify-content-end">
        <div onClick={() => handleAddDate()} className="main-btn mr-3">
          {t("update")}
        </div>
        <div
          onClick={handleRemoveDate}
          className="main-btn cancel-btn text-bold2"
        >
          {t("cancel")}
        </div>
      </div>
    </div>
  );
};

DateClickModal.propTypes = {
  modal: PropTypes.string,
  setModal: PropTypes.func,
  setDate: PropTypes.func,
  date: PropTypes.array,
  lessons: PropTypes.array,
};

export default DateClickModal;
