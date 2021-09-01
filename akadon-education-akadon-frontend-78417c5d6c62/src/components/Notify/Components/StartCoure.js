import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../assets/icons/akadon-avatar.png";

const StartCoure = ({ payload, userRootUrl }) => {
  // ONLY STUDENT ACCEPT NOTIFY
  return (
    <div className="p-2">
      <div
        className="p-2 flex-box align-items-start"
        style={{ background: "#EAF4FC" }}
      >
        <img
          src={Avatar}
          alt="akadon"
          width={57}
          height={57}
          className="mr-2"
        />
        {userRootUrl === "dashboard" ? (
          <div>
            <p className="text-wrap mb-2">
              Khóa học{" "}
              <span className="text-bold2 text-hightlight1">
                “{payload.subjectName}”
              </span>{" "}
              của bạn đã được gia sư chấp nhận yêu cầu thay đổi E-contract.
            </p>
          </div>
        ) : (
          <Link
            className="text-decoration-none text-dark"
            to={`/dashboard-tutor/accept-course-form/${payload.courseId}`}
          >
            <p className="text-wrap mb-2">
              Bạn đã chấp thay đổi econtract khóa học
              <span className="text-bold2 text-hightlight1">
                “{payload.subjectName}”
              </span>
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartCoure;
