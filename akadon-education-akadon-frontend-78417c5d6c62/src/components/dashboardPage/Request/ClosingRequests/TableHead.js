import React from "react";
import PropTypes from "prop-types";
import ExclamationIcon from "../../../../assets/icons/exclamation-icon.svg";

function TableHead({ filterDate, filterSubjects, filterLevels, filterFee, t }) {
  return (
    <thead>
      <tr>
        <th className="border-0 text-center">{filterDate}</th>

        <th className="border-0 text-center">{filterSubjects}</th>

        <th className="border-0 text-center">{filterLevels}</th>

        <th className="border-0 text-center">{filterFee}</th>

        <th className="border-0 bg-light text-small text-dark text-bold2 border-0 text-center">
          {t("header-10")}
        </th>

        <th className="border-0 text-center">
          {t("header-8")}
          <img width={16} src={ExclamationIcon} alt="exclamation" />
        </th>
        <th className="border-0"></th>
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  filter: PropTypes.object,
  filterKeys: PropTypes.object,
  handleFiltering: PropTypes.func,
};

export default TableHead;
