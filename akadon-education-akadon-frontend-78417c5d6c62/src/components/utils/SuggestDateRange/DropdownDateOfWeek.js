import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TranslateDate from "./TranslateDate";
import { useTranslation } from "react-i18next";

function DropdownDateOfWeek({ range, handleChangeRange }) {
  const { t } = useTranslation("date");
  // LOCAL STATE DECLARATIONS
  const [day_in_week, set_day_in_week] = useState(range.day_in_week || []);

  // SIDE EFFECTS
  useEffect(() => {
    handleChangeRange({ day_in_week });
  }, [day_in_week]);

  const init_day_in_week = [0, 1, 2, 3, 4, 5, 6];

  const listStr = day_in_week.sort();

  // FUNCTION DECLARATIONS
  function handleCheckbox(key) {
    if (day_in_week.includes(key)) {
      const update_day_in_week = day_in_week.filter((date) => date !== key);
      set_day_in_week([...update_day_in_week]);
    } else {
      set_day_in_week([...day_in_week, key]);
    }
  }

  return (
    <UncontrolledDropdown
      className="checkbox-dropdown flex-grow"
      style={{ width: "190px" }}
    >
      <DropdownToggle
        className={`border-0 w-100 text-truncate position-relative dropdown-btn bg-light text-left pr-4 ${
          listStr.length > 0 ? "text-dark" : "text-grey"
        }`}
        style={{height:"33.5px"}}
      >
        {/* LONG thêm sort cho ngày chọn */}
        {listStr.length > 0
          ? listStr.map((date) => t(date)).join(", ")
          : t("wait_indrop")}
        <div className="position-absolute" style={{ right: "0", top: "30%" }}>
          <FontAwesomeIcon className="text-grey" icon={["fas", "angle-down"]} />
        </div>
      </DropdownToggle>

      <DropdownMenu className="w-100">
        {init_day_in_week.map((key, index) => (
          <DropdownItem
            className="flex-box align-items-center"
            key={key}
            toggle={false}
          >
            <FormGroup className="mb-0 w-100 flex-box align-items-center">
              <Input
                onChange={() => handleCheckbox(key)}
                value={key}
                id={`date-${range.id}-${index}`}
                type="checkbox"
                defaultChecked={day_in_week.includes(key) ? true : false}
              />
              <Label
                className="m-0 p-0 w-100 cursor-pointer mt-1"
                for={`date-${range.id}-${index}`}
              >
                <TranslateDate datas={index} range={range} />
              </Label>
            </FormGroup>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

DropdownDateOfWeek.propTypes = {
  suggestRange: PropTypes.array,
  setSuggestRange: PropTypes.func,
};

export default DropdownDateOfWeek;
