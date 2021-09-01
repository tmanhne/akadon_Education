import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getUserRequest,
  editUserRequest,
} from "../../../../redux/actions/userActions";
import Profile from "../Profile";

const ProfileContainer = ({ user, getUserRequest, editUserRequest }) => {
  useEffect(() => {
    getUserRequest(user.info.userType);
  }, []);

  const rawUser = { ...user.info };
  const { isLoading } = user;
  const userInfo = {
    specialize: rawUser.specialize || "",
    profession: rawUser.profession || "",
    level: rawUser.level || [],
    describe: rawUser.describe || "",
    avatar: rawUser.avatar,
    name: rawUser.name || "",
    rate: rawUser.rating,
    dob: rawUser.dob || "Chưa xác định",
    phone_number: rawUser.phone_number || "Chưa xác định",
    city: rawUser.city || "Chưa xác định",
    email: rawUser.email,
    gender: rawUser.gender,
    hbi: rawUser.hbi,
    user_file: rawUser.user_file,
    confirm_legal: rawUser.confirm_legal,
  };
  return (
    <Profile
      isLoading={isLoading}
      user={userInfo}
      editUserRequest={editUserRequest}
    />
  );
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = {
  getUserRequest,
  editUserRequest,
};

ProfileContainer.propTypes = {
  user: PropTypes.object,
  getUserRequest: PropTypes.func,
  editUserRequest: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
