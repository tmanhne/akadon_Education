import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../assets/icons/change-econtract.png";
import Icon from "../../../assets/icons/change-econtract-icon.png";

const EContractChange = ({bidId}) => {
  const subject = "Toán học";
  const studentName = "Trần Anh Tuấn";
  return (
    <Link
      to={`/dashboard-tutor/econtract-change/${bidId}`}
      className="text-dark text-decoration-none d-block"
    >
      <div
        style={{ background: "#EAF4FC" }}
        className="flex-box p-2 align-items-start border-radius-2"
      >
        <img
          src={Avatar}
          alt="econtract change"
          width={57}
          height={57}
          className="mr-12px"
        />
        <div>
          <h6 className="mb-2 text-bold2">Thay đổi E-contract</h6>
          <div className="text-small">
            <span className="text-grey mr-1">Khóa học: </span>
            <span className="text-hightlight1">{subject}</span>
          </div>
          <div className="text-small mb-2 flex-box align-items-end">
            <img src={Icon} alt="change econtract" className="mr-1" />
            <span className="text-grey mr-1">Học viên:</span>
            <span>{studentName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EContractChange;
