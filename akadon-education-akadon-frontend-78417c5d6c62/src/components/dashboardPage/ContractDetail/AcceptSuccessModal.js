import React from 'react';
import { Card } from "reactstrap";
import Image from "../../../assets/images/acceptCourseSuccess.png";

const AcceptSuccessModal = () => {
  return(
    <Card className="contract-detail__accept-success-modal card-style">
      <img className="mx-auto" alt="accept success" src={Image} />
      <p className="mb-3 text-center">Bắt đầu khóa học thành công!</p>
      <div style={{width: "15rem"}} className="main-btn mx-auto">Xem chi tiết</div>
    </Card>
  )
}

export default AcceptSuccessModal;