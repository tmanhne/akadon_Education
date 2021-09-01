import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.scss";

function PaginationStyle1({ totalCount, itemsPerPage, pageNo, setPageNo }) {
  const totalPage = [...Array(Math.ceil(totalCount / itemsPerPage)).keys()];

  function handleNextPage() {
    if (pageNo >= totalPage.length) {
      return;
    }
    setPageNo((prev) => prev + 1);
  }

  function handlePrevPage() {
    if (pageNo === 1) {
      return;
    }
    setPageNo((prev) => prev - 1);
  }
  return (
    <div className="flex-box">
      <span className="text-grey mr-2">Trang</span>
      <Input
        value={pageNo}
        onChange={(e) => setPageNo(e.target.value)}
        className="py-2 px-3 cursor-pointer"
        type="select"
      >
        {totalPage.map((page) => (
          <option key={page} value={page + 1}>
            {page + 1}
          </option>
        ))}
      </Input>

      <span className="text-grey px-2">/</span>
      <span>{totalPage.length}</span>

      <div className="center-box ml-4">
        <div
          onClick={handlePrevPage}
          className="prev-btn btn py-2 px-3 text-grey center-box bg-light"
        >
          <FontAwesomeIcon icon={["fal", "angle-left"]} className="h4 mb-0" />
        </div>
        <div
          onClick={handleNextPage}
          className="next-btn btn py-2 px-3 text-light center-box bg-hightlight-1"
        >
          <FontAwesomeIcon icon={["fal", "angle-right"]} className="h4 mb-0" />
        </div>
      </div>
    </div>
  );
}

PaginationStyle1.propTypes = {
  totalCount: PropTypes.number,
  itemsPerPage: PropTypes.number,
  pageNo: PropTypes.number,
  setPageNo: PropTypes.func,
};

export default PaginationStyle1;
