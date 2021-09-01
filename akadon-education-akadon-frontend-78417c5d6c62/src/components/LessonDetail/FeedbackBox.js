import React from "react";
import PropTypes from "prop-types";

import RatingBox from "../utils/RatingBox";
import Avatar from "../utils/Avatar";

function FeedbackBox({ feedback, type, FeedBackModal, userType, t }) {
  if (!feedback && type === userType) {
    return FeedBackModal;
  }
  if (!feedback && type !== userType) {
    return (
      <div className="mb-12px p-12px">
        {t("lesson-detail:no_review")}{" "}
        {type === "student"
          ? t("lesson-detail:student")
          : t("lesson-detail:tutor")}
      </div>
    );
  }

  const { star, comment, user } = feedback;
  const { avatar, name } = user ? user : {};

  return (
    <div className="flex-box mb-12px p-12px">
      <div className="align-self-start">
        <Avatar avatar={avatar} width={36} name={name} />
      </div>
      <div className="ml-2">
        <div className="flex-box mb-2">
          <h6 className="text-bold2 mb-0 mr-1">{name}</h6>
          <span className="text-grey mr-2">
          {t("lesson-detail:review")}
          </span>
          <RatingBox rate={star} />
        </div>
        <p className="mb-2">{comment}</p>
      </div>
    </div>
  );
}

FeedbackBox.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  star: PropTypes.number,
  comment: PropTypes.string,
};

export default FeedbackBox;
