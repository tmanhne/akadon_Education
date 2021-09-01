import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, useHistory } from "react-router-dom";

const OauthRoute = ({ component, path, userType, user, ...res }) => {
  const history = useHistory();
  // USER NOT FOUND
  if (Object.keys(user.info).length === 0 || !user.info) {
    return <Redirect to="/user/login" />;
  }
  // CHECK USER TYPE BASE ON FIRST PATH'S ELEMENT
  const rootPath = history.location.pathname.split("/")[1];
  const urlType = rootPath === "dashboard" ? "student" : "tutor";
  if (!user.info) {
    return true;
  }
  if (urlType === user.info.userType) {
    return <Route component={component} path={path} {...res} />;
  } else {
    return <Redirect to="/user/login" />;
  }
};

const mapStateToProps = ({ user }) => {
  const userType = user.info;
  return { userType, user };
};

export default connect(mapStateToProps, null)(OauthRoute);
