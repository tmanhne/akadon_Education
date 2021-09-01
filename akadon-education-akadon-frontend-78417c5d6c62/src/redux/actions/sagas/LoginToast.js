//      AUTHOR LONGHOANG

//       FILE NÀY ĐỂ CHUYỂN NGỮ CHO PHẦN REDUX-SAGA.
//      ĐÂY LÀ COMPO CHỨA CÁC BÁO LỖI KHI ĐĂNG NHẬP ĐĂNG KÝ SỬ DỤNG I18 Ở INDEX KHÔNG ĐƯỢC

import React from "react";
import { useTranslation } from "react-i18next";

function LoginToast({ content, data }) {
  const { t } = useTranslation("toast");
  switch (content) {
    case "loi1": {
      return <span>{t("toast:er_58")}</span>;
    }
    case "loi2": {
      return <span>{t("toast:er_59")}</span>;
    }
    case "loi3": {
      const user = data * 1 === 1 ? t("toast:er_64") : t("toast:er_65");
      return (
        <span>
          {t("toast:er_56")} {user}
        </span>
      );
    }
    case "loi4": {
      return <span>{t("toast:er_60")}</span>;
    }
    case "loi5": {
      return (
        <span>
          {t("toast:er_63")} {data ? data : "500"}
        </span>
      );
    }
    case "loi6": {
      return <span>{t("toast:er_61")}</span>;
    }
    case "loi7": {
      return <span>{t("toast:er_62")}</span>;
    }
    default:
      return <span>{content}</span>;
  }
}
export default LoginToast;
