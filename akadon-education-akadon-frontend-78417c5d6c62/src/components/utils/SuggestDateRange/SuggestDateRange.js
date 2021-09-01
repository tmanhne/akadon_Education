import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import moment from "moment";

import "./index.scss";
import DropdownDateOfWeek from "./DropdownDateOfWeek";

function SuggestDateRange({ suggestRange, setSuggestRange, range, lastRange }) {
  const { t } = useTranslation("date");

  const { start_time, end_time } = range;
  let start_date = start_time;
  if (typeof start_time !== "object" && start_time) {
    start_date = moment("2010-01-01 " + start_time).toDate();
  }

  let end_date = end_time;
  if (typeof end_time !== "object" && end_time) {
    end_date = moment("2010-01-01 " + end_time).toDate();
  }

  // FUNCTION DECLARATIONS
  function addRange() {
    const initRange = {
      id: uuidv4(),
      start_time: "",
      end_time: "",
      day_in_week: [],
    };
    const updateSuggestRange = [...suggestRange, { ...initRange }];
    setSuggestRange(updateSuggestRange);
  }

  function handleChangeRange(value) {
    const updateRange = suggestRange.map((sg) => {
      if (sg.id === range.id) {
        return { ...range, ...value };
      }

      return { ...sg };
    });
    setSuggestRange([...updateRange]);
  }

  function removeRange() {
    const updatedRange = suggestRange.filter((r) => r.id !== range.id);
    setSuggestRange([...updatedRange]);
  }

  return (
    <div className="suggest-time flex-box mb-12px py-0">
      <div className="flex-box w-50 border border-radius-2 mr-3 px-1">
        <DatePicker
          selected={start_date}
          onChange={(date) => handleChangeRange({ start_time: date })}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption={t("start_time")}
          dateFormat="HH:mm"
          placeholderText={t("start_time")}
          locale="vi"
          className="border-0 w-100 text-center"
        />
        <span className="mx-2 h2 mb-0">-</span>
        <DatePicker
          selected={end_date}
          onChange={(date) => handleChangeRange({ end_time: date })}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption={t("end_time")}
          dateFormat="HH:mm"
          placeholderText={t("end_time")}
          className="border-0 w-100 text-center"
          locale="vi"
        />
      </div>
      <div className="flex-box flex-grow w-50">
        <div className="flex-box flex-grow px-2 mr-3 border-radius-2 border h-100">
          <span>{t("wait")}</span>
          <DropdownDateOfWeek
            handleChangeRange={handleChangeRange}
            range={range}
          />
        </div>

        {lastRange ? (
          <div
            onClick={addRange}
            className="plus-btn btn center-box rounded-circle text-light text-bold1 cursor-pointer"
          >
            +
          </div>
        ) : (
          <div onClick={removeRange}>
            <FontAwesomeIcon
              className="text-danger h2 mb-0"
              icon={["fas", "times-circle"]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

SuggestDateRange.propTypes = {
  suggestRange: PropTypes.array,
  setSuggestRange: PropTypes.func,
};

export default SuggestDateRange;
