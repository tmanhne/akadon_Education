import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import RatingBox from "../../utils/RatingBox";
import Avatar from "../../utils/Avatar";

const StudentBox = ({ student }) => {
  const { t } = useTranslation(["request-detail", "common"]);
  return (
    <div className="card-style py-3 px-4 border-radius-2 mb-3">
      <div className="flex-box mb-4">
        <h4 className="text-dark mb-0 text-bold2 flex-grow">
          {t("request-detail:title-2")}
        </h4>
        {/* <Link to="#" className="main-btn px-5 disable-overlay">
          {t("common:view-profile")}
        </Link> */}
      </div>
      <div className="flex-box align-items-start">
        <Avatar avatar={student.avatar} width={96} name={student.name} />
        <div className="ml-3">
          <div className="flex-box mb-3">
            <h4 className="text-dark mb-0 mr-3">{student.name}</h4>
            <div className="text-small">
              <RatingBox rate={student.rating} />
            </div>
          </div>
          <div className="flex-box flex-wrap">
            {student.dob && (
              <div className="text-grey flex-box mb-12px mr-5">
                <FontAwesomeIcon
                  className="mr-2 mb-0 h5"
                  icon={["fas", "birthday-cake"]}
                />
                <span>{student.dob}</span>
              </div>
            )}
            {student.phone_number && (
              <div className="text-grey flex-box mb-12px mr-5">
                <FontAwesomeIcon
                  className="mr-2 mb-0 h5"
                  icon={["fas", "phone-alt"]}
                />
                <span>{student.phone_number}</span>
              </div>
            )}
            <div className="text-grey flex-box mb-12px mr-5">
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "map-marker-alt"]}
              />
              <span>{student.city ? student.city : "Chưa thiết lập"}</span>
            </div>
            <div className="text-grey flex-box mb-12px">
              <FontAwesomeIcon
                className="mr-2 mb-0 h5"
                icon={["fas", "envelope"]}
              />
              <span>{student.email ? student.email : "Chưa thiết lập"}</span>
            </div>
          </div>
          <p className="text-grey">{student.describe}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentBox;
