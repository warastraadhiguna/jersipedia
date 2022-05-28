import { getDatabase, ref, child, get, update } from "firebase/database";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";
import firebaseConfig from "../config/firebase";
import { initializeApp } from "firebase/app";

initializeApp(firebaseConfig);

export const GET_PESANAN_LIST = "GET_PESANAN_LIST";
export const UPDATE_PESANAN = "UPDATE_PESANAN";

export const getPesananList = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PESANAN_LIST);

    const dbRef = ref(getDatabase());
    get(child(dbRef, "histories"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatchSuccess(dispatch, GET_PESANAN_LIST, snapshot.val());
        } else {
          const errorKosongMessage = "Data tidak ditemukan";
          dispatchError(dispatch, GET_PESANAN_LIST, errorKosongMessage);
          alert(errorKosongMessage);
        }
      })
      .catch((error) => {
        dispatchError(dispatch, GET_PESANAN_LIST, error.message);
        alert(error.message);
      });
  };
};

export const updatePesanan = (order_id, transaction_status) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_PESANAN);
    const statusBaru =
      transaction_status === "settlement" || transaction_status === "capture"
        ? "lunas"
        : transaction_status;

    const db = getDatabase();
    const dbRef = ref(db, "histories/" + order_id);
    update(dbRef, { status: statusBaru })
      .then((response) => {
        dispatchSuccess(dispatch, UPDATE_PESANAN, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_PESANAN, error.message);
        alert(error.message);
      });
  };
};
