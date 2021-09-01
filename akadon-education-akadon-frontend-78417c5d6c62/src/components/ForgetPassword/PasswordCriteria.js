import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

function PaswordCriteria({
  isLength,
  isUppercaseChar,
  isLowercaseChar,
  isNumber,
}) {
  //LONG THÊM ÍT NHẤT 1 SỐ
  const { t } = useTranslation(["Sign-up-page", "common"]);
  return (
    <>
      <div className="flex-box align-items-center">
        <FontAwesomeIcon
          className={`${isLength ? "text-hightlight3" : "text-grey"}`}
          icon={["fal", "check-circle"]}
        />
        <span
          className={`text-grey ml-2 ${isLength ? "text-dark" : "text-grey"}`}
        >
          {t("Sign-up-page:password-rule-1")}
        </span>
      </div>
      <div className={`flex-box align-items-center text-grey`}>
        <FontAwesomeIcon
          className={`${isUppercaseChar ? "text-hightlight3" : "text-grey"}`}
          icon={["fal", "check-circle"]}
        />
        <span
          className={`text-grey ml-2 ${
            isUppercaseChar ? "text-dark" : "text-grey"
          }`}
        >
          {t("Sign-up-page:password-rule-2")}
        </span>
      </div>
      <div className={`flex-box align-items-center text-grey`}>
        <FontAwesomeIcon
          className={`${isNumber ? "text-hightlight3" : "text-grey"}`}
          icon={["fal", "check-circle"]}
        />
        <span
          className={`text-grey ml-2 ${isNumber ? "text-dark" : "text-grey"}`}
        >
          {t("Sign-up-page:password-rule-3")}
        </span>
      </div>
      <div className={`flex-box align-items-center text-grey`}>
        <FontAwesomeIcon
          className={`${isLowercaseChar ? "text-hightlight3" : "text-grey"}`}
          icon={["fal", "check-circle"]}
        />
        <span
          className={`text-grey ml-2 ${
            isLowercaseChar ? "text-dark" : "text-grey"
          }`}
        >
          {t("Sign-up-page:password-rule-4")}
        </span>
      </div>
    </>
  );
}

PaswordCriteria.propTypes = {
  isLowercaseChar: PropTypes.bool,
  isLength: PropTypes.bool,
  isUppercaseChar: PropTypes.bool,
};

export default PaswordCriteria;
