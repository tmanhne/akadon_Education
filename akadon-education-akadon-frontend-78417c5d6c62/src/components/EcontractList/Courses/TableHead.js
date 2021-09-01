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
import { useTranslation } from "react-i18next";

function TableHead({
  FilterDate,
  FilterFee,
  filter,
  filterKeys,
  handleFiltering,
}) {
  const { subjectList, idList, lessonNoList } = filterKeys;
  const {t} = useTranslation(["econtract-page", "common"]);

  return (
    <thead className="econtract-list__thead">
      <tr>
        <th className="border-0 align-middle text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="px-0 py-1 bg-light text-small text-dark text-bold2 border-0 text-nowrap">
              <span className="mr-2">{t("thead-6")}</span>
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
              <span className="mr-2">{t("thead-7")}</span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
              {idList.map((id) => (
                <DropdownItem key={id} toggle={false}>
                  <FormGroup>
                    <Input
                      onChange={() =>
                        handleFiltering({ key: "idList", str: id })
                      }
                      id={"id-" + id}
                      type="checkbox"
                      defaultChecked={filter.idList.includes(id)}
                    />
                    <Label className="m-0 p-0" for={"id-" + id}>
                      {id}
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
              <span className="mr-2">{t("thead-8")}</span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
              {lessonNoList.map((lessonNo) => (
                <DropdownItem key={lessonNo} toggle={false}>
                  <FormGroup>
                    <Input
                      onChange={() =>
                        handleFiltering({ key: "lessonNoList", str: lessonNo })
                      }
                      id={`lessonNo-${lessonNo}`}
                      type="checkbox"
                      defaultChecked={filter.lessonNoList.includes(lessonNo)}
                    />
                    <Label className="m-0 p-0" for={`lessonNo-${lessonNo}`}>
                      {lessonNo}
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
              <span className="mr-2 text-dark text-bold2 text-small">
              {t("thead-9")}
              </span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="border-0 bg-transparent">
              {FilterDate}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>

        <th className="border-0 text-dark text-small align-middle text-center">
        {t("common:teacher")}
        </th>

        <th className="border-0"></th>
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
