import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import "./index.scss";
import "../../utils/Profile/index.scss";
import Goback from "../../utils/Goback";
import FeedbackCard from "../../utils/Profile/FeedbackCard";
import HBICard from "../../utils/Profile/HBICard";
import BlankCoursesCard from "./BlankCoursesCard";
import BlankInfoCard from "./BlankInfoCard";
import InfoCard from "./InfoCard";

const Profile = ({ user, editUserRequest }) => {
  const isBlank = false;
  const { t } = useTranslation("profile");

  return (
    <div className="profile">
      <div className="flex-box text-grey cursor-pointer d-inline-block mb-3">
        <Goback />
      </div>
      {isBlank ? (
        <>
          <BlankInfoCard />
          <BlankCoursesCard />
        </>
      ) : (
        <>
          <InfoCard user={user} editUserRequest={editUserRequest} />
          <div className="mb-3">
            <HBICard user={user} />
          </div>
          <div className="mb-3">
            <BlankCoursesCard />
          </div>
          <FeedbackCard title={t("tutor_feedback")} />
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  editUserRequest: PropTypes.func,
};

export default Profile;
