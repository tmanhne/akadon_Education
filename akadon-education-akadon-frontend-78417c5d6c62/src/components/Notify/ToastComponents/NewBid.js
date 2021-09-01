import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import UserBox from "../../utils/UserBox";
import NewBidImg from "../../../assets/images/new-bid-img.jpg";
import ToastContent from "../../utils/ToastContent";

const NewBid = ({ user, arrStr, subject_name, userRootUrl, t }) => {
  if (!user || !arrStr) return <div></div>;

  const Image = <img src={NewBidImg} width={180} alt="toastify" />;
  const Content = (
    <div>
      <p className="mb-0 text-center mb-2">
        {t("notify:new_bid")}
        <span className="text-dark text-bold2">{subject_name}</span>
      </p>
      <div className="mb-3 user-box">
        <UserBox
          avatar={user.avatar}
          width={36}
          height={36}
          name={user.name}
          rate={user.rating}
        />
      </div>
      <Link
        to={`/${userRootUrl}/request/request-detail/${arrStr[1]}`}
        className="mt-2 main-btn py-2 px-5 text-decoration-none"
      >
        {t("notify:detail")}
      </Link>
    </div>
  );

  return <ToastContent Image={Image} Content={Content} />;
};

NewBid.propTypes = {
  user: PropTypes.object,
  arrStr: PropTypes.array,
  subject_name: PropTypes.string,
};

export default NewBid;
