import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import RatingBox from "../../utils/RatingBox";
import Avatar from "../../utils/Avatar";

const UserBoxTutor = ({ tutor, student, statusRe }) => {
  const language = useSelector((appConfig) => appConfig.appConfig.language);

  const { t } = useTranslation(["common", "econtract-detail"]);
  // EXTRACT PROPS
  const { specialize } = tutor;

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

  const requestStatusText = (status) => {
    if (status === 1) {
      return (
        <div
          style={{ background: "rgba(255, 109, 52, 0.3)" }}
          className="border-radius-1 text-hightlight text-bold1 px-2 py-1 text-nowrap"
        >
          {t("econtract-detail:wait_respon")}
        </div>
      );
    }
    if (status === 2) {
      return (
        <div
          style={{
            background: "rgba(138, 136, 243, 0.3)",
            color: "#8A88F3",
          }}
          className="border-radius-1 text-small text-nowrap text-center py-1 pl-12px pr-12px"
        >
          {t("econtract-detail:req_change")}
        </div>
      );
    }
    return <div>{status}</div>;
  };

  return (
    <div className="e-contract-change-log__user-box border-bottom mb-3 x">
      <div className="flex-box align-items-center mb-12px">
        <h5 className="text-dark flex-grow text-bold2 mb-0">
          {t("econtract-detail:title-2")}
        </h5>
        <div style={{ fontSize: "12.6px" }}>{requestStatusText(statusRe)}</div>
      </div>
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <h6
          style={{
            color: "orange ",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: "18px",
          }}
        >
          {t("econtract-detail:e-descript")}
        </h6>
      </div>
      <div className="flex-box justify-content-between">
        <div className="w-50 mr-2">
          <p className="mb-2 text-grey">{t("common:teacher")}</p>
          <div className="flex-box mb-12px">
            <Avatar avatar={tutor.avatar} width={64} name={tutor.name} />
            <div className="ml-12px">
              <h5 className="text-bold2 text-dark mb-2">{tutor.name}</h5>
              <RatingBox rate={tutor.rating} />
            </div>
          </div>
          <div className="mb-12px text-small">
            <span className="text-grey mr-2">{t("common:descript")}</span>
            <span className="text-dark text-bold1">{tutor.describe}</span>
          </div>
          <div className="mb-12px text-small">
            <span className="text-grey mr-2">{t("common:specialize")}</span>
            <span className="text-dark text-bold1">
              {language === "vi" ? specialize.join(", ") : specdone.join(", ")}
            </span>
          </div>
        </div>
        <div className="w-50 mr-2" style={{ alignSelf: "baseline" }}>
          <p className="mb-2 text-grey">{t("common:student")}</p>
          <div className="flex-box mb-12px">
            <Avatar avatar={student.avatar} width={64} name={student.name} />
            <div className="ml-12px">
              <h5 className="text-bold2 mb-2 text-dark">{student.name}</h5>
              <RatingBox rate={student.rating} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserBoxTutor.propTypes = {
  tutor: PropTypes.object,
  student: PropTypes.object,
  status: PropTypes.number,
};

export default UserBoxTutor;
