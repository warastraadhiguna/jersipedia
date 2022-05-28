import { LOGIN_USER, CEK_LOGIN, LOG_OUT } from "../../actions/AuthAction";

const initialState = {
  cekLoginLoading: false,
  cekLoginResult: false,
  cekLoginError: false,

  loginLoading: false,
  loginResult: false,
  loginError: false,

  logoutLoading: false,
  logoutResult: false,
  logoutError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case CEK_LOGIN:
      return {
        ...state,
        cekLoginLoading: action.payload.loading,
        cekLoginResult: action.payload.data,
        cekLoginError: action.payload.errorMessage,
      };
    case LOGIN_USER:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResult: action.payload.data,
        loginError: action.payload.errorMessage,
      };
    case LOG_OUT:
      return {
        ...state,
        logoutLoading: action.payload.loading,
        logoutResult: action.payload.data,
        logoutError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
