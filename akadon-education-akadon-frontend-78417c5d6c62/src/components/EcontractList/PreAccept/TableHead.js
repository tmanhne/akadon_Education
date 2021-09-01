import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import PropTypes from "prop-types";

import FilterIcon from "../../../assets/icons/filter-icon.svg";
import ExclamationIcon from "../../../assets/icons/exclamation-icon.svg";
import { useTranslation } from "react-i18next";

function TableHead({
  FilterDate,
  FilterFee,
  filter,
  filterKeys,
  handleFiltering,
}) {
  const { subjectList, levelList, statusList } = filterKeys;
  const {t} = useTranslation(["econtract-page", "common"]);
  return (
    <thead className="econtract-list__thead">
      <tr>
        <th className="border-0 align-middle text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="bg-light border-0 text-nowrap">
              <span className="mr-2 text-dark text-bold2 text-small">{t("thead-1")}</span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="border-0 bg-transparent">
              {FilterDate}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>

        <th className="border-0 align-middle text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="px-0 py-1 bg-light text-small text-dark text-bold2 border-0 text-nowrap">
              <span className="mr-2">{t("thead-2")}</span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="items-list border-0 border-radius-2 px-2">
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

        <th className="border-0 align-middle text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="px-0 py-1 bg-light text-small text-dark text-bold2 border-0 text-nowrap">
              <span className="mr-2">{t("thead-3")}</span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
              {levelList.map((level, index) => (
                <DropdownItem key={level} toggle={false}>
                  <FormGroup>
                    <Input
                      onChange={() =>
                        handleFiltering({ key: "levelList", str: level })
                      }
                      id={level + index}
                      type="checkbox"
                      defaultChecked={filter.levelList.includes(level)}
                    />
                    <Label className="m-0 p-0" for={level + index}>
                      {level}
                    </Label>
                  </FormGroup>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>

        <th className="border-0 align-middle text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="bg-light border-0 text-nowrap">
              <span className="text-dark text-bold2 text-small">{t("thead-4")}</span>
              <img className="mx-2" src={FilterIcon} width={12} alt="filter" />
              <img width={16} src={ExclamationIcon} alt="exclamation" />
            </DropdownToggle>
            <DropdownMenu className="border-0 bg-transparent">
              {FilterFee}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>

        <th className="border-0 text-dark text-small align-middle text-bold2 text-center">{t("common:teacher")}</th>

        <th className="border-0 align-middle text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="px-0 py-1 bg-light text-small text-dark text-bold2 border-0 text-nowrap">
              <span className="mr-2">{t("thead-5")}</span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
              {statusList.map((status) => (
                <DropdownItem key={status} toggle={false}>
                  <FormGroup>
                    <Input
                      onChange={() =>
                        handleFiltering({ key: "statusList", str: status })
                      }
                      id={`status-${status}`}
                      type="checkbox"
                      defaultChecked={filter.statusList.includes(status)}
                    />
                    <Label className="m-0 p-0" for={`status-${status}`}>
                      {status === 2 ? "Đang thương lượng" : "undefined"}
                    </Label>
                  </FormGroup>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  FilterDate: PropTypes.object,
  FilterFee: PropTypes.object,
  filter: PropTypes.object,
  filterKeys: PropTypes.object,
  handleFiltering: PropTypes.func,
};

export default TableHead;
