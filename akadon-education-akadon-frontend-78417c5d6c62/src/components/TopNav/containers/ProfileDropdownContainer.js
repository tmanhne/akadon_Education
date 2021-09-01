import React from "react";
import { connect } from "react-redux";

import { logoutRequest } from "../../../redux/actions/userActions";
import ProfileDropdown from "../ProfileDropdown";

const ProfileDropdownContainer = ({ logoutRequest, info }) => {
  return <ProfileDropdown logoutRequest={logoutRequest} user={info} />;
};

const mapStateToProps = ({ user }) => {
  const { info } = user;
  return { info };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDropdownContainer);
