import {
  GET_JERSEY_LIST,
  UPLOAD_JERSEY,
  TAMBAH_JERSEY,
  GET_DETAIL_JERSEY,
  UPDATE_JERSEY,
  DELETE_JERSEY,
} from "../../actions/JerseyAction";

const initialState = {
  getJerseyLoading: false,
  getJerseyResult: false,
  getJerseyError: false,

  uploadJerseyLoading: false,
  uploadJerseyResult: false,
  uploadJerseyError: false,

  tambahJerseyLoading: false,
  tambahJerseyResult: false,
  tambahJerseyError: false,

  updateJerseyLoading: false,
  updateJerseyResult: false,
  updateJerseyError: false,

  deleteJerseyLoading: false,
  deleteJerseyResult: false,
  deleteJerseyError: false,

  detailJerseyLoading: false,
  detailJerseyResult: false,
  detailJerseyError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_JERSEY_LIST:
      return {
        ...state,
        getJerseyLoading: action.payload.loading,
        getJerseyResult: action.payload.data,
        getJerseyError: action.payload.errorMessage,
      };
    case UPLOAD_JERSEY:
      return {
        ...state,
        uploadJerseyLoading: action.payload.loading,
        uploadJerseyResult: action.payload.data,
        uploadJerseyError: action.payload.errorMessage,
      };
    case TAMBAH_JERSEY:
      return {
        ...state,
        tambahJerseyLoading: action.payload.loading,
        tambahJerseyResult: action.payload.data,
        tambahJerseyError: action.payload.errorMessage,
      };
    case UPDATE_JERSEY:
      return {
        ...state,
        updateJerseyLoading: action.payload.loading,
        updateJerseyResult: action.payload.data,
        updateJerseyError: action.payload.errorMessage,
      };
    case DELETE_JERSEY:
      return {
        ...state,
        deleteJerseyLoading: action.payload.loading,
        deleteJerseyResult: action.payload.data,
        deleteJerseyError: action.payload.errorMessage,
      };
    case GET_DETAIL_JERSEY:
      return {
        ...state,
        detailJerseyLoading: action.payload.loading,
        detailJerseyResult: action.payload.data,
        detailJerseyError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
