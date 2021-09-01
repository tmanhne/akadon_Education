import PropTypes from "prop-types";
import React from "react";

import "./index.scss";
import "../../utils/Profile/index.scss";
import Goback from "../../utils/Goback";
import FeedbackCard from "../../utils/Profile/FeedbackCard";
import HBICard from "../../utils/Profile/HBICard";
import BackgroundCard from "./BackgroundCard/BackgroundCard";
import CertificateCard from "./CertificateCard/CertificateCard";
import InfoCard from "./InfoCard";
import { useTranslation } from "react-i18next";

const Profile = ({ isLoading, user, editUserRequest }) => {
  const { t } = useTranslation("profile");

  return (
    <div className="profile">
      <Goback />
      <div className="profile__info-hbi flex-box align-items-stretch mb-3">
        <InfoCard user={user} editUserRequest={editUserRequest} />
        <HBICard user={user} />
      </div>

      <BackgroundCard
        isLoading={isLoading}
        user={user}
        editUserRequest={editUserRequest}
      />

      <CertificateCard
        editUserRequest={editUserRequest}
        userFile={user.user_file ? [...user.user_file] : []}
        user={user}
        isLoading={isLoading}
      />

      <FeedbackCard title={t("student-feedback")} />
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  editUserRequest: PropTypes.func,
};

export default Profile;
