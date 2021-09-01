import React from "react";
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
import { useTranslation } from "react-i18next";

import "./index.scss";
import FilterIcon from "../../../assets/icons/filter-icon.svg";
import feeRange from "../../../feeRange";

function FilterFeeV1({ filterFee, setFilterFee, id }) {
  const { t } = useTranslation("filter");
  function handleFilter(fee) {
    const selectedFee = filterFee.find((f) => f.id === fee.id);
    if (selectedFee) {
      const updatedFee = filterFee.filter((f) => f.id !== fee.id);
      setFilterFee([...updatedFee]);
    } else {
      setFilterFee([...filterFee, { ...fee }]);
    }
  }

  return (
    <UncontrolledDropdown className="filter-container">
      <DropdownToggle className="flex-box justify-content-between mx-auto bg-light border-radius-2 text-grey border-0">
        <span className="mr-2">{t("budget")}</span>
        <img src={FilterIcon} className="filter-icon" alt="filter" />
      </DropdownToggle>

      <DropdownMenu className="p-0">
        {feeRange.map((fee, index) => (
          <DropdownItem key={fee.text} toggle={false}>
            <FormGroup className="flex-box mb-0">
              <Input
                defaultChecked={filterFee.find((f) => f.id === fee.id)}
                onChange={() => handleFilter(fee)}
                className="mb-0"
                id={`${id}-${fee.id}`}
                type="checkbox"
              />
              <Label
                className="m-0 cursor-pointer flex-grow pr-3"
                htmlFor={`${id}-${fee.id}`}
              >
                {fee.text}
              </Label>
            </FormGroup>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

FilterFeeV1.propTypes = {
  filterFee: PropTypes.array,
  setFilterFee: PropTypes.func,
};

export default FilterFeeV1;
