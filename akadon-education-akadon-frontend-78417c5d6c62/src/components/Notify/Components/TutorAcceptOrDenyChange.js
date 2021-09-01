import React from "react";
import { Link } from "react-router-dom";

const TutorAcceptOrDenyChange = ({ payload, userRootUrl }) => {
  // NOTIFY KEY: REQUEST_CONTRACT_CHANGE
  if (userRootUrl === "dashboard") {
    return (
      <div>
        {payload.decide === 1 ? (
          <Link
            className="text-wrap d-block px-2 text-dark text-decoration-none"
            to={`/dashboard/courses?status=pending`}
          >
            Gia sư đã chấp nhận yêu cầu thay đổi econtract số {payload.courseId}{" "}
            của bạn
          </Link>
        ) : (
          `Gia sư đã từ chối yêu cầu thay đổi econtract số ${payload.courseId} của bạn`
        )}
      </div>
    );
  } else {
    return (
      <Link
        className="text-wrap text-dark text-decoration-none"
        to={`/dashboard-tutor/accept-course-form/${payload.courseId}/${payload.bidId}`}
      >
        Học sinh đã chấp nhận yêu cầu dạy số {payload.bidId} của bạn !
      </Link>
    );
  }
};

export default TutorAcceptOrDenyChange;
