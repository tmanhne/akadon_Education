import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./index.scss";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useTranslation } from "react-i18next";

import FilterIcon from "../../../assets/icons/filter-icon.svg";

function FilterDate({ filterDate, setFilterDate }) {
  const [toggle, setToggle] = useState(false);
  const language = useSelector(({ appConfig }) => appConfig.language);
  const { t } = useTranslation("filter");
  // SIDE EFFECTS
  useEffect(() => {
    const dateContainer = document.getElementById("filter-date");
    if (toggle) {
      dateContainer.style.display = "none";
    } else {
      dateContainer.style.display = "block";
    }
  });

  // FUNCTION DECLARATIONS
  function handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, filterDate);
    const from = new Date(range.from);
    from.setHours(0);
    const to = new Date(range.to);
    to.setHours(24);
    setFilterDate({ from, to });
  }

  // REACT-DAY-PICKER CONFIGURE
  const { from, to } = filterDate;
  const modifiers = { start: filterDate.from, end: filterDate.to };
  const WEEKDAYS_SHORT =
    language === "vi"
      ? ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthAndYear = ({ date }) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (
      <div className="DayPicker-Caption text-hightlight1 text-bold2">
        {month < 10 ? `0${month}/${year}` : `${month}/${year}`}
      </div>
    );
  };

  return (
    <UncontrolledDropdown>
      <DropdownToggle className="filter-btn text-nowrap px-0 py-1 bg-light text-small text-dark text-bold2 border-0">
        <span className="mr-2">{t("updated_date")}</span>
        <img src={FilterIcon} alt="filter" />
      </DropdownToggle>
      <DropdownMenu className="filter-picker border-0 box-shadow border-radius-2 px-2">
        <DropdownItem toggle={false} className="p-0">
          <div id="filter-date" className="card-style box-shadow">
            <DayPicker
              className="Selectable"
              numberOfMonths={1}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={handleDayClick}
              locale="vi"
              weekdaysShort={WEEKDAYS_SHORT}
              captionElement={monthAndYear}
            />
            <div className="center-box">
              <div
                onClick={() => {
                  setToggle(!toggle);
                  setFilterDate({});
                }}
                className="cancel-btn mr-3 py-1"
              >
                {t("cancel")}
              </div>
              <div onClick={() => setToggle(!toggle)} className="main-btn py-1">
              {t("confirm")}
              </div>
            </div>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

FilterDate.propTypes = {
  filterDate: PropTypes.object,
  setFilterDate: PropTypes.func,
};

export default FilterDate;
