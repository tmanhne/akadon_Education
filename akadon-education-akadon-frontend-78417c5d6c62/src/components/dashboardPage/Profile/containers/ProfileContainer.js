import React, {useEffect} from 'react';
import {connect} from "react-redux";

import {getUserRequest, editUserRequest} from "../../../../redux/actions/userActions"
import Profile from "../Profile";

const ProfileContainer = ({user, getUserRequest, editUserRequest}) => {
  useEffect(() => {
    getUserRequest(user.info.userType)
  }, [])
  return(
    <Profile user={user.info} editUserRequest={editUserRequest} />
  )
}

const mapStateToProps = ({user}) => ({user});
const mapDispatchToProps = {
  getUserRequest,
  editUserRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);