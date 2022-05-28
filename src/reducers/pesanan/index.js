import { GET_PESANAN_LIST, UPDATE_PESANAN } from "../../actions/PesananAction";

const initialState = {
  getPesananLoading: false,
  getPesananResult: false,
  getPesananError: false,

  updatePesananLoading: false,
  updatePesananResult: false,
  updatePesananError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PESANAN_LIST:
      return {
        ...state,
        getPesananLoading: action.payload.loading,
        getPesananResult: action.payload.data,
        getPesananError: action.payload.errorMessage,
      };
    case UPDATE_PESANAN:
      return {
        ...state,
        updatePesananLoading: action.payload.loading,
        updatePesananResult: action.payload.data,
        updatePesananError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
