import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const RegisterRedirect = ({
  step,
  setStep,
  nextStep,
  disableBackBtn,
  role,
}) => {
  const { t } = useTranslation(["Sign-up-page", "common"]);

  return (
    <div className="register-redirect center-box">
      {step > 0 && !disableBackBtn && (
        <div
          onClick={() => setStep(step - 1)}
          className="flex-box text-grey text-bold1 cursor-pointer w-auto"
        >
          <FontAwesomeIcon className="mr-3" icon={["fas", "arrow-left"]} />
          <span className="text-bold1"> {t("common:back-btn")}</span>
        </div>
      )}
      {/* LONG THAY CLASS THÀNH 2 LOẠI HỌC VIÊN VÀ GIA SƯ  aca985*/}
      {/* Hiệu ứng nút mới + bỏ 2 thẻ div  */}
      {step === 3 ? (
        <div
          className={` ${
            role * 1 === 1 ? "RegisTutor" : "RegisStudent"
          } center-box main-btn-new ml-5 px-4`}
          onClick={nextStep}
        >
          {t("common:next-btn")}
          <FontAwesomeIcon
            icon={["fas", "arrow-right"]}
            className="btn-arrow"
          />
        </div>
      ) : (
        <div
          className=" center-box main-btn-new ml-5 pl-5 pr-3"
          onClick={nextStep}
        >
          {t("common:next-btn")}

          <FontAwesomeIcon
            icon={["fas", "arrow-right"]}
            className="btn-arrow"
          />
        </div>
      )}
    </div>
  );
};

export default RegisterRedirect;
