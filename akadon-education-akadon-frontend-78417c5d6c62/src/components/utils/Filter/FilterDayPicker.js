import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./index.scss";

const FilterDayPicker = ({ dateRange, setDateRange }) => {
  // LOCAL STATE DECLARATIONS
  const [ranges, setRanges] = useState({ from: "", to: "" });
  const [toggle, setToggle] = useState(false);
  const language = useSelector(({ appConfig }) => appConfig.language);

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
    const range = DateUtils.addDayToRange(day, ranges);
    const from = new Date(range.from);
    from.setHours(0);
    const to = new Date(range.to);
    to.setHours(24);
    setRanges({ from, to });
  }

  function accept() {
    if (!ranges.from) return;
    setDateRange({ from: ranges.from, to: ranges.to });
    setToggle(!toggle);
  }

  function cancle() {
    setDateRange();
    setRanges({ from: "", to: "" });
    setToggle(!toggle);
  }

  // REACT-DAY-PICKER EVENTS SETTING
  const { from, to } = ranges;
  const modifiers = { start: ranges.from, end: ranges.to };

  // REACT-DAY-PICKER CONFIGURE
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
        <div onClick={cancle} className="cancel-btn py-1 px-5 mr-3">
          Hủy
        </div>
        <div onClick={accept} className="main-btn py-1">
          Chấp nhận
        </div>
      </div>
    </div>
  );
};

export default FilterDayPicker;
