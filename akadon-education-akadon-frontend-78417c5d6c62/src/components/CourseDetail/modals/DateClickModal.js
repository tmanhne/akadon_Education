import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Form, FormGroup, Label } from "reactstrap";
import moment from "moment";
import { useTranslation } from "react-i18next";

import ErrorHandler from "../../ErrorHandler";

function DateClickModal({
  dateClickModal,
  setDateClickModal,
  setEditedLesson,
}) {
  // LOCAL STATE DECLERATIONS
  const [lesson, setLesson] = useState({ start_time: "", end_time: "" });
  const [error, setError] = useState("");
  const {t} = useTranslation("course-detail");

  // FUNCTION DECLERATIONS
  function handleSetLesson(e) {
    e.preventDefault();
    // 1. Check start_time and end_time is valid
    if (!lesson.start_time) {
      setError("start_time");
      return;
    }

    if (!lesson.end_time) {
      setError("end_time");
      return;
    }

    // 2. Check is start_time is smaller than end_time
    const dateStr = dateClickModal.date.format("YYYY-MM-DD");
    const startDate = moment(dateStr + " " + lesson.start_time);
    const endDate = moment(dateStr + " " + lesson.end_time);
    const timeDistance = endDate.diff(startDate, "minutes");

    if (timeDistance < 0) {
      setError("end_time");
      return;
    }

    // 3. Reset Error and save data
    setError("");
    setEditedLesson({
      date: dateClickModal.date,
      start_time: lesson.start_time,
      end_time: lesson.end_time,
    });
    setDateClickModal({ ...dateClickModal, isOpen: false });
  }
  return (
    <Form>
      <div className="flex-box align-items-stretch">
        <FormGroup className="w-50">
          <Input
            type="time"
            className="border-radius-2 d-block mb-2"
            id="startTime"
            value={lesson.start_time}
            onChange={(e) =>
              setLesson({ ...lesson, start_time: e.target.value })
            }
          />
          <Label
            htmlFor="startTime"
            className="text-grey text-center d-block cursor-pointer"
          >
            {t("start_time")}
            {error === "start_time" && (
              <p className="text-center">
                <ErrorHandler error="Không hợp lệ !" />
              </p>
            )}
          </Label>
        </FormGroup>
        <span className="dash-sign align-self-start px-3"> - </span>
        <FormGroup className="w-50">
          <Input
            type="time"
            className="border-radius-2 d-block mb-2"
            id="endTime"
            value={lesson.end_time}
            onChange={(e) => setLesson({ ...lesson, end_time: e.target.value })}
          />
          <Label
            htmlFor="endTime"
            className="text-grey text-center d-block cursor-pointer"
          >
            {t("end_time")}
            {error === "end_time" && (
              <p className="text-center">
                <ErrorHandler error="Không hợp lệ !" />
              </p>
            )}
          </Label>
        </FormGroup>
      </div>
      <div className="flex-box px-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            setDateClickModal({ ...dateClickModal, isOpen: false });
          }}
          className="cancel-btn w-50 mr-3"
        >
          {t("cancel")}
        </button>
        <button
          onClick={handleSetLesson}
          type="submit"
          className="main-btn w-50"
        >
          {t("confirm")}
        </button>
      </div>
    </Form>
  );
}

DateClickModal.propTypes = {
  setEditedLesson: PropTypes.func,
  dateClickModal: PropTypes.object,
  setDateClickModal: PropTypes.func,
};

export default DateClickModal;
