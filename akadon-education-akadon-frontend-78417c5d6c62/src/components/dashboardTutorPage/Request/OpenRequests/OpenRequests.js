import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import moment from "moment";
import {toast} from "react-toastify"
import { useTranslation } from "react-i18next";

import { getTutorOpenRequests } from "../../../../api";
import EyeIcon from "../../../../assets/icons/eye-icon.svg";
import FormatTimestamp from "../../../utils/FormatTimestamp";
import FeeBox from "../../../utils/FeeBox";
import emptyclose from "../../../../assets/images/empty-open-requst.png";
import SubLoader from "../../../utils/SubLoader";
import useFetchAndFilter from "../../../customHooks/useFetchAndFilter";
import PaginationStyle1 from "../../../utils/Paginations/PaginationStyle1";
import FilterSubjects from "../../../utils/Filter/FilterSubjects";
import FilterLevels from "../../../utils/Filter/FilterLevels";
import FilterFeeV1 from "../../../utils/Filter/FilterFeeV1";
import FilterDate from "../../../utils/Filter/FilterDate";
import TableHead from "./TableHead";
import FilterBox from "./FilterBox";
import Avatar from "../../../utils/Avatar";
import Subject from "../../../utils/Subject";
import Level from "../../../utils/Level";

function OpenRequests() {
  const { t } = useTranslation("request-detail");
  // LOCAL STATE DECLARATIONS
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState({});
  const [filterDate, setFilterDate] = useState({});
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterFee, setFilterFee] = useState([]);
  const [loading, setLoading] = useState([]);

  const isFilter =
    filterSubject.length > 0 ||
    filterFee.length > 0 ||
    filterLevel.length > 0 ||
    filterDate.from ||
    filterDate.to;

  const requests = useFetchAndFilter(
    getTutorOpenRequests,
    { status: 1 },
    filter,
    pageNo,
    setLoading,
    true
  );

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
      <Table className="tutor-request__table">
        <TableHead
          filterDate={
            <FilterDate
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              id="open-request"
            />
          }
          filterSubjects={
            <FilterSubjects
              filterSubject={filterSubject}
              setFilterSubject={setFilterSubject}
              id="open-request"
            />
          }
          filterLevels={
            <FilterLevels
              filterLevel={filterLevel}
              setFilterLevel={setFilterLevel}
              id="open-request"
            />
          }
          filterFee={
            <FilterFeeV1
              filterFee={filterFee}
              setFilterFee={setFilterFee}
              id="open-request"
            />
          }
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
            />
          )}

          {requests.results.map((request) => (
            <tr key={request.bid_id}
             className={request.tutor_read_flg === false ? "new-request" : ""}
            >
              <td className="text-center">
                <FormatTimestamp timestamp={request.updated_datetime} />
              </td>
              <td className="text-center">
                <Subject subject={request.subject_name} />
              </td>
              <td className="text-center">
                <Level level={request.subject_level} />
              </td>
              <td className="text-center text-nowrap">
                <FeeBox fee={request.fee} bidFee={request.bid_fee} />
              </td>
              <td className="text-center text-nowrap">
                <Avatar
                  avatar={request.student_avatar}
                  width={36}
                  name={request.student_name}
                />
                <span className="ml-2">{request.student_name}</span>
              </td>
              <td className="text-center">
                <Link
                  to={`/dashboard-tutor/request/request-detail/${request.id}/${request.bid_id}`}
                  alt="open detail"
                >
                  <img
                    className="btn p-0 border-radius-2"
                    src={EyeIcon}
                    alt="go detail"
                    width={32}
                    atl="open detail"
                  />
                </Link>
              </td>
            </tr>
          ))}
          {Object.keys(filter).length > 0 && requests.results.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-grey">
                Không tìm thấy nội dung phù hợp !
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {Object.keys(filter).length === 0 && requests.results.length === 0 && (
        <div className="text-center text-grey a">
          <p className="m-0">{t("em_req")}</p>
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
}

OpenRequests.propTypes = {
  match: PropTypes.object,
  requests: PropTypes.array,
};

export default OpenRequests;
