import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";
import { toast } from "react-toastify";

import FormatTimestamp from "../../../utils/FormatTimestamp";
import { getTutorCloseRequests } from "../../../../api";
import EyeIcon from "../../../../assets/icons/eye-icon.svg";
import emptyclose from "../../../../assets/images/empty-close-request.png";
import SubLoader from "../../../utils/SubLoader";
import TableHead from "./TableHead";
import useFetchAndFilter from "../../../customHooks/useFetchAndFilter";
import PaginationStyle1 from "../../../utils/Paginations/PaginationStyle1";
import FilterSubjects from "../../../utils/Filter/FilterSubjects";
import FilterLevels from "../../../utils/Filter/FilterLevels";
import FilterDate from "../../../utils/Filter/FilterDate";
import FilterBox from "./FilterBox";
import Avatar from "../../../utils/Avatar";
import Subject from "../../../utils/Subject";
import Level from "../../../utils/Level";

const ClosingRequests = ({ match }) => {
  // LOCAL STATE DECLARATIONS
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState({});
  const [filterDate, setFilterDate] = useState({});
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);
  const [loading, setLoading] = useState([]);

  const isFilter =
    filterSubject.length > 0 ||
    filterLevel.length > 0 ||
    filterDate.from ||
    filterDate.to;

  const requests = useFetchAndFilter(
    getTutorCloseRequests,
    { status: 4 },
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

    setFilter(payload);
    setPageNo(1);
  }

  function handleResetFilter() {
    setFilterDate({});
    setFilterSubject([]);
    setFilterLevel([]);
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
              handleFilter={handleFilter}
              handleResetFilter={handleResetFilter}
            />
          )}
          {requests.results.map((request) => (
            <tr
              key={request.bid_id}
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
                <Avatar
                  avatar={request.student_avatar}
                  width={36}
                  name={request.student_name}
                />
                <span className="ml-2">{request.student_name}</span>
              </td>
              <td className="text-center">
                <Link
                  to={`${match.url}/close-request-detail/${request.id}/${request.bid_id}`}
                  atl="request detail"
                >
                  <img
                    src={EyeIcon}
                    className="btn p-0 border-radius-2"
                    alt="go detail"
                    width={32}
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

      {requests.length === 0 && (
        <div className="text-center text-grey a">
          <p className="m-0">Bạn chưa đóng một yêu cầu tìm gia sư nào.</p>
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

ClosingRequests.propTypes = {
  status: PropTypes.string,
  fakeData: PropTypes.array,
  match: PropTypes.object,
};
export default ClosingRequests;
