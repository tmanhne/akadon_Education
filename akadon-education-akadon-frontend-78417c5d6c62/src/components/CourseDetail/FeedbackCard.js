
import React from "react";
import { Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";

const FeedbackCard = () => {
  const {t} = useTranslation(["course-detail", "common"])

  return (
    <Card className="card-style course-detail__feedback-card">
      <h5 className="mb-4 text-bold2">{t("feedback")}</h5>
      <div className="flex-box mb-3">
        <div className="text-grey text-bold2 w-20 text-center" style={{marginBottom:"85px"}}>{t("lesson-no")}</div>       
            <div className="text-grey text-bold2 w-40 text-center justify-content-center algin-items-center">
            {t("student-feedback")}
              <div className="mt-3">
                <span
                  className=" px-4 py-2 text-light text-bold3 bgcon"
                  style={{ borderRadius: "100px" }}
                >
                  0.0
                  <FontAwesomeIcon
                    className="text-light"
                    icon={["fas", "star"]}
                  />
                </span>
                <p className="mt-3">
                  0/0
                  <FontAwesomeIcon
                    className=" text-light-grey"
                    icon={["fas", "star"]}
                  />
                </p>
              </div>
            </div>
            <div className="text-grey text-bold2 w-40 text-center">
            {t("tutor-feedback")}
              <div className="mt-3">
                <span
                  className=" px-4 py-2 text-light text-bold3 bgcon"
                  style={{ borderRadius: "100px" }}
                >
                   0.0
                  <FontAwesomeIcon
                    className="text-light"
                    icon={["fas", "star"]}
                  />
                </span>
                <p className="mt-3">
                  0/0
                  <FontAwesomeIcon
                    className="text-light-grey"
                    icon={["fas", "star"]}
                  />
                </p>
              </div>
            </div>
         
      </div>
    </Card>
  );
};

export default FeedbackCard;
