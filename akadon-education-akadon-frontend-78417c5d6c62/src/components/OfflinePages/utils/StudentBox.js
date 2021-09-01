import React from "react";
import PropTypes from "prop-types";

import RatingBox from "../../utils/RatingBox";

function StudentBox({ student }) {
  const { name, rating, number_course_in, number_month_in, avatar } = student;
  return (
    <div className="flex-box align-items-start">
      <img
        src={avatar || `https://ui-avatars.com/api/?name=${name}`}
        alt={name}
        width={48}
        className="image-avatar mr-2"
      />
      <div>
        <h6 className="mb-1 text-bold2">{name}</h6>
        <div className="mb-12px">
          <RatingBox rate={rating} />
        </div>
        <p className="text-grey mb-0">
          Đã là thành viên {number_month_in} tháng, tham gia {number_course_in}{" "}
          khóa học
        </p>
      </div>
    </div>
  );
}

StudentBox.propTypes = { sttudent: PropTypes.object };

export default StudentBox;
