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
import levels from "../../../lessonsList";
import Level from "../Level";

function FilterLevels({ filterLevel, setFilterLevel, id }) {
  const { t } = useTranslation("filter");
  function handleFilter(level) {
    const isLevelExist = filterLevel.includes(level);
    if (isLevelExist) {
      const updatedLevel = filterLevel.filter((lv) => lv !== level);
      setFilterLevel([...updatedLevel]);
    } else {
      setFilterLevel([...filterLevel, level]);
    }
  }

  return (
    <UncontrolledDropdown className="filter-container">
      <DropdownToggle className="flex-box mx-auto justify-content-between bg-light border-radius-2 text-grey border-0">
        <span className="mr-2">{t("level")}</span>
        <img src={FilterIcon} className="filter-icon" alt="filter" />
      </DropdownToggle>

      <DropdownMenu className="p-0">
        {levels.map((lv, index) => (
          <DropdownItem key={lv} toggle={false}>
            <FormGroup className="flex-box mb-0">
              <Input
                defaultChecked={filterLevel.includes(lv)}
                onChange={() => handleFilter(lv)}
                className="mb-0"
                id={`${id}-${lv}`}
                type="checkbox"
              />
              <Label
                className="m-0 cursor-pointer flex-grow pr-3"
                htmlFor={`${id}-${lv}`}
              >
                <Level level={lv} />
              </Label>
            </FormGroup>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

FilterLevels.propTypes = {
  filterLevel: PropTypes.array,
  setFilterLevel: PropTypes.func,
};

export default FilterLevels;
