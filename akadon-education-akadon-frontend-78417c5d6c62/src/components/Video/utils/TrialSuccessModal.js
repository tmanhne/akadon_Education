import React from "react";
import { Link } from "react-router-dom";

import Img from "../../../assets/images/econtract.jpg";

function TrialSuccessModal({ room, t }) {
  room && room.disconnect();
  return (
    <>
      <div className="text-center mb-4">
        <img src={Img} alt="econtract" width={212} />
      </div>

      <p className="text-center px-5 mb-3">
        {t("video:trial_success_1")}<br></br>
        {t("video:trial_success_2")}<br></br>
        {t("video:trial_success_3")}
      </p>

      <div className="text-center">
        <Link
          to="/dashboard/courses?status=pending"
          className="main-btn pt-12px pb-12px px-5"
        >
          {t("video:view_econtract")}
        </Link>
      </div>
    </>
  );
}

export default TrialSuccessModal;
