import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../assets/icons/akadon-avatar.png";

const ReviewLesson = ({ userRootUrl, payload }) => {
  return (
    <div>
      <div
        className="p-2 flex-box align-items-start"
        style={{ background: "#EAF4FC", margin: "-1rem 0 -2.13rem 0", }}
      >
        <img
          src={Avatar}
          alt="akadon"
          width={57}
          height={57}
          className="mr-2"
        />
        <div className="text-decoration-none text-dark">
          <p className="text-wrap mb-2">
            Buổi học đã kết thúc, bạn cảm thấy buổi học đó như thế nào?
          </p>
          <div
            className="border-radius-1 p-2 mb-2"
            style={{ background: "rgba(255, 109, 52, 0.3)" }}
          >
            <h6 className="text-bold2 mb-2">{payload.subject_name}</h6>
            <div className="flex-box">
              <span className="text-grey mr-2">Giảng viên:</span>
              <span>{payload.user && payload.user.name}</span>
            </div>
            <p className="mb-2 text-hightlight text-bold1">Buổi số {payload.lessonNo}</p>
          </div>
          <Link
            to={`/${userRootUrl}/courses/${payload.courseId}/${payload.lessonId}`}
            className="main-btn text-small text-bold2 text-decoration-none px-4 d-block"
            style={{maxWidth: "7rem"}}
          >
            Đánh giá
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewLesson;
