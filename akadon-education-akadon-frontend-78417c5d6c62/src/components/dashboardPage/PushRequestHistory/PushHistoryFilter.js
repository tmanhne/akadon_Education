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

import CurrencyFormat from "../../utils/CurrencyFormat";
import FilterIcon from "../../../assets/icons/filter-icon.svg";

function PushHistoryFilter({ handleFiltering, filterKeys, filter, FilterDate, FilterFee }) {
  const { subjectList, expiredList } = filterKeys;
  return (
    <thead>
      <tr>
        <th style={{ width: "20%" }} className="border-0 text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="filter-btn text-nowrap px-0 py-1 bg-light text-small text-dark text-bold2 border-0">
              <span className="mr-2">Date</span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="filter-picker border-0 border-radius-2 px-2">
              {FilterDate}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
        <th style={{ width: "20%" }} className="border-0 text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="filter-btn text-nowrap px-0 py-1 bg-light text-small text-dark text-bold2 border-0">
              <span className="mr-2">Subject</span>
              <img src={FilterIcon} width={12} alt="filter" />
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
                    <Label className="m-0 p-0 w-100" for={subject}>
                      {subject}
                    </Label>
                  </FormGroup>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
        <th style={{ width: "20%" }} className="border-0 text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="filter-btn text-nowrap px-0 py-1 bg-light text-small text-dark text-bold2 border-0">
              <span className="mr-2">Time requested</span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
              {expiredList.map((ex) => (
                <DropdownItem key={ex} toggle={false}>
                  <FormGroup>
                    <Input
                      onChange={() =>
                        handleFiltering({ key: "expiredList", str: ex })
                      }
                      id={"date" + ex}
                      type="checkbox"
                      defaultChecked={filter.expiredList.includes(ex)}
                    />
                    <Label className="m-0 p-0 w-100" for={"date" + ex}>
                      <CurrencyFormat value={ex} />
                      <span> weeks</span>
                    </Label>
                  </FormGroup>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
        <th style={{ width: "20%" }} className="border-0 text-center">
          <UncontrolledDropdown>
            <DropdownToggle className="filter-btn text-nowrap px-0 py-1 bg-light text-small text-dark text-bold2 border-0">
              <span className="mr-2">Total payment</span>
              <img src={FilterIcon} width={12} alt="filter" />
            </DropdownToggle>
            <DropdownMenu className="filter-picker border-0 border-radius-2 px-2">
              {FilterFee}
            </DropdownMenu>
          </UncontrolledDropdown>
        </th>
        <th style={{ width: "20%" }}></th>
      </tr>
    </thead>
  );
}

export default PushHistoryFilter;
