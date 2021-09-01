import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Subject from "../../utils/Subject";
import Level from "../../utils/Level";

function SubjectInfo({ subjectInfo, setIsSubjectInfoDone, isSubjectInfoDone }) {
  const { t } = useTranslation(["request-form", "common"]);

  return (
    <div className="card-style border-radius-2 p-3 mb-12px">
      <div className="flex-box mb-12px">
        <h6 className="text-dark flex-grow mb-0 text-bold2">{t("header-1")}</h6>
        {isSubjectInfoDone && (
          <div
            onClick={() => setIsSubjectInfoDone(false)}
            className="circle-icon btn center-box rounded-circle bg-hightlight-1"
          >
            <FontAwesomeIcon icon={["fal", "pencil"]} />
          </div>
        )}
      </div>

      <div className="pl-4 mb-12px">
        <span className="text-grey mr-2">{t("common:request-header")}:</span>
        <span className="text-dark text-bold2">
          {subjectInfo.requestHeader}
        </span>
      </div>

      <div className="pl-4 mb-12px">
        <span className="text-grey mr-2">{t("common:subject-name")}:</span>
        <span className="text-dark text-bold2">
          <Subject subject={subjectInfo.subjectName} />
        </span>
      </div>

      <div className="pl-4 mb-12px">
        <span className="text-grey mr-2">{t("common:level")}:</span>
        <span className="text-dark text-bold2">
          <Level level={subjectInfo.subjectLevel} />
        </span>
      </div>

      <div className="pl-4">
        <span className="text-grey mr-2">{t("common:is-offline")}:</span>
        <span className="text-hightlight3 text-bold2">
          {subjectInfo.offlineFlag ? t("offline") : t("online")}
        </span>
      </div>

      {subjectInfo.offlineFlag && (
        <>
          <div className="pl-4 mb-12px mt-12px">
            <span className="text-grey mr-2">{t("common:city")}</span>
            <span className="text-dark text-bold2">{subjectInfo.city}</span>
          </div>
          <div className="pl-4">
            <span className="text-grey mr-2">{t("common:district")}</span>
            <span className="text-dark text-bold2">{subjectInfo.district}</span>
          </div>
        </>
      )}
    </div>
  );
}

SubjectInfo.propTypes = { subjectInfo: PropTypes.object };

export default SubjectInfo;
