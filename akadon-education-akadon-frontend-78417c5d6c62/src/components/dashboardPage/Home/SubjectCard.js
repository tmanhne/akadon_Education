import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "reactstrap";
import {Link} from "react-router-dom"

import SubjectImage from "../../utils/SubjectImage";

const SubjectCard = ({ subject }) => {
  const { t } = useTranslation(["home-page", "common"]);
  return (
    <Link to={`/dashboard/request/request-form?subject=${subject}`} className="card text-dark text-decoration-none flex-box box-shadow p-12px border-radius-3 border-0 mb-3 cursor-pointer">
      <SubjectImage subject={subject} width="69px" height="69px" />
      <h6 className="ml-3 flex-grow mb-0 text-bold2">{subject}</h6>
    </Link>
  );
};

export default SubjectCard;
