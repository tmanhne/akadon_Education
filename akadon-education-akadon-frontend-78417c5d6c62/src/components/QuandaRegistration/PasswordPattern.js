import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

function PasswordPattern({ password, setIsValidPassword }) {
  const { t } = useTranslation(["Sign-up-page", "common"]);

  const isLength = password.length >= 8 ? true : false;
  const isUppercaseChar = /(?=.*[A-Z])(?=.*[a-z])/.test(password);
  const isNumber = /(?=.*[0-9])/.test(password);
  const isSpecialChar = /(?=.*[@$!%*#?&])/.test(password);

  useEffect(() => {
    if (isLength && isUppercaseChar && isNumber && isSpecialChar) {
      setIsValidPassword(true);
    }
  }, [password]);
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
          className={`${isSpecialChar ? "text-hightlight3" : "text-grey"}`}
          icon={["fal", "check-circle"]}
        />
        <span
          className={`text-grey ml-2 ${
            isSpecialChar ? "text-dark" : "text-grey"
          }`}
        >
          {t("Sign-up-page:password-rule-4")}
        </span>
      </div>
    </>
  );
}

PasswordPattern.propTypes = {
  password: PropTypes.string,
};

export default PasswordPattern;
