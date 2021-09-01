import React from "react";
import { Card } from "reactstrap";
import { useTranslation } from "react-i18next";

import ConnectionBox from "../utils/ConnectionBox/ConnectionBox";

const StudentCard = ({ student }) => {
  const { t } = useTranslation(["common", "course-detail"]);
  const { id, phone_number } = student;
  // LONG thêm trường trình độ
  return (
    <Card className="card-style course-detail__teacher-card postion-relative">
      <p className="mb-3 text-bold2">{t("course-detail:student-title")}</p>
      <div className="mb-3">
        <span className="text-grey text-bold2 mr-2">{t("name")}</span>
        <span>{student.name}</span>
      </div>
      <div className="mb-0">
        <span className="text-grey text-bold2 mr-2">{t("short-descript")}</span>
        <span>{student.describe}</span>
      </div>

      <ConnectionBox
        url="dashboard-tutor"
        id={id * 1}
        phone_number={phone_number || "0858836632"}
        t={t}
      />
    </Card>
  );
};

export default StudentCard;
