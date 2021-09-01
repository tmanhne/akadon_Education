import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import AceptImg from "../../../assets/images/request-contract-change-accept.jpg";
import DenyImg from "../../../assets/images/request-contract-change-deny.jpg";
import ToastContent from "../../utils/ToastContent";

function RequestContractChange({ user, arrStr, subject_name, userRootUrl, t }) {
  if (!user || !arrStr) return <div></div>;

  const AcceptImage = (
    <img className="mr-3" src={AceptImg} width={141} alt="toastify" />
  );

  const DenyImage = (
    <img className="mr-3" src={DenyImg} width={141} alt="toastify" />
  );

  const AcceptContent = (
    <div>
      <p className="mb-0 text-center mb-3">
        {t("notify:tutor")} <span className="text-bold2">{user.name}</span>
        <span className="text-hightlight-3"> {t("notify:accept")} </span>
        {t("notify:contract_change")}
        <span className="text-dark text-bold2"> {subject_name}</span>
      </p>
      <Link
        to="/dashboard/courses?status=pending"
        className="mt-2 main-btn py-2 px-5 text-decoration-none"
      >
        {t("notify:detail")}
      </Link>
    </div>
  );

  const DenyContent = (
    <div>
      <p className="mb-0 text-center mb-3">
      {t("notify:tutor")} <span className="text-bold2">{user.name}</span>
        <span
          style={{ textDecoration: "line-through" }}
          className="text-danger"
        >
          {t("notify:decline")}
        </span>
        {t("notify:contract_change")}
        <span className="text-dark text-bold2"> {subject_name}</span>
      </p>
      <Link
        to={`/${userRootUrl}/e-contract-change-log/${arrStr[1]}/${arrStr[2]}`}
        className="mt-2 main-btn py-2 px-5 text-decoration-none"
      >
        {t("notify:detail")}
      </Link>
    </div>
  );

  if (arrStr[4] * 1 === 1) {
    return <ToastContent Image={AcceptImage} Content={AcceptContent} />;
  }

  if (arrStr[4] * 1 === 0) {
    return <ToastContent Image={DenyImage} Content={DenyContent} />;
  }

  return <div>Something went wrong !</div>;
}

RequestContractChange.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
};

export default RequestContractChange;
