import * as actions from "../actions/actionTypes";
import { getLocalStorage } from "../../api";

const localUser = getLocalStorage("user");
const initState = localUser
  ? {
      isLoading: false,
      error: "",
      info: { ...localUser },
    }
  : {
      isLoading: false,
      error: "",
      info: {
        userType: "",
      },
    };

export const user = (state = initState, action) => {
  switch (action.type) {
    // LOGIN
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        info: { ...action.user },
      };
    case actions.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        info: {},
      };
    // LOGOUT
    case actions.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        info: { ...action.user },
      };
    case actions.LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        info: {},
      };
    // GET USER PROFILE
    case actions.GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        info: { ...state.info, ...action.user },
      };
    case actions.GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        info: localUser ? { ...localUser } : {},
      };
    // EDIT USER PROFILE
    case actions.EDIT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actions.EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        info: { ...state.info, ...action.user },
      };
    case actions.EDIT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
