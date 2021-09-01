import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import PropTypes from "prop-types";
import "../../../main.scss";

const TutorRequestPagnation = ({ totalDocs, setPage, handleNextPage }) => {
  const [active, setActive] = useState(1);
  const totalPages = Math.ceil(totalDocs / 10);
  let pagination = [];
  for (let i = 0; i < totalPages; i++) {
    pagination.push(i + 1);
  }

  return (
    <Pagination>
      {pagination.map((pagi) => (
        <PaginationItem key={pagi}>
          <PaginationLink
            onClick={() => {
              setActive(pagi);
              handleNextPage(pagi);
              setPage(pagi);
            }}
            className={`text-grey border-0  ${active === pagi && "active" } `}
          >
            {pagi}
          </PaginationLink>
        </PaginationItem>
      ))}
    </Pagination>
  );
};

TutorRequestPagnation.propTypes = {
  totalDocs: PropTypes.number,
  handleNextPage: PropTypes.func,
};

export default TutorRequestPagnation;
