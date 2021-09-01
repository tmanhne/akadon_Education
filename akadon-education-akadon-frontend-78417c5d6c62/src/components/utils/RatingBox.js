import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RatingBox = ({ rate }) => {
  return (
    <div className="flex-box">
      <FontAwesomeIcon
        className={rate >= 1 ? "star-active" : "text-light-grey"}
        icon={["fas", "star"]}
      />
      <FontAwesomeIcon
        className={rate >= 2 ? "star-active" : "text-light-grey"}
        icon={["fas", "star"]}
      />
      <FontAwesomeIcon
        className={rate >= 3 ? "star-active" : "text-light-grey"}
        icon={["fas", "star"]}
      />
      <FontAwesomeIcon
        className={rate >= 4 ? "star-active" : "text-light-grey"}
        icon={["fas", "star"]}
      />
      <FontAwesomeIcon
        className={rate >= 5 ? "star-active" : "text-light-grey"}
        icon={["fas", "star"]}
      />
      <span className="ml-2 text-dark">({rate}.0)</span>
    </div>
  );
};

export default RatingBox;
