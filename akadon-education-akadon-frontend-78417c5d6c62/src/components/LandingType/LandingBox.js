// Author LongHoang

import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LandingBox = ({ data }) => {
  const { t } = useTranslation(["landing-type"]);

  return (
    <div>
      <div className="student-box d-flex justify-content-center ">
        <div className="position-absolute mid">
          <h3 className="font-weight-bold"> {data.title}</h3>
          <Link to={data.link} className="text-decoration-none">
            <div
              onClick={() => {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: "learnMore",
                  eventDetail: data.dataLayer,
                });
              }}
              className={` ${
                data.title === t("landing-type:text_2") ? "tutor-btn" : ""
              } mx-4 main-btn-new text-uppercase`}
            >
              {data.button}
              <FontAwesomeIcon
                icon={["fas", "arrow-right"]}
                className="btn-arrow"
              />
            </div>
          </Link>
        </div>
        <img src={data.cover} alt="studentbox" className="bg-type" />
      </div>
    </div>
  );
};

export default LandingBox;
