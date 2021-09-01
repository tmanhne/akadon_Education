import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function CourseInfo({request}) {
  const { t } = useTranslation("common");
  const {student_propose, student_info, contract_plan} = request;

  return (
    <div className="card-style p-4 mb-3">
      <>
        <p className="mb-2 text-grey">{t("teach-plan")}</p>
        <p className="mb-12px">{contract_plan}</p>
      </>
      <>
        <p className="mb-2 text-grey">{t("st_info")}</p>
        <p className="mb-12px">{student_info}</p>
      </>
      <>
        <p className="mb-2 text-grey">{t("student-propose")}</p>
        <p className="mb-12px">{student_propose}</p>
      </>
    </div>
  );
}

CourseInfo.propTypes = {request: PropTypes.object};

export default CourseInfo;
