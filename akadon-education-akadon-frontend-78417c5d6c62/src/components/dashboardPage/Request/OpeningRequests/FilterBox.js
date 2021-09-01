import React from "react";
import PropTypes from "prop-types";
import TimesIcon from "../../../../assets/icons/times-btn.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

function FilterBox({
  filterDate,
  setFilterDate,
  filterSubject,
  setFilterSubject,
  filterLevel,
  setFilterLevel,
  filterFee,
  setFilterFee,
  handleFilter,
  handleResetFilter,
}) {
  console.log(  filterDate.to, filterDate.to == "Invalid Date")
  return (
    <tr className="filter-keys border-top-0">
      <td className="text-center border-top-0 py-0">
        {filterDate.from && (
          <div className="filter-item">
            {moment(filterDate.from).format("DD/MM")}
            { filterDate.to != "Invalid Date" && ` - ${moment(filterDate.to).format("DD/MM")}`}
            <FontAwesomeIcon
              icon={["fal", "times"]}
              className="text-light ml-2 h5 mb-0"
              onClick={() => setFilterDate({})}
            />
          </div>
        )}
      </td>
      <td className="text-center border-top-0 py-0">
        {filterSubject.length > 0 && (
          <div className="filter-item">
            {filterSubject[0]}
            {filterSubject.length - 1 > 0 && ` +${filterSubject.length - 1}`}
            <FontAwesomeIcon
              icon={["fal", "times"]}
              className="text-light ml-2 h5 mb-0"
              onClick={() => setFilterSubject([])}
            />
          </div>
        )}
      </td>
      <td className="text-center border-top-0 py-0">
        {filterLevel.length > 0 && (
          <div className="filter-item">
            {filterLevel[0]}
            {filterLevel.length - 1 > 0 && ` +${filterLevel.length - 1}`}
            <FontAwesomeIcon
              icon={["fal", "times"]}
              className="text-light ml-2 h5 mb-0"
              onClick={() => setFilterLevel([])}
            />
          </div>
        )}
      </td>
      <td className="text-center border-top-0 py-0">
        {filterFee.length > 0 && (
          <div className="filter-item">
            {filterFee[0].text}
            {filterFee.length - 1 > 0 && ` +${filterFee.length - 1}`}
            <FontAwesomeIcon
              icon={["fal", "times"]}
              className="text-light ml-2 h5 mb-0"
              onClick={() => setFilterFee([])}
            />
          </div>
        )}
      </td>
      <td className="border-top-0 py-0" colSpan={3}>
        <div className="text-right">
          <button onClick={handleFilter} className="main-btn mr-3 px-2 py-1">
            Lọc
          </button>
          <img
            onClick={handleResetFilter}
            src={TimesIcon}
            alt="reset filter"
            className="cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
}

FilterBox.propTypes = {
  filterDate: PropTypes.object,
  setFilterDate: PropTypes.func,
  filterSubject: PropTypes.array,
  setFilterSubject: PropTypes.func,
  filterLevel: PropTypes.array,
  setFilterLevel: PropTypes.func,
  filterFee: PropTypes.array,
  setFilterFee: PropTypes.func,
  handleFilter: PropTypes.func,
  handleResetFilter: PropTypes.func,
};

export default FilterBox;
