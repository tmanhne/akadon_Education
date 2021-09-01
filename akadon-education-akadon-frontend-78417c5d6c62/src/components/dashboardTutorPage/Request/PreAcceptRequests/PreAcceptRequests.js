import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { getTutorPreAcceptRequests } from "../../../../api";
import EyeIcon from "../../../../assets/icons/eye-icon.svg";
import FormatTimestamp from "../../../utils/FormatTimestamp";
import FeeBox from "../../../utils/FeeBox";
import emptyclose from "../../../../assets/images/empty-pre-request.png";
import SubLoader from "../../../utils/SubLoader";
import useFetchAndFilter from "../../../customHooks/useFetchAndFilter";
import PaginationStyle1 from "../../../utils/Paginations/PaginationStyle1";
import FilterSubjects from "../../../utils/Filter/FilterSubjects";
import FilterLevels from "../../../utils/Filter/FilterLevels";
import FilterFeeV1 from "../../../utils/Filter/FilterFeeV1";
import FilterDate from "../../../utils/Filter/FilterDate";
import FilterBox from "./FilterBox";
import TableHead from "./TableHead";
import Subject from "../../../utils/Subject";
import Level from "../../../utils/Level";

const PreAcceptRequests = () => {
  const { t } = useTranslation("request-page");
  // LOCAL STATE DECLARATIONS
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState({});
  const [filterKeys, setFilterKeys] = useState({});
  const [filterDate, setFilterDate] = useState({});
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterFee, setFilterFee] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [loading, setLoading] = useState([]);

  const isFilter =
    filterSubject.length > 0 ||
    filterFee.length > 0 ||
    filterLevel.length > 0 ||
    filterDate.from ||
    filterDate.to ||
    filterStatus.length > 0;

  const requests = useFetchAndFilter(
    getTutorPreAcceptRequests,
    { status: 8 },
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

  const PreAccept = () => (
    <div
      style={{ background: "rgba(3, 103, 180, 0.3)" }}
      className="text-nowrap px-2 py-1 text-small text-hightlight1 border-radius-1"
    >
      {t("status-1")}
    </div>
  );

  const Biding = () => (
    <div
      style={{ background: "rgba(255, 109, 52, 0.3)" }}
      className="text-nowrap px-2 py-1 text-small text-hightlight border-radius-1"
    >
      {t("status-2")}
    </div>
  );

  if (loading && loading.length > 0) {
    return <SubLoader />;
  }

  if (!requests) return <div></div>;

  return (
    <>
      <Table className="tutor-request__table">
        <TableHead
          filterDate={
            <FilterDate filterDate={filterDate} setFilterDate={setFilterDate} />
          }
          filterSubjects={
            <FilterSubjects
              filterSubject={filterSubject}
              setFilterSubject={setFilterSubject}
              id="trial-lesson"
            />
          }
          filterLevels={
            <FilterLevels
              filterLevel={filterLevel}
              setFilterLevel={setFilterLevel}
              id="trial-lesson"
            />
          }
          filterFee={
            <FilterFeeV1
              filterFee={filterFee}
              setFilterFee={setFilterFee}
              id="trial-lesson"
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
            />
          )}
          {requests.results.map((request) => (
            <tr key={request.bid_id}>
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
              <td>
                <div className="center-box">
                  {request.lesson_status === 2 ? <PreAccept /> : <Biding />}
                </div>
              </td>
              <td className="text-center">
                <Link
                  to={`/dashboard-tutor/courses/${request.id}/${request.lesson_trial_id}/video?status=trial`}
                  atl="request detail"
                >
                  <img
                    className="btn p-0 border-radius-2"
                    src={EyeIcon}
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

      {requests.results.length === 0 && filter.length === 0 && (
        <div className="text-center text-grey a">
          <p className="m-0">
            Bạn chưa có đề nghị dạy được tạm chấp nhận cho môn học nào.
          </p>
          <img src={emptyclose} className="s-50" alt="emptyclose" />
        </div>
      )}
    </>
  );
};

PreAcceptRequests.propTypes = {
  status: PropTypes.string,
  fakeData: PropTypes.array,
  match: PropTypes.object,
};
export default PreAcceptRequests;
