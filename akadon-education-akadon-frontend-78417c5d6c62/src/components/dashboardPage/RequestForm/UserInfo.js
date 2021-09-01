import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

function UserInfo({ userInfo, setIsUserDone, isUserDone }) {
  const {t} = useTranslation(["request-form", "common"]);
  return (
    <div className="card-style border-radius-2 p-3 mb-12px">
      <div className="flex-box mb-12px">
        <h6 className="text-dark flex-grow mb-0 text-bold2">
          {t("header-3")}
        </h6>
        {isUserDone && (
          <div
            onClick={() => setIsUserDone(false)}
            className="circle-icon btn center-box rounded-circle bg-hightlight-1"
          >
            <FontAwesomeIcon icon={["fal", "pencil"]} />
          </div>
        )}
      </div>

      <div className="pl-4 mb-12px">
        <p className="text-grey mb-2">{t("common:student-info")}</p>
        <p className="text-dark text-bold1 mb-0">{userInfo.studentInfo}</p>
      </div>

      <div className="pl-4 mb-12px">
        <p className="text-grey mb-2">{t("common:student-propose")}</p>
        <p className="text-dark text-bold1 mb-0">{userInfo.studentPropose}</p>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  userInfo: PropTypes.object,
  setIsUserDone: PropTypes.func,
  isUserDone: PropTypes.bool,
};

export default UserInfo;
