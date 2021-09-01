import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import WaitingImg from "../../../assets/images/upgrade-waiting.png";

const WaitingForm = () => {
  return (
    <div className="flex-box flex-column justify-content-center">
      <img src={WaitingImg} alt="waiting processing ..." />
      <p className="text-center text-bold1 mb-5 mt-3">
        Hồ sơ của bạn sắp hoàn thiện, hãy chờ chúng tôi xác thực nhé!
      </p>
      <Link
        to="/dashboard-tutor/profile"
        className="main-btn flex-box px-3 text-decoration-none"
        style={{ width: "15rem" }}
      >
        <div className="flex-grow text-bold2">Profile</div>
        <FontAwesomeIcon icon={["fal", "arrow-right"]} />
      </Link>
    </div>
  );
};

export default WaitingForm;
