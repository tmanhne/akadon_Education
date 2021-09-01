import React from "react";
import { useTranslation } from "react-i18next";

import UserSummaryBox from "./UserSummaryBox";

const UserSummary = ({ requests }) => {
  // EXTRACT API CALL RESPONSE
  const newRequest = requests.filter((d) => d.title === "new")[0];
  const preAccept = requests.filter((d) => d.title === "temp_accept")[0];
  const bidding = requests.filter((d) => d.title === "in_progress")[0];
  const pending = requests.filter((d) => d.title === "pending")[0];

  const { t } = useTranslation("home-page");

  if (requests.length > 0) {
    return (
      <div className="user-summary flex-box justify-content-between align-items-start flex-wrap pt-3">
        <div className="new py-2 pl-12px pr-12px border-radius-2 mb-3 position-relative tran-btn-hover">
          <UserSummaryBox
            request={newRequest}
            color="#03B0A9"
            header={t("block-3-student-1")}
            linkToDetail="/dashboard/request?status=open-request"
          />
        </div>
        <div className="pre-accept py-2 pl-12px pr-12px border-radius-2 mb-3 position-relative tran-btn-hover">
          <UserSummaryBox
            request={preAccept}
            color="#8A88F3"
            header={t("block-3-student-2")}
            linkToDetail="/dashboard/request?status=pre-accept-bid"
          />
        </div>
        <div className="bidding py-2 pl-12px pr-12px border-radius-2 mb-3 position-relative tran-btn-hover">
          <UserSummaryBox
            request={bidding}
            color="#FF6D34"
            header={t("block-3-student-3")}
            linkToDetail="/dashboard/request?status=pre-accept-bid"
          />
        </div>
        <div className="pending py-2 pl-12px pr-12px border-radius-2 mb-3 position-relative tran-btn-hover">
          <UserSummaryBox
            request={pending}
            color="#FFC107"
            header={t("block-3-student-4")}
            linkToDetail="/dashboard/courses?status=pending"
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default UserSummary;
