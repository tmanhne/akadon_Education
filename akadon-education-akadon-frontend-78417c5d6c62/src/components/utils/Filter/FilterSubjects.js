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
import subjects from "../../../subjectsList";
import Subject from "../Subject";

function FilterSubjects({ filterSubject, setFilterSubject, id }) {
  const { t } = useTranslation("filter");
  function handleFilter(subject) {
    const isSubjectExist = filterSubject.includes(subject);
    if (isSubjectExist) {
      const updatedSubject = filterSubject.filter((sub) => sub !== subject);
      setFilterSubject([...updatedSubject]);
    } else {
      setFilterSubject([...filterSubject, subject]);
    }
  }

  return (
    <UncontrolledDropdown className="filter-container">
      <DropdownToggle className="flex-box mx-auto justify-content-between bg-light border-radius-2 text-grey border-0">
        <span className="mr-2">{t("subject")}</span>
        <img src={FilterIcon} className="filter-icon" alt="filter" />
      </DropdownToggle>

      <DropdownMenu className="p-0">
        {subjects.map((s, index) => (
          <DropdownItem key={s} toggle={false}>
            <FormGroup className="flex-box mb-0">
              <Input
                defaultChecked={filterSubject.includes(s)}
                onChange={() => handleFilter(s)}
                className="mb-0"
                id={`${id}-${s}`}
                type="checkbox"
              />
              <Label
                className="m-0 cursor-pointer flex-grow pr-3"
                htmlFor={`${id}-${s}`}
              >
                <Subject subject={s} />
              </Label>
            </FormGroup>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

FilterSubjects.propTypes = {
  filterSubject: PropTypes.array,
  setFilterSubject: PropTypes.func,
  id: PropTypes.string,
};

export default FilterSubjects;
