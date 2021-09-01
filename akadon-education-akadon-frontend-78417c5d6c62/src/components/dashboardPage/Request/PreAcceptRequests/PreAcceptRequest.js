import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {toast} from "react-toastify"

import EyeIcon from "../../../../assets/icons/eye-icon.svg";
import { getPreAcceptBids } from "../../../../api";
import FormatTimestamp from "../../../utils/FormatTimestamp";
import RatingBox from "../../../utils/RatingBox";
import TableHead from "./TableHead";
import PreAcceptFeeBox from "./PreAcceptFeeBox";
import emptyclose from "../../../../assets/images/empty-pre-request.png";
import SubLoader from "../../../utils/SubLoader";
import FilterBox from "./FilterBox";
import PaginationStyle1 from "../../../utils/Paginations/PaginationStyle1";
import FilterSubjects from "../../../utils/Filter/FilterSubjects";
import FilterLevels from "../../../utils/Filter/FilterLevels";
import FilterFeeV1 from "../../../utils/Filter/FilterFeeV1";
import FilterDate from "../../../utils/Filter/FilterDate";
import useFetchAndFilter from "../../../customHooks/useFetchAndFilter";
import Avatar from "../../../utils/Avatar";
import Subject from "../../../utils/Subject";
import Level from "../../../utils/Level";

const PreAcceptRequest = () => {
  const { t } = useTranslation("request-page");
  // LOCAL STATE DECLARATIONS
  const [modal, setModal] = useState({ isOpen: false, content: {} });
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState({});
  const [filterDate, setFilterDate] = useState({});
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterFee, setFilterFee] = useState([]);
  const [loading, setLoading] = useState([]);

  const requests = useFetchAndFilter(
    getPreAcceptBids,
    { status: 8 },
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

  // RENDERING STATUS TEXT
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
      <Table className="course-request__pre-accept-request border-radius-2 card-style p-0">
        <TableHead
          filterDate={
            <FilterDate
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              id="trial-lesson"
            />
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
              t={t}
            />
          )}
          {requests.results.map((bid) => (
            <tr
              key={`bid-${bid.id}`}
              className={
                bid.read_flg === false
                  ? "new-request border-bottom"
                  : "border-bottom"
              }
            >
              <td>
                <FormatTimestamp timestamp={bid.updated_datetime} />
              </td>
              <td>
                <Subject subject={bid.subject_name} />
              </td>
              <td>
                <Level level={bid.subject_level} />
              </td>
              <PreAcceptFeeBox fee={bid.fee} bid_fee={bid.bid_fee} />
              <td>
                {bid.tutor && (
                  <div className="flex-box">
                    <Avatar
                      avatar={bid.tutor.avatar}
                      width={36}
                      name={bid.tutor.name}
                    />
                    <div className="pl-2 text-left">
                      <p className="mb-2">{bid.tutor.name}</p>
                      <div className="text-small">
                        <RatingBox rate={bid.tutor.rating} />
                      </div>
                    </div>
                  </div>
                )}
              </td>
              <td className="text-red text-bold1">
                {bid.status === 2 ? <PreAccept /> : <Biding />}
              </td>
              <td>
                {bid && bid.tutor_list && (
                  <Link
                    to={`/dashboard/courses/${bid.id}/${bid.lesson_trial_id}/video?status=trial`}
                  >
                    <img
                      src={EyeIcon}
                      className="btn p-0 border-radius-2"
                      width={32}
                      alt="go detail"
                    />
                  </Link>
                )}
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

export default PreAcceptRequest;
