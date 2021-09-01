import React from "react";
import { Card, CardImg } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MathLogo from "../../../assets/images/mathLogo.png";

const SubSidebarStyle1 = () => {
  const fakeData = [
    {
      classId: "sadfc",
      className: "Môn Lý",
      student: "Trần Anh Tuấn",
    },
    {
      classId: "1234qwer",
      className: "Môn Toán",
      student: "Trần Anh Tuấn",
    },
    {
      classId: "111dddd",
      className: "Môn Hóa",
      student: "Trần Anh Tuấn",
    },
  ];
  return (
    <Card className="sidebar-card-style-1 card-style mb-3 p-2">
      {/* Title */}
      <div className="flex-box">
        <h5 className="font-weight-bold text-small">
          Phản hồi về lớp học của bạn
        </h5>
        <div>
          <FontAwesomeIcon
            className="text-small font-weight-bold mr-2"
            icon={["fal", "arrow-left"]}
          />
          <FontAwesomeIcon
            className="text-small font-weight-bold"
            icon={["fal", "arrow-right"]}
          />
        </div>
      </div>
      {/* List of contents */}
      {fakeData.map((data) => (
        <Card key={data.classId} className="card-style flex-box p-1 mb-2">
          <CardImg className="mr-2" src={MathLogo} alt="student" />
          <div className="info">
            <div className="mb-1">
              <span className="text-grey text-small-1 mr-2">Mã lớp học:</span>
              <span className="text-small-1">{data.classId}</span>
            </div>
            <h6 className="mb-1 text-bold2">{data.className}</h6>
            <div>
              <span className="text-grey text-small-1 mr-2">Học sinh: </span>
              <span className="text-small-1">{data.student}</span>
            </div>
          </div>
          <div className="edit center-box mr-2">
            <FontAwesomeIcon icon={["fas", "comment-alt-edit"]} />
          </div>
        </Card>
      ))}
    </Card>
  );
};

export default SubSidebarStyle1;
