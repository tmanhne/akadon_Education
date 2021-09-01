import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, InputGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../../../utils";

import ErrorHandler from "../../../ErrorHandler";
import SuggestDateRange from "../../../utils/SuggestDateRange/SuggestDateRange";
import InputFee from "../../../utils/InputFee/InputFee";
function TimeAndFeeInput({
  timeAndFee,
  setTimeAndFee,
  initTimeAndFee,
  setIsTimeAndFeeDone,
  isSubjectInfoDone,
  suggestRange,
  setSuggestRange,
}) {
  // LOCAL STATE DECLARATIONS
  const [error, setError] = useState("");
  const { t } = useTranslation(["request-form", "common"]);

  // IMPLEMENT SOME PROPS
  const isModify =
    JSON.stringify(initTimeAndFee) === JSON.stringify(timeAndFee);

  if (isModify && !isSubjectInfoDone) {
    return (
      <div className="card-style border-radius-2 mb-12px">
        <h6 className="text-grey mb-0 text-bold2">{t("header-2")}</h6>
      </div>
    );
  }

  // FUNCTION DECLARATIONS
  function submit() {
    // 1. Check fee error
    if (timeAndFee.fee * 1 < 1) {
      setError("fee");
      return;
    }

    // 2. Check lesson length error
    if (!timeAndFee.lessonTimeLength) {
      setError("lessonTimeLength");
      return;
    }

    // 3. Check is valid end date
    if (timeAndFee.end_date) {
      const today = moment();
      const endDate = moment(timeAndFee.end_date);
      const isInvalidEndDate = today.diff(endDate, "hours") > 0;
      if (isInvalidEndDate) {
        setError("end_date");
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

    // Cleanup error and move to next stage

    setError("");
    setTimeAndFee({ ...timeAndFee });
    setIsTimeAndFeeDone(true);
  }

  return (
    <div className="time-and-fee-input card-style border-radius-2 mb-12px">
      <h6 className="text-hightlight1 mb-12px text-bold2">{t("header-2")}</h6>
      <p className="text-grey mb-12px text-bold1">
        <span className="text-danger">*</span> {t("request-form:require-field")}
      </p>
      {/* Row 1 */}
      <div className="mobile-row flex-box align-items-start">
        <FormGroup className="w-50 mr-3">
          <Label className="text-bold2 cursor-pointer" for="budget">
            {t("field-1")} <span className="text-danger">*</span>
            {error === "fee" && <ErrorHandler error={t("common-error")} />}
          </Label>
          <InputFee
            inputFee={timeAndFee.fee}
            data={timeAndFee}
            setData={setTimeAndFee}
          />
        </FormGroup>

        <FormGroup className="w-50">
          <Label className="text-bold2 cursor-pointer" for="hour-per-day">
            {t("common:lesson-length")} <span className="text-danger">*</span>
            {error === "lessonTimeLength" && (
              <ErrorHandler error={t("common-error")} />
            )}
          </Label>
          <InputGroup>
            <Input
              className="border-radius-2"
              type="select"
              id="hour-per-day"
              value={timeAndFee.lessonTimeLength}
              required
              onChange={(e) =>
                setTimeAndFee({
                  ...timeAndFee,
                  lessonTimeLength: e.target.value,
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
              </>
            </Input>
          </InputGroup>
        </FormGroup>
      </div>

      {/* Row 2 */}
      <FormGroup>
        <Label className="text-bold2 cursor-pointer">
          {t("request-form:free_time")}
          <span className="text-danger"> *</span>
          {error === "suggest" && (
            <ErrorHandler error={t("request-form:common-error")} />
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
      </FormGroup>

      {/* Row 3 */}
      <FormGroup>
        <p className="text-hightlight font-italic">
          {t("request-form:trial_note")}
        </p>
        <div className="trial-checkbox flex-box">
          <p className="m-0 text-bold2">{t("request-form:is_trial")}</p>
          <Label className="m-0 ml-5">
            <Input
              type="radio"
              name="is_pre_study"
              defaultChecked={timeAndFee.is_pre_study}
              onChange={() =>
                setTimeAndFee({ ...timeAndFee, is_pre_study: true })
              }
            />
            {t("request-form:yes")}
          </Label>
          <Label className="m-0 ml-5">
            <Input
              type="radio"
              name="is_pre_study"
              defaultChecked={!timeAndFee.is_pre_study}
              onChange={() =>
                setTimeAndFee({ ...timeAndFee, is_pre_study: false })
              }
            />
            {t("request-form:no")}
          </Label>
        </div>
      </FormGroup>

      {/* Row 4 */}
      <FormGroup className="date-box">
        <Label
          className="d-block mb-12px text-bold2 cursor-pointer"
          for="expected-end-date"
        >
          {t("request-form:end_time")}
          {error === "end_date" && (
            <span className="ml-2">
              <ErrorHandler error="Ngày không hợp lệ !" />
            </span>
          )}
        </Label>

        <DatePicker
          className="border-radius-2 px-3 cursor-pointer"
          minDate={moment().toDate()}
          selected={timeAndFee.end_date}
          onChange={(date) => setTimeAndFee({ ...timeAndFee, end_date: date })}
          id="expected-end-date"
        />
      </FormGroup>

      {/* Row 5 */}
      <div className="flex-box font-weight-bold mb-4">
        <div onClick={submit} className="main-btn flex-box py-0 px-4">
          <p className="mr-3 mb-0 flex-grow">{t("common:next-btn")}</p>
          <FontAwesomeIcon icon={["fas", "arrow-down"]} />
        </div>
      </div>
    </div>
  );
}

TimeAndFeeInput.propTypes = {
  timeAndFee: PropTypes.object,
  setTimeAndFee: PropTypes.func,
  initTimeAndFee: PropTypes.object,
  date: PropTypes.array,
  setDate: PropTypes.func,
  setIsTimeAndFeeDone: PropTypes.func,
  isSubjectInfoDone: PropTypes.bool,
};

export default TimeAndFeeInput;
