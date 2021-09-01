import React from 'react';
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

import BlankImg from "../../../assets/images/course-blank.png";

const BlankCoursesCard = () => {

  const {t} = useTranslation("profile");

  return(
    <div className="profile__blank-course-card card-style border-radius-2 pb-3 p-0">
      <p className="text-hightlight pt-3 pl-3 pb-3 text-uppercase">
        {t("title-3")}
      </p>
      <div className="text-center">
        <img className="mb-3" src={BlankImg} alt="blank courses list" />
        <p className="text-grey text-small">{t("empty-course")}</p>
        <Link to="/dashboard/request/request-form" className="cta main-btn btn mb-3">{t("request-btn")}</Link>
      </div>
    </div>
  )
}

export default BlankCoursesCard