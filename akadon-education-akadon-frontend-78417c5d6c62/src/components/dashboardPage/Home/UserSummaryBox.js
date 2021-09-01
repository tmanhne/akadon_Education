import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import Subject from "../../utils/Subject";

const UserSummaryBox = ({ request, color, header, linkToDetail }) => {
  // LOCAL STATE DECLARATIONS
  const [fullSub, setFullSub] = useState(false);
  // EXTRACT PROPS
  const subjects = request ? request.subject : [];
  const subjectToRender = fullSub ? subjects : subjects.slice(0, 2);
  return request ? (
    <>
      <Link
        style={{ minHeight: "10rem" }}
        className="text-decoration-none d-block"
        to={linkToDetail}
      >
        <div className="flex-box mb-2">
          <div
            style={{ width: "8px", height: "8px", background: color }}
            className="rounded-circle mr-1"
          ></div>
          <h6 className="mb-0 text-dark text-bold2">{header}</h6>
        </div>
        <div
          className="h4 mb-2 font-weight-bold pl-12px"
          style={{ color: color }}
        >
          {request.contract_total < 10
            ? `0${request.contract_total}`
            : request.contract_total}
        </div>
        {subjectToRender.map((sub, index) => (
          <div
            key={sub.name}
            className={`flex-box ml-12px justify-content-between border-bottom pb-2 mb-2 ${
              subjectToRender.length - 1 === index && "border-0"
            }`}
          >
            <span className="text-dark text-capitalize">
              <Subject subject={sub.name} />
            </span>
            <span className="text-dark font-weight-bold">
              {sub.subject_total < 10
                ? `0${sub.subject_total}`
                : sub.subject_total}
            </span>
          </div>
        ))}
      </Link>
      {subjects.length > 2 && (
        <div className="expan-btn center-box w-100">
          <div
            onClick={() => setFullSub(!fullSub)}
            className="rounded-circle btn center-box"
            style={{ background: color }}
          >
            <FontAwesomeIcon
              className="h3 mb-3 text-light"
              icon={["fal", `${fullSub ? "angle-up" : "angle-down"}`]}
            />
          </div>
        </div>
      )}
    </>
  ) : (
    <></>
  );
};

export default UserSummaryBox;
