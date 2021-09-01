import React from "react";
import { Link } from "react-router-dom";

const PreAcceptBid = ({ payload, userRootUrl }) => {
  //  ONLY TUTOR RECEPT THIS NOTIFY
  return (
    <div>
      <Link
        className="text-wrap d-block px-2 text-dark text-decoration-none"
        to={`/${userRootUrl}/request?status=pre-accept-bid`}
      >
        Yêu cầu dạy số {payload.courseId} của bạn đã được tạm chấp nhận !
      </Link>
    </div>
  );
};

export default PreAcceptBid;
