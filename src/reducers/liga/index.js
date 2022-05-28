import {
  GET_LIGA_LIST,
  TAMBAH_LIGA,
  GET_DETAIL_LIGA,
  UPDATE_LIGA,
  DELETE_LIGA,
} from "../../actions/LigaAction";

const initialState = {
  getLigaLoading: false,
  getLigaResult: false,
  getLigaError: false,

  tambahLigaLoading: false,
  tambahLigaResult: false,
  tambahLigaError: false,

  detailLigaLoading: false,
  detailLigaResult: false,
  detailLigaError: false,

  updateLigaLoading: false,
  updateLigaResult: false,
  updateLigaError: false,

  deleteLigaLoading: false,
  deleteLigaResult: false,
  deleteLigaError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIGA_LIST:
      return {
        ...state,
        getLigaLoading: action.payload.loading,
        getLigaResult: action.payload.data,
        getLigaError: action.payload.errorMessage,
      };
    case TAMBAH_LIGA:
      return {
        ...state,
        tambahLigaLoading: action.payload.loading,
        tambahLigaResult: action.payload.data,
        tambahLigaError: action.payload.errorMessage,
      };
    case GET_DETAIL_LIGA:
      return {
        ...state,
        detailLigaLoading: action.payload.loading,
        detailLigaResult: action.payload.data,
        detailLigaError: action.payload.errorMessage,
      };
    case UPDATE_LIGA:
      return {
        ...state,
        updateLigaLoading: action.payload.loading,
        updateLigaResult: action.payload.data,
        updateLigaError: action.payload.errorMessage,
      };
    case DELETE_LIGA:
      return {
        ...state,
        deleteLigaLoading: action.payload.loading,
        deleteLigaResult: action.payload.data,
        deleteLigaError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
