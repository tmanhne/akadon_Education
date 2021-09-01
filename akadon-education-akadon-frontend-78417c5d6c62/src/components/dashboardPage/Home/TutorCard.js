import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "reactstrap";
import { useTranslation } from "react-i18next";

import {Avatar, RatingBox} from "../../utils";

const TutorCard = ({ tutor }) => {
  const { t } = useTranslation(["home-page", "common"]);

  const { avatar, name, city, describe, specialize, rating } = tutor;
  return (
    <Card className="dashboard-home__tutor-card card-style box-shadow p-2 pb-4 mb-4">
      <div className="flex-box">
        <Avatar avatar={avatar} width="48px" name={name} />
        <div className="text-left ml-2  ">
          <div className="text-hightlight text-bold2 mb-2 h6">{name}</div>
          <div>
            <FontAwesomeIcon
              className="mr-2 text-small-1 text-grey"
              icon={["fas", "map-marker-alt"]}
            />
            <span className="text-small text-grey">{city}</span>
          </div>
        </div>
      </div>

      <div className="mb-2 text-left text-truncate">
        <span className="text-small text-grey mr-2">
          {t("common:short-descript")}
        </span>
        <span className="text-small text-dark text-bold1">{describe}</span>
      </div>

      <div className="mb-2 text-left text-truncate">
        <span className="text-small text-grey mr-2">
          {t("common:specialize")}
        </span>
        <span className="text-small text-dark text-bold1">
          {specialize.join(", ")}
        </span>
      </div>

      <div className="mb-2 flex-box">
        <span className="text-small text-grey mr-2">
          {t("home-page:block-2-student-3")}
        </span>
        <RatingBox rate={rating} />
      </div>
      <Link className="absolute-btn" to="/dashboard/news">
        {t("view full")}
      </Link>
    </Card>
  );
};

export default TutorCard;
