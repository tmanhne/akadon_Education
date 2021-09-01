import React from "react";
import { Link } from "react-router-dom";

const StudentChangeBid = ({ payload, userRootUrl }) => {
  return (
    <div>
      <Link
        className="text-wrap px-2 d-block text-dark text-decoration-none"
        to={`/${userRootUrl}/e-contract-change-log/${payload.requestId}/${payload.bidId}/${payload.bidChangedId}`}
      >
        {userRootUrl === "dashboard"
          ? `Bạn đã gửi một yêu cầu thay đổi econtract số ${payload.bidId} !`
          : `Học sinh vừa gửi một yêu cầu thay đổi econtract số ${payload.bidId} của bạn ! `}
      </Link>
    </div>
  );
};

export default StudentChangeBid;
