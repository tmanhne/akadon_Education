import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import DropdownDateOfWeek from "./DropdownDateOfWeek";

function SuggestDateRange({ suggestRange, setSuggestRange, range, lastRange }) {
  const { t } = useTranslation("date");
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
    const updatedRange = suggestRange.filter(r => r.id !== range.id);
    setSuggestRange([...updatedRange]);
  }

  return (
    <div className="suggest-time flex-box mb-12px py-0">
      <div className="flex-box w-50 border border-radius-2 mr-3">
        <Input
          value={range.start_time}
          onChange={(e) => handleChangeRange({ start_time: e.target.value })}
          className="border-0 pr-0"
          type="time"
        />
        <span className="mx-2 h2 mb-0">-</span>
        <Input
          value={range.end_time}
          onChange={(e) => handleChangeRange({ end_time: e.target.value })}
          className="border-0 pr-0"
          type="time"
        />
      </div>
      <div className="flex-box w-50">
        <div className="flex-box flex-grow border border-radius-2 pl-1 pr-1 mr-3 h-100">
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
