import { take, put, call, all } from "redux-saga/effects";
import * as Api from "../../../api";
import * as userActions from "../userActions";
import * as actionTypes from "../actionTypes";
import { toast } from "react-toastify";
import LoginToast from "./LoginToast";

// 1. LOGIN
function* login() {
  while (true) {
    const student_request_id = localStorage.getItem("request_id") * 1 || null;

    // 1. LISTENING LOGIN_REQUEST
    const {
      email,
      password,
      role,
      zaloCode,
      zaloId,
      facebookToken,
      facebookId,
    } = yield take(actionTypes.LOGIN_REQUEST);
    // 2. CALL LOGIN API
    let res = {};
    if (zaloCode && zaloId) {
      // zalo login
      res = yield call(Api.loginWithZalo, {
        code: zaloCode,
        uid: zaloId,
        role,
        student_request_id,
      });
    } else if (facebookToken && facebookId) {
      // facebook login
      res = yield call(Api.loginWithFacebook, {
        role,
        accessToken: facebookToken,
        userID: facebookId,
        student_request_id,
      });
    } else {
      // traditional login
      res = yield call(Api.login, email, password, role, student_request_id);
    }

    // 3. IMPLEMENT SUCCESS
    if (res.status < 400) {
      console.log(role, role === 0);
      const token = res.data.access_token;
      const userType = role * 1 === 0 ? "student" : "tutor";
      const user = {
        ...res.data.user,
        userType,
      };
      yield call(Api.setLocalStorage, "access_token", token);
      yield call(Api.setLocalStorage, "isLogin", true);
      yield call(Api.setLocalStorage, "firstLogin", true);
      yield call(Api.setLocalStorage, "user", user);
      yield put(userActions.loginSuccess(user));
    }
    // 4. IMPLEMENT ERROR
    if (res.response) {
      if (res.response.status >= 500) {
        yield put(userActions.loginFail(<LoginToast content={"loi1"} />));
      } else if (res.response.status === 404) {
        yield put(userActions.loginFail("userDoesNotExist"));
      } else if (res.response.status === 403) {
        toast.error(<LoginToast content={"loi3"} data={role} />);
      } else {
        yield put(userActions.loginFail(<LoginToast content={"loi4"} />));
      }
    }
  }
}
// 2. GET USER
function* getUser() {
  while (true) {
    yield take(actionTypes.GET_USER_REQUEST);
    const res = yield call(Api.getUser);
    if (res.status < 400 && res.data) {
      const { userType } = Api.getLocalStorage("user");
      const user = { ...res.data };
      const localUser = Api.getLocalStorage("user");
      yield call(Api.setLocalStorage, "user", {
        ...localUser,
        ...user,
        userType,
      });
      yield put(userActions.getUserSuccess({ ...user, userType }));
    } else {
      yield put(
        userActions.getUserFail(
          <LoginToast content={"loi5"} data={res.status} />
        )
      );
    }
  }
}
// 3. EDIT USER
function* editUser() {
  while (true) {
    const { user } = yield take(actionTypes.EDIT_USER_REQUEST);
    const res = yield call(Api.editUser, user);
    if (res.status < 400 && res.data) {
      const localUser = Api.getLocalStorage("user");
      const user = { ...localUser, ...res.data };
      yield call(Api.setLocalStorage, "user", user);
      yield put(userActions.editUserSuccess(user));
      yield put(userActions.getUserRequest());
      toast.success(<LoginToast content={"loi7"} />);
    } else {
      yield put(
        userActions.editUserFail(
          <LoginToast content={"loi5"} data={res.status} />
        )
      );
      toast.error(<LoginToast content={"loi5"} data={res.status} />, {
        autoClose: false,
      });
    }
  }
}
// 4. LOGOUT
function* logout() {
  while (true) {
    yield take(actionTypes.LOGOUT_REQUEST);

    localStorage.removeItem("user");
    localStorage.removeItem("loginCredentials");

    yield put(userActions.logoutSuccess());

    yield call(Api.logout);

    yield call([localStorage, localStorage.clear]);
  }
}
// ROOT USER SAGA
export default function* rootSaga() {
  yield all([login(), getUser(), editUser(), logout()]);
}
