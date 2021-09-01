import React from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";

function TableHead({ filterDate, filterSubjects, filterLevels, filterFee }) {
  return (
    <thead>
      <tr>
        <th className="border-0 text-center">{filterDate}</th>

        <th className="border-0 text-center">{filterSubjects}</th>

        <th className="border-0 text-center">{filterLevels}</th>

        <th className="border-0 text-center">{filterFee}</th>

        <th className="border-0 bg-light text-small text-dark text-bold2 border-0 text-center text-nowrap">
          <Trans
            i18nKey={"request-page:header-5"}
            components={{
              high: <br />,
            }}
          />
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
