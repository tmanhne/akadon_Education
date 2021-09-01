import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SubjectImage from "../utils/SubjectImage";
import FormatTimeStamp from "../utils/FormatTimestamp";
import CurrencyFormat from "../utils/CurrencyFormat";

const ChangeEContract = ({ contract, change }) => {
  return (
    <div className="px-1">
      <div className="flex-box">
        <div className="align-self-start">
          <SubjectImage
            subject={contract.subjectName}
            width={109}
            height={109}
          />
        </div>
        <div className="ml-12px">
          <div className="mb-3">
            <span className="text-grey mr-2">Ngày đăng:</span>
            <span className="text-dark text-bold2">
              <FormatTimeStamp timestamp={change.created_datetime} />
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">Môn học yêu cầu:</span>
            <span className="text-dark text-bold2">{contract.subjectName}</span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">Trình độ:</span>
            <span className="text-dark text-bold2">{contract.level}</span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">Độ dài khóa học:</span>
            <span className="text-dark text-bold2">
              {change.number_lesson} <span className="ml-1">buổi</span>
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">Chi phí:</span>
            <span className="text-hightlight3 text-bold2">
              <CurrencyFormat value={change.fee} />
              <span className="mx-2">VNĐ/buổi</span>
              <FontAwesomeIcon
                icon={["fas", "exclamation-circle"]}
                className="text-hightlight"
              />
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">Thời lượng 1 buổi học:</span>
            <span className="text-dark text-bold2">
              {change.lesson_time_length} <span className="ml-1">tiếng</span>
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">Hình thức học:</span>
            <span className="text-dark text-bold2">
              {change.offline_flag
                ? "Offline (Gia sư tại nhà)"
                : "Online (Học trực tuyến)"}
            </span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">Thành phố:</span>
            <span className="text-dark text-bold2">{contract.city}</span>
          </div>
          <div className="mb-3">
            <span className="text-grey mr-2">Quận/huyện:</span>
            <span className="text-dark text-bold2">{contract.dis}</span>
          </div>
          <div className="mb-3">
            <p className="text-grey mr-2 mb-0">Thời gian có thể học:</p>
          </div>
        </div>
      </div>
      <div className="mb-3" style={{lineHeight: "1.75"}}>
        <p className="text-grey mb-0">Thông tin về học sinh:</p>
        <p className="mb-0">{change.student_info}</p>
      </div>
      <div className="mb-3" style={{lineHeight: "1.75"}}>
        <p className="text-grey mb-0">Mong muốn của học viên với gia sư:</p>
        <p className="mb-0">{change.student_propose}</p>
      </div>
    </div>
  );
};

export default ChangeEContract;
