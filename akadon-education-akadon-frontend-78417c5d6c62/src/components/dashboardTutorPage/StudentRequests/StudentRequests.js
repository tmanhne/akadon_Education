import React, { useState } from "react";
import { Modal } from "reactstrap";
import { useTranslation } from "react-i18next";

import "./index.scss";
import Icon from "../../../assets/icons/student-requests.svg";
import { fetchOpenContract } from "../../../api";
import GoBack from "../../utils/Goback";
import SubLoader from "../../utils/SubLoader";
import RequestCard from "../Home/RequestCard";
import RequestDetailModal from "../Home/RequestDetailModal";
import PaginationStyle1 from "../../utils/Paginations/PaginationStyle1";
import FilterSubjects from "../../utils/Filter/FilterSubjects";
import FilterLevels from "../../utils/Filter/FilterLevels";
import FilterFeeV1 from "../../utils/Filter/FilterFeeV1";
import FilterOfflineFlag from "../../utils/Filter/FilterOfflineFlag";
import useFetchAndFilter from "../../customHooks/useFetchAndFilter";

export default function StudentRequests() {
  // INIT LOCAL STATES
  const initDetailModal = {
    payload: null,
    isOpen: false,
  };

  // LOCAL STATES
  const [filterFee, setFilterFee] = useState([]);
  const [filterSubject, setFilterSubject] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);
  const [filterOfflineFlag, setFilterOfflineFlag] = useState([]);

  const [detailModal, setDetailModal] = useState(initDetailModal);
  const [loading, setLoading] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [filter, setFilter] = useState({});
  const [filterString, setFilterString] = useState("");

  const { t } = useTranslation(["filter","request-detail"]);

  const requests =
    useFetchAndFilter(
      fetchOpenContract,
      {},
      filter,
      pageNo,
      setLoading,
      true
    ) || {};

  function handleFilter() {
    let payload = {};
    let filterStr = "";

    if (filterSubject.length > 0) {
      filterStr += ` Môn học: ${filterSubject.join(", ")};`;
      payload.subject_name = JSON.stringify(filterSubject);
    }

    if (filterLevel.length > 0) {
      filterStr += ` Lớp: ${filterLevel.join(", ")};`;
      payload.subject_level = JSON.stringify(filterLevel);
    }

    if (filterOfflineFlag.length > 0) {
      filterStr += ` Hình thức học: ${filterOfflineFlag
        .map((flg) => (flg ? "Offline" : "Online"))
        .join(", ")};`;
      payload.offline_flg = JSON.stringify(filterOfflineFlag);
    }

    if (filterFee.length > 0) {
      filterStr += ` Chi phí: ${filterFee.map((fee) => fee.text).join(", ")}`;
      const feeArray = filterFee.map((fee) => [fee.min, fee.max]);
      payload.fee = JSON.stringify(feeArray);
    }
    setFilterString(`Kết quả lọc của: ${filterStr}`);
    setFilter(payload);
  }

  if (loading && loading.length > 0) {
    return <SubLoader />;
  }

  return (
    <>
      <GoBack />

      {/* Header */}
      <div className="flex-box mb-3">
        <img src={Icon} alt="student requests" />
        <h4 className="text-bold2 mb-0 pl-2 pr-3 text-uppercase">
          {t("student_request")}
        </h4>
        <span className="text-grey">[{requests.count}]</span>
      </div>

      {/* Filter box */}
      <div className="flex-box flex-wrap">
        <div className="mr-12px mb-4">
          <FilterSubjects
            filterSubject={filterSubject}
            setFilterSubject={setFilterSubject}
          />
        </div>
        <div className="mr-12px mb-4">
          <FilterLevels
            filterLevel={filterLevel}
            setFilterLevel={setFilterLevel}
          />
        </div>
        <div className="mr-12px mb-4">
          <FilterFeeV1 filterFee={filterFee} setFilterFee={setFilterFee} />
        </div>
        <div className="mr-12px mb-4">
          <FilterOfflineFlag
            filterOfflineFlag={filterOfflineFlag}
            setFilterOfflineFlag={setFilterOfflineFlag}
          />
        </div>
        <div className="flex-box mb-4">
          <button
            onClick={handleFilter}
            className="main-btn btn border-radius-2 mr-12px"
          >
            {t("fill")}
          </button>
          <button
            onClick={() => {
              setFilter({});
              setFilterString("");
            }}
            className="cancel-btn btn border-radius-2"
          >
            {t("unfill")}
          </button>
        </div>
      </div>

      {filterString && <p className="text-grey">{filterString}</p>}

      {/* Request card */}
      <div className="flex-box flex-wrap justify-content-between align-items-stretch">
        {requests.results &&
          requests.results.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              setDetailModal={setDetailModal}
            />
          ))}
      </div>

      {requests.results && requests.results.length === 0 && (
        <div className="text-grey text-center">
        {t("request-detail:empty")}
        </div>
      )}

      {/* Pagination */}
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

      <Modal
        isOpen={detailModal.isOpen}
        centered={true}
        contentClassName="request-form-modal card-style"
      >
        <RequestDetailModal
          detailModal={detailModal}
          setDetailModal={setDetailModal}
        />
      </Modal>
    </>
  );
}
