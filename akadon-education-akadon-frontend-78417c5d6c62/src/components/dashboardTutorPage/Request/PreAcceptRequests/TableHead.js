import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function TableHead({ filterDate, filterSubjects, filterLevels, filterFee }) {
  const { t } = useTranslation(["common"]);
  return (
    <thead>
      <tr>
        <th className="border-0 text-center">{filterDate}</th>

        <th className="border-0 text-center">{filterSubjects}</th>

        <th className="border-0 text-center">{filterLevels}</th>

        <th className="border-0 text-center">{filterFee}</th>

        <th className="border-0 bg-light text-small text-dark text-bold2 border-0 text-center">
          {t("status")}
        </th>

        <th className="border-0 text-center"></th>
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
