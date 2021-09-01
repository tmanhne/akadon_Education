import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useTranslation} from 'react-i18next';

export default function Goback() {
  const history = useHistory();
  const {t} = useTranslation("common")
  return (
    <div
      onClick={history.goBack}
      className="flex-box text-grey text-bold2 mb-3 mt-3 go-back"
    >
      <FontAwesomeIcon className="mr-2" icon={["fal", "arrow-left"]} />
      <span>{t("back-btn")}</span>
    </div>
  );
}
