import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import RatingBox from "../../utils/RatingBox";
import FormatTimeStamp from "../../utils/FormatTimestamp";
import Avatar from "../../utils/Avatar";

const UserBox = ({ tutor, student, latestUpdate, statusRe }) => {
  const { t } = useTranslation(["common", "econtract-detail"]);

  const { specialize } = tutor;
  const requestStatusText = (status) => {
    if (status === 7) {
      return (
        <div
          style={{ background: "rgba(255, 109, 52, 0.3)", color: "#FF6D34" }}
          className="border-radius-1 text-bold1 px-2 py-1 text-nowrap"
          id="none"
        >
          {t("econtract-detail:status-1")}
        </div>
      );
    }
    if (status === 2) {
      return (
        <div
          style={{
            background: "rgba(3 , 103, 180, 0.3)",
            color: "#0367B4",
          }}
          className="border-radius-1 text-small text-nowrap text-center py-1 pl-12px pr-12px"
        >
          {t("econtract-detail:status-2")}
        </div>
      );
    }
    return <div>{status}</div>;
  };

  return (
    <div className="e-contract-change-log__user-box border-bottom mb-3 x">
      <div className="flex-box align-items-center mb-12px justify-content-between">
        <h4 className="text-bold2 mb-12px mt-12px text-dark">
          {tutor ? t("econtract-detail:title-2") : "Đề nghị dạy của gia sư"}
        </h4>
        <div>{requestStatusText(statusRe)}</div>
      </div>
      <p id="none" className="text-grey mb-12px font-italic">
        {t("econtract-detail:latest-update")}{" "}
        <FormatTimeStamp timestamp={latestUpdate} />
      </p>
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
            <Avatar avatar={tutor.avatar} width={80} name={tutor.name} />
            <div className="ml-12px">
              <h5 className="text-bold2 text-dark mb-2">{tutor.name}</h5>
              <RatingBox rate={tutor.rating} />
            </div>
          </div>
          <div className="mb-12px text-small">
            <span className="text-grey mr-2">{t("common:short-descript")}</span>
            <span className="text-dark text-bold1">{tutor.describe}</span>
          </div>
          <div className="mb-12px text-small">
            <span className="text-grey mr-2">{t("common:specialize")}</span>
            <span className="text-dark text-bold1">
              {specialize.join(", ")}
            </span>
          </div>
        </div>
        <div className="align-self-start">
          <p className="mb-2 text-grey">{t("common:student")}</p>
          <div className="flex-box mb-12px">
            <Avatar avatar={student.avatar} width={80} name={student.name} />
            <div ml-12px>
              <h5 className="text-bold2 mb-2 text-dark">{student.name}</h5>
              <RatingBox rate={student.rating} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserBox.propTypes = {
  tutor: PropTypes.object,
  student: PropTypes.object,
  latestUpdate: PropTypes.string,
};

export default UserBox;
