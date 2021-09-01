import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

import BidDecidedImg from "../../../assets/images/bid-decided.jpg";
import ToastContent from "../../utils/ToastContent";

function BidDecided({ user, arrStr, subject_name, userRootUrl, t }) {
  if (!user || !arrStr) return <div></div>;

  const Image = <img src={BidDecidedImg} width={195} alt="toastify" />;
  const Content = (
    <div>
      <p className="mb-0 text-center mb-2">
        {t("notify:student")} <span className="text-bold2">{user.name}</span>
        <Trans
          i18nKey={"notify:bid_decided_1"}
          components={{
            span: <span className="text-hightlight-3"/>,
          }}
        />
        <span className="text-bold2"> {subject_name}</span>
        {t("notify:bid_decided_2")}
      </p>
      <Link
        to={`/${userRootUrl}/request/${arrStr[1]}/${arrStr[2]}`}
        className="mt-2 main-btn py-2 px-5 text-decoration-none"
      >
        {t("notify:detail")}
      </Link>
    </div>
  );

  return <ToastContent Image={Image} Content={Content} />;
}

BidDecided.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
};

export default BidDecided;
