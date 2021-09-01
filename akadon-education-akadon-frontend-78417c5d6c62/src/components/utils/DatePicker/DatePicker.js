import React from "react";
import DPK from "react-datepicker";

import "./index.scss";
function DatePicker(props) {
  return (
    <DPK
      {...props}
      dateFormat="dd/MM/yyyy"
      placeholderText="dd/mm/yyyy"
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      locale="vi"
    />
  );
}

export default DatePicker;
