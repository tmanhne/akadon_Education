import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { useTranslation, Trans } from "react-i18next";
import moment from "moment";

import EyeIcon from "../../../../assets/icons/eye-icon.svg";
import { getClosingRequest } from "../../../../api";
import FormatTimestamp from "../../../utils/FormatTimestamp";
import CurrencyFormat from "../../../utils/CurrencyFormat";
import TableHead from "./TableHead";
import emptyclose from "../../../../assets/images/empty-close-request.png";
import SubLoader from "../../../utils/SubLoader";
import FilterBox from "./FilterBox";
import PaginationStyle1 from "../../../utils/Paginations/PaginationStyle1";
import FilterSubjects from "../../../utils/Filter/FilterSubjects";
import FilterLevels from "../../../utils/Filter/FilterLevels";
import FilterFeeV1 from "../../../utils/Filter/FilterFeeV1";
import FilterDate from "../../../utils/Filter/FilterDate";
import useFetchAndFilter from "../../../customHooks/useFetchAndFilter";
import Subject from "../../../utils/Subject";
import Level from "../../../utils/Level";

const ClosingRequest = () => {
  // LOCAL STATE DECLARATIONS
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState({});
  const [filterDate, setFilterDate] = useState({});
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterFee, setFilterFee] = useState([]);
  const [loading, setLoading] = useState([]);
  const { t } = useTranslation("request-page");

  const requests = useFetchAndFilter(
    getClosingRequest,
    { status: 4 },
    filter,
    pageNo,
    setLoading,
    true
  );

  const isFilter =
    filterSubject.length > 0 ||
    filterFee.length > 0 ||
    filterLevel.length > 0 ||
    filterDate.from ||
    filterDate.to;

  // FUNCTION DECLARATIONS
  function handleFilter() {
    let payload = {};
    if (filterDate.from) {
      payload.from_date = moment(filterDate.from).format("DD/MM/YYYY");
    }

    if (filterDate.to) {
      if (filterDate.to == "Invalid Date") {
        payload.to_date = null;
      } else {
        payload.to_date = moment(filterDate.to).format("DD/MM/YYYY");
      }
    }

    if (filterSubject.length > 0) {
      payload.subject_name = JSON.stringify(filterSubject);
    }

    if (filterLevel.length > 0) {
      payload.subject_level = JSON.stringify(filterLevel);
    }

    if (filterFee.length > 0) {
      const feeArray = filterFee.map((fee) => [fee.min, fee.max]);
      payload.fee = JSON.stringify(feeArray);
    }
    setFilter(payload);
    setPageNo(1);
  }

  function handleResetFilter() {
    setFilterDate({});
    setFilterSubject([]);
    setFilterLevel([]);
    setFilterFee([]);
    setFilter({});
  }

  if (loading && loading.length > 0) {
    return <SubLoader />;
  }

  if (!requests) return <div></div>;

  return (
    <>
      <Table className="course-request__pre-accept-request border-radius-2 card-style p-0">
        <TableHead
          filterDate={
            <FilterDate
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              id="close-request"
            />
          }
          filterSubjects={
            <FilterSubjects
              filterSubject={filterSubject}
              setFilterSubject={setFilterSubject}
              id="close-request"
            />
          }
          filterLevels={
            <FilterLevels
              filterLevel={filterLevel}
              setFilterLevel={setFilterLevel}
              id="close-request"
            />
          }
          filterFee={
            <FilterFeeV1
              filterFee={filterFee}
              setFilterFee={setFilterFee}
              id="close-request"
            />
          }
          t={t}
        />

        <tbody>
          {isFilter && (
            <FilterBox
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              filterSubject={filterSubject}
              setFilterSubject={setFilterSubject}
              filterLevel={filterLevel}
              setFilterLevel={setFilterLevel}
              filterFee={filterFee}
              setFilterFee={setFilterFee}
              handleFilter={handleFilter}
              handleResetFilter={handleResetFilter}
              t={t}
            />
          )}

          {requests.results.map((r) => (
            <tr key={`request-${r.id}`} className={r.read_flg === false ? "new-request" : "border-bottom"}>
              <td>
                <FormatTimestamp timestamp={r.updated_datetime} />
              </td>
              <td>
                <Subject subject={r.subject_name} />
              </td>
              <td>
                <Level level={r.subject_level} />
              </td>
              <td>
                <CurrencyFormat value={r.fee} />
              </td>
              <td>{r.new_tutor_reg}</td>
              <td>
                <Link to={`/dashboard/request/close-request-detail/${r.id}`}>
                  <img
                    className="btn p-0 border-radius-2"
                    src={EyeIcon}
                    width={32}
                    alt="go detail"
                  />
                </Link>
              </td>
            </tr>
          ))}

          {Object.keys(filter).length > 0 && requests.results.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-grey">
                {t("empty_filter")}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {Object.keys(filter).length === 0 && requests.results.length === 0 && (
        <div className="text-center text-grey a">
          <p className="m-0">{t("empty_request")}</p>
          <img src={emptyclose} className="s-50" alt="emptyclose" />
        </div>
      )}

      {requests.results && requests.count > 10 && (
        <div
          className="flex-box justify-content-end mb-4"
          style={{ paddingRight: "10rem" }}
        >
          <PaginationStyle1
            pageNo={pageNo}
            setPageNo={setPageNo}
            totalCount={requests.count}
            itemsPerPage={10}
          />
        </div>
      )}
    </>
  );
};

export default ClosingRequest;
