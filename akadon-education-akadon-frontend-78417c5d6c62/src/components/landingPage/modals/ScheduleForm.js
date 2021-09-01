import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { DatePicker, SuggestDateRange } from "../../utils";
import ErrorHandler from "../../ErrorHandler";

function ScheduleForm({ modal, setModal, t }) {
  const { payload } = modal;
  const { end_date, free_time } = payload;

  let initRange = [];
  if (free_time) {
    initRange = free_time.map((time) => ({ ...time, id: uuidv4() }));
  } else {
    initRange = [
      {
        id: uuidv4(),
        start_time: "",
        end_time: "",
        day_in_week: [],
      },
    ];
  }

  const [suggestRange, setSuggestRange] = useState(initRange);
  const [error, setError] = useState("");

  function nextStep(e) {
    e.preventDefault();
    const free_time = [];
    suggestRange.forEach((range) => {
      const { start_time, end_time, day_in_week } = range;
      if (day_in_week.length === 0 || !start_time || !end_time) {
        return;
      }

      const start_date = moment(start_time);
      const end_date = moment(end_time);
      if (end_date.diff(start_date, "minutes") < 30) {
        return;
      }

      free_time.push({
        start_time: moment(start_time).format("HH:mm"),
        end_time: moment(end_time).format("HH:mm"),
        day_in_week,
      });
    });

    if (free_time.length === 0) {
      setError("free_time");
      return;
    }

    setModal({
      ...modal,
      payload: { ...payload, free_time, end_date, step: 5 },
    });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "heroFlow",
      step: 4,
      stepDetail: {
        heroFlowWindow: free_time,
        heroFlowBestBefore: end_date,
        heroFlowBLocalRange: suggestRange,
      },
    });
  }

  return (
    <>
      <FontAwesomeIcon
        className="text-grey h4 mb-0"
        icon={["fas", "arrow-left"]}
        onClick={() => setModal({ ...modal, payload: { ...payload, step: 3 } })}
      />
      <h4 className="mb-4 font-weight-bold text-center">
        {t("landing-page:req_12")}
      </h4>
      <Form onSubmit={(e) => e.preventDefault()} className="mx-auto">
        <FormGroup>
          <Label className="text-bold2 cursor-pointer mb-12px">
            {t("landing-page:req_15")}
            <span className="text-danger">*</span>
            {error === "free_time" && (
              <ErrorHandler error={t("landing-page:req_38")} />
            )}
          </Label>

          {suggestRange.map((range, index) => (
            <SuggestDateRange
              key={range.id}
              range={range}
              suggestRange={suggestRange}
              setSuggestRange={setSuggestRange}
              lastRange={suggestRange.length === index + 1 ? true : false}
            />
          ))}

          <p className="text-hightlight font-italic mb-12px">
            {t("landing-page:req_13")}
          </p>
        </FormGroup>

        <FormGroup className="datepicker-icon mb-4">
          <Label
            className="mb-12px text-bold2 cursor-pointer"
            for="expected-end-date"
          >
            {t("landing-page:req_14")}
          </Label>
          <DatePicker
            className="border-radius-2 px-3 border"
            minDate={moment().toDate()}
            selected={end_date}
            onChange={(date) =>
              setModal({ ...modal, payload: { ...payload, end_date: date } })
            }
            id="expected-end-date"
          />
        </FormGroup>

        <button
          onClick={(e) => nextStep(e)}
          className="main-btn-new text-uppercase py-0 w-100 mb-5"
        >
          {t("common:next-btn")}
          <FontAwesomeIcon
                  icon={["fas", "arrow-right"]}
                  className="btn-arrow facebook-class"
                />
        </button>
      </Form>
    </>
  );
}

ScheduleForm.propTypes = { modal: PropTypes.object, setModal: PropTypes.func };

export default ScheduleForm;
