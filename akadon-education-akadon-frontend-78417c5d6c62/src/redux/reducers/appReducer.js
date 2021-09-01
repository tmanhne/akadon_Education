import * as actions from "../actions/actionTypes";

const language = localStorage.getItem("language");
const initState = {
  loading: [],
  language: language || "vi",
};

export const appConfig = (state = initState, action) => {
  switch (action.type) {
    case actions.LOADING_REQUEST:
      return { ...state, loading: [...state.loading, action.url] };

    case actions.LOADING_RESPONSE: {
      const loading = [...state.loading];
      loading.shift();
      return { ...state, loading: [...loading] };
    }

    case actions.SET_LANGUAGE:
      return { ...state, language: action.language };
    default:
      return state;
  }
};
