import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {useTranslation} from "react-i18next";

import FilterIcon from "../../../assets/icons/filter-icon.svg";

const FillterBoxAndPagination = ({
  bidLength,
  FilterDate,
  FilterRating,
  FilterFee,
}) => {
  
  const {t} = useTranslation("request-page");
  // FUNCTION DECLARATIONS
  const ViewingBox = () => (
    <div className="mr-3">
      <span className="text-grey">Viewing </span>
      <span className="text-dark">1 - {bidLength} </span>
      <span className="text-grey">of</span>
      <span className="text-dark"> {bidLength} </span>
    </div>
  );

  const Pagination = () => (
    <div className="pagination-box flex-box">
      <button className="prev center-box">
        <FontAwesomeIcon icon={["fal", "angle-left"]} />
      </button>
      <button className="next center-box">
        <FontAwesomeIcon icon={["fal", "angle-right"]} />
      </button>
    </div>
  );

  function renderingView() {
    switch (true) {
      case bidLength === 0: {
        return <></>;
      }
      case bidLength <= 6: {
        return <ViewingBox />;
      }
      case bidLength > 6: {
        return (
          <>
            <ViewingBox />
            <Pagination />
          </>
        );
      }
    }
  }
  return (
    <>
      <div className="flex-box mb-3">
        <p className="mb-0 text-bold1 flex-grow">
          <span className="text-hightlight1">{bidLength}</span>
          <span className="text-grey">{t("student-1")}</span>
        </p>
        {renderingView()}
      </div>
      <div className="fillter flex-box align-items-start">
        {/* CALENDAR */}
        <UncontrolledDropdown className="mr-3">
          <DropdownToggle className="px-2 py-0 bg-light text-small text-dark text-bold2 border-0 hvcolor">
            <span className="mr-3 text-grey">{t("student-2")}</span>
            <img
              style={{ filter: "invert(0.6)" }}
              src={FilterIcon}
              alt="filter"
              width={12}
            />
          </DropdownToggle>
          <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
            <DropdownItem toggle={false}>{FilterDate}</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        {/* TUTOR RATING */}
        <UncontrolledDropdown className="mr-3">
          <DropdownToggle className="px-2 py-0 bg-light text-small text-dark text-bold2 border-0 hvcolor">
            <span className="mr-3 text-grey">{t("student-3")}</span>
            <img
              style={{ filter: "invert(0.6)" }}
              src={FilterIcon}
              alt="filter"
              width={12}
            />
          </DropdownToggle>
          <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
            <DropdownItem toggle={false}>{FilterRating}</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        {/* FEE */}
        <UncontrolledDropdown>
          <DropdownToggle className="px-2 py-0 bg-light text-small text-dark text-bold2 border-0 hvcolor">
            <span className="mr-3 text-grey">{t("student-4")}</span>
            <img
              style={{ filter: "invert(0.6)" }}
              src={FilterIcon}
              alt="filter"
              width={12}
            />
          </DropdownToggle>
          <DropdownMenu className="items-list border-0 box-shadow border-radius-2 px-2">
            <DropdownItem toggle={false}>{FilterFee}</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </>
  );
};

export default FillterBoxAndPagination;
