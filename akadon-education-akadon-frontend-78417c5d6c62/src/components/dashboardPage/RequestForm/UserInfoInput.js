import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";

import ErrorHandler from "../../ErrorHandler";
import { useTranslation } from "react-i18next";

function UserInfoInput({
  userInfo,
  setUserInfo,
  initUserInfo,
  isTimeAndFeeDone,
  setIsUserDone,
}) {
  const [error, setError] = useState("");
  const { t } = useTranslation(["request-form", "common"]);

  const isModify = JSON.stringify(initUserInfo) === JSON.stringify(userInfo);

  function submit() {
    if (!userInfo.studentInfo) {
      setError("studentInfo");
      return;
    }

    if (!userInfo.studentPropose) {
      setError("studentPropose");
      return;
    }

    setError("");
    setIsUserDone(true);
  }

  if (isModify && !isTimeAndFeeDone) {
    return (
      <div className="card-style border-radius-2 mb-12px">
        <h6 className="text-grey mb-0 text-bold2">{t("header-3")}</h6>
      </div>
    );
  }

  return (
    <div className="user-info-form card-style border-radius-2 mb-12px">
      <h6 className="text-hightlight1 mb-12px text-bold2">{t("header-3")}</h6>

      <FormGroup>
        <Label className="text-bold2" for="student-disc">
          {t("common:student-info")} <span className="text-danger">*</span>
          {error === "studentInfo" && (
            <ErrorHandler error={t("common-error")} />
          )}
        </Label>
        <Input
          className="border-radius-2"
          type="textarea"
          id="student-disc"
          value={userInfo.studentInfo}
          placeholder={t("placeholder-1")}
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              studentInfo: e.target.value,
            })
          }
        />
      </FormGroup>

      <FormGroup className="mb-4">
        <Label className="text-bold2" for="student-wan">
          {t("common:student-propose")} <span className="text-danger">*</span>
          {error === "studentPropose" && (
            <ErrorHandler error={t("common-error")} />
          )}
        </Label>
        <Input
          className="border-radius-2"
          type="textarea"
          id="student-wan"
          value={userInfo.studentPropose}
          placeholder={t("placeholder-2")}
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              studentPropose: e.target.value,
            })
          }
        />
      </FormGroup>

      <div className="flex-box font-weight-bold mb-4">
        <div onClick={submit} className="main-btn py-0 px-4">
          <span className="mr-3">{t("complete")}</span>
        </div>
      </div>
    </div>
  );
}

UserInfoInput.propTypes = {
  userInfo: PropTypes.object,
  setUserInfo: PropTypes.func,
  initUserInfo: PropTypes.object,
  isTimeAndFeeDone: PropTypes.bool,
  setIsUserDone: PropTypes.func,
};

export default UserInfoInput;
