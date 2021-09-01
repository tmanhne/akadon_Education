import * as actions from "./actionTypes";

// 1. LOGIN REQUEST
export const loginRequest = (
  email,
  password,
  role,
  zaloCode,
  zaloId,
  facebookToken,
  facebookId
) => ({
  type: actions.LOGIN_REQUEST,
  email,
  password,
  role,
  zaloCode,
  zaloId,
  facebookToken,
  facebookId,
});
// 2. LOGIN SUCCESS
export const loginSuccess = (user) => ({
  type: actions.LOGIN_SUCCESS,
  user,
});
// 3. LOGIN FAIL
export const loginFail = (error) => ({
  type: actions.LOGIN_FAIL,
  error,
});
// 4. GET USER REQUEST
export const getUserRequest = (userType) => ({
  type: actions.GET_USER_REQUEST,
  userType,
});
// 5. GET USER SUCCESS
export const getUserSuccess = (user) => ({
  type: actions.GET_USER_SUCCESS,
  user,
});
// 6. GET USER FAIL
export const getUserFail = (error) => ({
  type: actions.GET_USER_FAIL,
  error,
});
// 7. EDIT USER REQUEST
export const editUserRequest = (user) => ({
  type: actions.EDIT_USER_REQUEST,
  user,
});
// 8. EDIT USER SUCCESS
export const editUserSuccess = (user) => ({
  type: actions.EDIT_USER_SUCCESS,
  user,
});
// 9. EDIT USER FAIL
export const editUserFail = (error) => ({
  type: actions.EDIT_USER_FAIL,
  error,
});
// 10. LOGOUT REQUEST
export const logoutRequest = () => ({
  type: actions.LOGOUT_REQUEST,
});
// 11. LOGOUT SUCCESS
export const logoutSuccess = () => ({
  type: actions.LOGOUT_SUCCESS,
});
// 12. LOGOUT FAIL
export const logoutFail = (error) => ({
  type: actions.LOGOUT_FAIL,
  error,
});
