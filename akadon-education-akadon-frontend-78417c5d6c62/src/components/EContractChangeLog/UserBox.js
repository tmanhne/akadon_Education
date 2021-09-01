import React from "react";
import PropTypes from "prop-types";

import RatingBox from "../utils/RatingBox";
import FormatTimeStamp from "../utils/FormatTimestamp";
import { useTranslation } from "react-i18next";

const UserBox = ({ tutor, student, latestUpdate }) => {
  let specilize = tutor.specilize;
  if (typeof specilize === "string") {
    specilize = JSON.parse(specilize.replaceAll("'", '"'));
  }

  const {t} = useTranslation(["common", "econtract-detail"]);
  return (
    <div className="e-contract-change-log__user-box border-bottom mb-3">
      <h4 className="text-bold2 mb-12px mt-12px">
        {t("econtract-detail:title-2")}
      </h4>
      <p className="text-grey mb-12px">
      {t("econtract-detail:latest-update")}
        <FormatTimeStamp timestamp={latestUpdate} />
      </p>
      <div className="flex-box">
        <div className="w-50 mr-2">
          <p className="mb-2 text-grey">{t("common:teacher")}</p>
          <div className="flex-box mb-12px">
            <img className="image-avatar mr-12px" src={tutor.avatar} alt="Ảnh đại diện gia sư" />
            <div>
              <h5 className="text-bold2 mb-2">{tutor.name}</h5>
              <RatingBox rate={tutor.rating} />
            </div>
          </div>
          <div className="mb-12px text-small">
            <span className="text-grey mr-2">{t("common:short-descript")}</span>
            <span className="text-dark">{tutor.describe}</span>
          </div>
          <div className="mb-12px text-small">
            <span className="text-grey mr-2">{t("common:specialize")}</span>
            <span className="text-dark">
              {specilize.join(", ")}
            </span>
          </div>
        </div>
        <div className="w-50 align-self-start">
          <p className="mb-2 text-grey">{t("common:student")}</p>
          <div className="flex-box mb-12px">
            <img className="image-avatar mr-12px" src={student.avatar} alt="Ảnh đại diện học viên"/>
            <div>
              <h5 className="text-bold2 mb-2">{student.name}</h5>
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
}

export default UserBox;
