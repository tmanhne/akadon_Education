import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";

const ShowPurpose = ({ requestContent, setIsStep2Done }) => {
  const { t } = useTranslation("suggest");
  return (
    <div className="card-style mt-3 mb-2">
      <div className="flex-box text-bold2 mb-3">
        <h6 className="mb-0 text-bold2 flex-grow"> {t("suggest:sug_9")}</h6>
        <button
          onClick={() => setIsStep2Done(false)}
          className="edit-icon center-box rounded-circle border-0 text-light bg-hightlight-1"
        >
          <FontAwesomeIcon
            icon={["fal", "pencil"]}
          />
        </button>
      </div>
      <div className="mb-12px ">
        <p className="text-grey mb-2">{t("suggest:sug_10")}:</p>
        <p className="mb-0 text-dark text-bold1" style={{ lineHeight: "1.75" }}>
          {requestContent.contract_plan}
        </p>
      </div>
      <div className="mb-12px">
        <p className="text-grey mb-2">{t("suggest:sug_11")}:</p>
        <p className="mb-0 text-dark text-bold1" style={{ lineHeight: "1.75" }}>
          {requestContent.goal}
        </p>
      </div>
    </div>
  );
};

export default ShowPurpose;
