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

import ExclamationIcon from "../../../../assets/icons/exclamation-icon.svg";
import FilterIcon from "../../../../assets/icons/filter-icon.svg";
import { useTranslation } from "react-i18next";

function FilterPreAccept({
  filter,
  filterKeys,
  handleFiltering,
  FilterDate,
  FilterFee,
}) {
  const { subjectList, levelList, statusList } = filterKeys;
  const {t} = useTranslation(["request-page", "common"]);

  return (
    <thead>
      <tr>
        <th className="border-0 text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="filter-btn text-nowrap px-0 py-1 bg-light text-small text-dark text-bold2 border-0">
              <span className="mr-2">{t("header-1")}</span>
              <img src={FilterIcon} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="filter-picker border-0 box-shadow border-radius-2 px-2">
              {FilterDate}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
        <th className="border-0 text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="filter-btn text-nowrap px-0 py-1 bg-light text-small text-dark text-bold2 border-0">
              <span className="mr-2">{t("header-2")}</span>
              <img src={FilterIcon} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
              {subjectList.map((subject) => (
                <DropdownItem key={subject} toggle={false}>
                  <FormGroup>
                    <Input
                      onChange={() =>
                        handleFiltering({ key: "subjectList", str: subject })
                      }
                      id={subject}
                      type="checkbox"
                      defaultChecked={filter.subjectList.includes(subject)}
                    />
                    <Label className="m-0 p-0" for={subject}>
                      {subject}
                    </Label>
                  </FormGroup>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
        <th className="border-0 text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="filter-btn text-nowrap px-0 py-1 bg-light text-small text-dark text-bold2 border-0">
              <span className="mr-2">{t("header-3")}</span>
              <img src={FilterIcon} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
              {levelList.map((level) => (
                <DropdownItem key={level} toggle={false}>
                  <FormGroup>
                    <Input
                      onChange={() =>
                        handleFiltering({ key: "levelList", str: level })
                      }
                      id={level}
                      type="checkbox"
                      defaultChecked={filter.levelList.includes(level)}
                    />
                    <Label className="m-0 p-0" for={level}>
                      {level}
                    </Label>
                  </FormGroup>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
        <th className="border-0 text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="filter-btn text-nowrap px-0 py-1 position-relative bg-light text-small text-dark text-bold2 border-0">
              <span>{t("header-7")}</span>
              <img className="mx-2" src={FilterIcon} alt="filter" />
              <img src={ExclamationIcon} width={12} alt="fee" />
            </DropdownToggle>
            <DropdownMenu className="filter-picker border-0 box-shadow border-radius-2 px-2">
              {FilterFee}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
        <th className="border-0 text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="filter-btn text-nowrap px-0 py-1 position-relative bg-light text-small text-dark text-bold2 border-0">
              <span className="mr-2">{t("header-8")}</span>
              <img src={FilterIcon} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
              {statusList.map((status) => (
                <DropdownItem key={status} toggle={false}>
                  <FormGroup>
                    <Input
                      onChange={() =>
                        handleFiltering({ key: "statusList", str: status })
                      }
                      id={`akadon-${status}`}
                      type="checkbox"
                      defaultChecked={filter.statusList.includes(status)}
                    />
                    <Label className="m-0 p-0" for={`akadon-${status}`}>
                      {status === 2 ? t("status-1") : t("status-2") }
                    </Label>
                  </FormGroup>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
        <th className="border-0 text-center"></th>
      </tr>
    </thead>
  );
}

FilterPreAccept.propTypes = {
  filter: PropTypes.object,
  filterKeys: PropTypes.object,
  handleFiltering: PropTypes.func,
};

export default FilterPreAccept;
