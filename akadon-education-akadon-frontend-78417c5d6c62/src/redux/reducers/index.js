import { combineReducers } from "redux";
import { user } from "./userReducer";
import {appConfig} from "./appReducer";

export const rootReducer = combineReducers({
  user,
  appConfig
});
