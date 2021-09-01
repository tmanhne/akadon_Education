import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Modal, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { pushRequest, getStudentRequests } from "../../../../api";
import EyeIcon from "../../../../assets/icons/eye-icon.svg";
import SuccessImg from "../../../../assets/images/success-image.jpg";
import FormatTimestamp from "../../../utils/FormatTimestamp";
import CurrencyFormat from "../../../utils/CurrencyFormat";
import TableHead from "./TableHead";
import PushRequestModal from "./PushRequestModal";
import ToastContent from "../../../utils/ToastContent";
import { toastSuccess } from "../../../../module";
import emptyclose from "../../../../assets/images/empty-open-requst.png";
import SubLoader from "../../../utils/SubLoader";
import useOnepayResponse from "../../../customHooks/useOnepayResponse";
import FilterBox from "./FilterBox";
import PaginationStyle1 from "../../../utils/Paginations/PaginationStyle1";
import FilterSubjects from "../../../utils/Filter/FilterSubjects";
import FilterLevels from "../../../utils/Filter/FilterLevels";
import FilterFeeV1 from "../../../utils/Filter/FilterFeeV1";
import FilterDate from "../../../utils/Filter/FilterDate";
import useFetchAndFilter from "../../../customHooks/useFetchAndFilter";
import Subject from "../../../utils/Subject";
import Level from "../../../utils/Level";

const OpeningRequest = ({ match }) => {
  const { t } = useTranslation(["request-page","toast"]);
  // const history = useHistory();
  // LOCAL STATE DECLARATIONS
  // const [modal, setModal] = useState({ isOpen: false, content: {} });
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState({});
  const [filterDate, setFilterDate] = useState({});
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterFee, setFilterFee] = useState([]);
  const [loading, setLoading] = useState([]);

  const requests = useFetchAndFilter(
    getStudentRequests,
    { status: 1 },
    filter,
    pageNo,
    setLoading,
    true
  );
  // const paymentResponse = useOnepayResponse();
  const isFilter =
    filterSubject.length > 0 ||
    filterFee.length > 0 ||
    filterLevel.length > 0 ||
    filterDate.from ||
    filterDate.to;

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
      <Table className="course-request__open-request card-style p-0 ">
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

          {requests.results.map((r) => (
            <tr
              key={`request-${r.id}`}
              className={r.read_flg === false ? "new-request" : ""}
            >
              <td className="text-center ">
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
              <td className="text-nowrap text-center">
                <div className="w-50 mx-auto text-left">
                  <span>
                    {r.tutor_count < 10 ? `0${r.tutor_count}` : r.tutor_count}
                  </span>
                  {r.new_tutor_reg > 0 && (
                    <div className="text-light text-bold1 center-box d-inline-block border-radius-1 bg-hightlight-3 ml-1 px-3">
                      + {r.new_tutor_reg}
                    </div>
                  )}
                </div>
              </td>
              <td>
                <Link to={`${match.path}/request-detail/${r.id}`}>
                  <img
                    src={EyeIcon}
                    className="btn p-0 border-radius-2"
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
                {t("request-page:empty_filter")}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {Object.keys(filter).length === 0 && requests.results.length === 0 && (
        <div className="text-center text-grey a">
          <p className="m-0">{t("request-page:empty_request")}</p>
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

OpeningRequest.propTypes = {
  match: PropTypes.object,
};

export default OpeningRequest;
