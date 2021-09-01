//      AUTHOR LONGHOANG

//       FILE NÀY ĐỂ CHUYỂN NGỮ CHO PHẦN THỨ 2- CN

import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "reactstrap";

function TranslateDate({ datas, range }) {
  const { t } = useTranslation("date");
  switch (datas*1) {
    case 0: {
      return <Label for={`date-${range && range.id}-${datas}`}>{t("Date_full1")} </Label>;
    }
    case 1: {
      return <Label for={`date-${range && range.id}-${datas}`}>{t("Date_full2")} </Label>;
    }
    case 2: {
      return <Label for={`date-${range && range.id}-${datas}`}>{t("Date_full3")} </Label>;
    }
    case 3: {
      return <Label for={`date-${range && range.id}-${datas}`}>{t("Date_full4")} </Label>;
    }
    case 4: {
      return <Label for={`date-${range && range.id}-${datas}`}>{t("Date_full5")} </Label>;
    }
    case 5: {
      return <Label for={`date-${range && range.id}-${datas}`}>{t("Date_full6")} </Label>;
    }
    case 6: {
      return <Label for={`date-${range && range.id}-${datas}`}>{t("Date_full7")} </Label>;
    }
    default:
      return <Label></Label>;
  }
}
export default TranslateDate;
