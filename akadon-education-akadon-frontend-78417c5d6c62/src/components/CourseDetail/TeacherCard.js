import React from "react";
import { Card } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import ConnectionBox from "../utils/ConnectionBox/ConnectionBox";

const TeacherCard = ({ tutor }) => {
  const language = useSelector(({ appConfig }) => appConfig.language);
  const { t } = useTranslation(["course-detail", "common", "toast"]);

  const { id, name, describe, phone_number, specialize } = tutor;
  const transpec = specialize.map((mon) => {
    switch (mon) {
      case "Toán học": {
        return "Math";
      }
      case "Ngữ văn": {
        return "Literature";
      }
      case "Sinh học": {
        return "Biological";
      }
      case "Vật lý": {
        return "Physical";
      }
      case "Hóa học": {
        return "Chemistry";
      }
      case "Địa lý": {
        return "Geography";
      }
      case "Lịch sử": {
        return "History";
      }
      case "Tiếng Anh": {
        return "English";
      }
      case "Tin học": {
        return "Information Technology";
      }

      default:
        return {};
    }
  });
  const specdone = Object.values(transpec);

  return (
    <Card className="card-style course-detail__teacher-card position-relative">
      <p className="mb-3 text-bold2">{t("course-detail:tutor-title")}</p>

      <div className="mb-3">
        <span className="text-grey text-bold2 mr-2">{t("name")}</span>
        <span>{name}</span>
      </div>

      <div className="mb-3">
        <span className="text-grey text-bold2 mr-2">{t("specialize")}</span>
        <span>
          {language === "vi" ? specialize.join(", ") : specdone.join(", ")}
        </span>
      </div>

      <div className="mb-0">
        <span className="text-grey text-bold2 mr-2">{t("short-descript")}</span>
        <span>{describe}</span>
      </div>

      <ConnectionBox
        url="dashboard"
        id={id}
        phone_number={phone_number || "0858836632"}
        t={t}
      />
    </Card>
  );
};

export default TeacherCard;
