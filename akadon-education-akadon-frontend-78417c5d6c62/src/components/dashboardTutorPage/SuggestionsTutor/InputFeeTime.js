import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { FormGroup, Input, InputGroup, Label } from "reactstrap";
import { useTranslation } from "react-i18next";

import "./index.scss";
import {
  DatePicker,
  SuggestDateRange,
  DateClickCalendar,
  InputFee,
} from "../../utils";
import ErrorHandler from "../../ErrorHandler";

const InputFeeTime = ({
  setRequestContent,
  requestContent,
  date,
  setDate,
  suggestRange,
  setSuggestRange,
  is_pre_study,
  setIsStep1Done,
}) => {
  const [error, setError] = useState();
  const { t } = useTranslation(["common", "suggest", "toast"]);

  // handle button
  const fistCheck = () => {
    // 1. Check some required fields
    if (!requestContent.fee) {
      setError("fee");
      return;
    }

    if (!requestContent.number_lesson) {
      setError("numberLesson");
      return;
    }

    if (!requestContent.lesson_time_length) {
      setError("lessonTimeLength");
      return;
    }

    if (!requestContent.start_date) {
      setError("startDate");
      return;
    }
    if (!requestContent.end_date) {
      setError("endDate");
      return;
    }

    // 2. Check is valid start date, end date
    const today = moment();
    const start_date = moment(requestContent.start_date);
    const end_date = moment(requestContent.end_date);
    const isValidDate =
      today.diff(start_date, "hours") < 0 &&
      today.diff(end_date, "hours") < 0 &&
      end_date.diff(start_date, "hours") > 0;
    if (!isValidDate) {
      setError("startDate");
      return;
    }

    // 3. Check date length
    if (is_pre_study) {
      if (date.length <= 0) {
        setError("schedule");
        return;
      }
    }

    // 4. Check suggest range error
    let isInvalidSuggestRange = false;
    suggestRange.map((range) => {
      const { start_time, end_time, day_in_week } = range;
      const isInValidRange =
        !start_time || !end_time || !(day_in_week.length > 0);
      isInValidRange && (isInvalidSuggestRange = true);

      const startDate = moment(start_time);
      const endDate = moment(end_time);
      const isInvalidTime = startDate.diff(endDate, "minutes") > 0;
      isInvalidTime && (isInvalidSuggestRange = true);
    });

    if (isInvalidSuggestRange) {
      setError("suggest");
      return;
    }

    // 4. Reset error
    setError("");
    setIsStep1Done(true);
  };

  let length;
  if (requestContent.lesson_time_length?.includes("a")) {
    length = "";
  } else {
    length = requestContent.lesson_time_length;
  }

  const { end_date } = requestContent;
  let formatedEndDate = end_date;
  if (typeof end_date === "string" && end_date) {
    formatedEndDate = moment(end_date).toDate();
  }

  return (
    <div className="card-style">
      <h6 className="text-bold2 mb-3 text-hightlight1">
        {t("suggest:sug_22")}
      </h6>
      {/* Row 1 */}
      <div className="flex-box align-items- justify-content-sm-between mb-3">
        <div className="w-33">
          <Label className="text-bold2" for="budget">
            {t("suggest:sug_3")}
            <span className="text-danger">*</span>
            {error === "fee" && (
              <ErrorHandler error= {t("suggest:sug_32")} />
            )}
          </Label>
          <InputFee
            inputFee={requestContent.fee}
            data={requestContent}
            setData={setRequestContent}
          />
        </div>

        <div className="w-33">
          <Label className="text-bold2" for="course-duration">
            {t("suggest:sug_4")}
            <span className="text-danger">*</span>
            {error === "numberLesson" && (
              <ErrorHandler error= {t("suggest:sug_32")} />
            )}
          </Label>
          <div className="flex-box w-100 flex-nowrap justify-content-start">
            <Input
              className="border-radius-2 flex-grow mr-12px"
              type="number"
              id="course-duration"
              min={0}
              value={requestContent.number_lesson}
              onChange={(e) =>
                setRequestContent({
                  ...requestContent,
                  number_lesson: e.target.value,
                })
              }
            />
            <Input
              style={{ width: "6rem" }}
              className="border-radius-2"
              value={requestContent.contract_type}
              onChange={(e) =>
                setRequestContent({
                  ...requestContent,
                  contract_type: e.target.value,
                })
              }
              type="select"
            >
              <option value={0}>{t("suggest:sug_28")}</option>
              <option value={1}>{t("suggest:sug_29")}</option>
              <option value={2}>{t("suggest:sug_30")}</option>
              <option value={3}>{t("suggest:sug_31")}</option>
            </Input>
          </div>
        </div>

        <div className="w-33">
          <Label className="text-bold2" for="hour-per-day">
            {t("suggest:sug_5")}
            <span className="text-danger">*</span>
            {error === "lessonTimeLength" && (
              <ErrorHandler error= {t("suggest:sug_32")} />
            )}
          </Label>
          <InputGroup>
            <Input
              className="border-right-0"
              type="select"
              id="hour-per-day"
              min={0}
              value={requestContent.lesson_time_length}
              onChange={(e) =>
                setRequestContent({
                  ...requestContent,
                  lesson_time_length: e.target.value,
                })
              }
            >
              <option value="">{t("common:time1")}</option>
              <>
                <option value={"a1"}>{t("common:time2")}</option>
                <option value={"a2"}>{t("common:time3")}</option>
                <option value={"a3"}>{t("common:time4")}</option>
                <option value={"a4"}>{t("common:time5")}</option>
                <option value={"a5"}>{t("common:time6")}</option>
                <option value={"a6"}>{t("common:time7")}</option>
                <option value={"a7"}>{t("common:time8")}</option>
                <option value={"a8"}>{t("common:time9")}</option>

                <option value={length}>{length}</option>
              </>
            </Input>
          </InputGroup>
        </div>
      </div>

      {/* Row 2 */}
      <div className="datepicker-icon flex-box mb-3">
        <FormGroup className="mr-5 d-flex flex-column">
          <Label className="text-bold2" for="hour-per-day">
            {t("suggest:sug_6")}
            <span className="text-danger">*</span>
            {error === "startDate" && (
              <ErrorHandler error= {t("suggest:sug_33")} />
            )}
          </Label>
          <DatePicker
            className="border-radius-2 cursor-pointer border"
            id="start-date"
            minDate={moment().toDate()}
            selected={requestContent.start_date}
            onChange={(date) =>
              setRequestContent({
                ...requestContent,
                start_date: date,
              })
            }
          />
        </FormGroup>

        <FormGroup className="d-flex flex-column">
          <Label className="text-bold2" for="hour-per-day">
            {t("suggest:sug_7")}
            <span className="text-danger">*</span>
            {error === "endDate" && (
              <ErrorHandler error= {t("suggest:sug_34")} />
            )}
          </Label>
          <DatePicker
            className="border-radius-2 cursor-pointer border"
            id="end-day"
            minDate={moment().toDate()}
            selected={formatedEndDate}
            onChange={(date) =>
              setRequestContent({ ...requestContent, end_date: date })
            }
          />
        </FormGroup>
      </div>

      {/* Row 3 */}
      <FormGroup>
        <Label className="text-bold2 cursor-pointer auto-time">
          {t("suggest:sug_8")}
          {error === "suggest" && (
            <ErrorHandler error= {t("suggest:sug_32")} />
          )}
        </Label>
        <div className="cover">
          {suggestRange.map((range, index) => (
            <SuggestDateRange
              key={range.id}
              range={range}
              suggestRange={suggestRange}
              setSuggestRange={setSuggestRange}
              lastRange={suggestRange.length === index + 1 ? true : false}
            />
          ))}
        </div>
      </FormGroup>

      {/* Row 4 */}
      {is_pre_study && (
        <FormGroup>
          <Label className="text-bold2">
            {t("suggest:sug_26")}
            {error === "schedule" && (
              <ErrorHandler error={t("suggest:sug_27")} />
            )}
          </Label>
          <p className="text-hightlight">{t("suggest:sug_25")}</p>
          <DateClickCalendar date={date} setDate={setDate} trialDate={true} />
        </FormGroup>
      )}

      {/* Row 5 */}
      <div
        className="main-btn text-bold2 d-inline-block px-5"
        onClick={fistCheck}
      >
        {t("suggest:sug_24")}
        <FontAwesomeIcon
          className="ml-2 text-light"
          icon={["fal", "long-arrow-down"]}
        />
      </div>
    </div>
  );
};

export default InputFeeTime;
