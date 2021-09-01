import PropTypes from "prop-types";
import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const RequestPagination = ({ totalDocs, handleNextPage, page, setPage }) => {
  // Extract props
  const totalPages = Math.ceil(totalDocs / 10);
  let pagination = [];
  for (let i = 0; i < totalPages; i++) {
    pagination.push(i + 1);
  }

  // FUNCTION DECLARATIONS
  async function getRequest(page) {
    setPage(page);
    handleNextPage(page);
  }
  
  return (
    <Pagination>
      {pagination.map((pagi) => (
        <PaginationItem key={pagi}>
          <PaginationLink
            onClick={() => getRequest(pagi)}
            className={`text-grey border-0 ${page === pagi && "active"}`}
          >
            {pagi}
          </PaginationLink>
        </PaginationItem>
      ))}
    </Pagination>
  );
};

RequestPagination.propTypes = {
  totalDocs: PropTypes.number,
  handleNextPage: PropTypes.func,
};

export default RequestPagination;
