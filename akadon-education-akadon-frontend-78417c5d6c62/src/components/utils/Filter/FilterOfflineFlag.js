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

function FilterOfflineFlag({ filterOfflineFlag, setFilterOfflineFlag }) {
  const { t } = useTranslation("filter");
  function handleFilter(status) {
    if (filterOfflineFlag.includes(status)) {
      const updateStatus = filterOfflineFlag.filter((s) => s !== status);
      setFilterOfflineFlag([...updateStatus]);
    } else {
      setFilterOfflineFlag([...filterOfflineFlag, status]);
    }
  }

  return (
    <UncontrolledDropdown className="filter-container">
      <DropdownToggle className="flex-box mx-auto justify-content-between bg-light border-radius-2 text-grey border-0">
        <span className="mr-2">{t("teach_method")}</span>
        <img src={FilterIcon} className="filter-icon" alt="filter" />
      </DropdownToggle>

      <DropdownMenu className="p-0">
        <DropdownItem toggle={false}>
          <FormGroup className="flex-box mb-0">
            <Input
              defaultChecked={filterOfflineFlag.includes(false)}
              onChange={() => handleFilter(false)}
              className="mb-0"
              id="online"
              type="checkbox"
            />
            <Label
              className="m-0 cursor-pointer flex-grow pr-3"
              htmlFor="online"
            >
              {t("online")}
            </Label>
          </FormGroup>
        </DropdownItem>

        <DropdownItem toggle={false}>
          <FormGroup className="flex-box mb-0">
            <Input
              defaultChecked={filterOfflineFlag.includes(true)}
              onChange={() => handleFilter(true)}
              className="mb-0"
              id="Offline"
              type="checkbox"
            />
            <Label
              className="m-0 cursor-pointer flex-grow pr-3"
              htmlFor="Offline"
            >
              {t("offline")}
            </Label>
          </FormGroup>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

FilterOfflineFlag.propTypes = {
  filterOfflineFlag: PropTypes.array,
  setFilterOfflineFlag: PropTypes.func,
};

export default FilterOfflineFlag;
