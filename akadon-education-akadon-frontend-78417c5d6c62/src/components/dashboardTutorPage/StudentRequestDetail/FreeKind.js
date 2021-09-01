import React from "react";
import { useTranslation } from "react-i18next";

const FreeKind = ({status}) => {

  const { t } = useTranslation("free-kind");

  if (!status) {
    return (
      <div
        style={{ background: "rgba(3, 103, 180, 0.3)" }}
        className="border-radius-1 text-hightlight1 text-bold1 px-2 py-1 text-nowrap"
      >
        {t("txt_1")}
      </div>
    );
  }

  if (status) {
    return (
      <div
        style={{
          background: "#FFDACC",
        }}
        className="border-radius-1 text-hightlight text-bold1 px-2 py-1 text-nowrap"
      >
         {t("txt_2")}
      </div>
    );
  }

  return <>{status}</>;
};

export default FreeKind;
