// import FIREBASE from '../config/FIREBASE';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";
import firebaseConfig from "../config/firebase";
import { initializeApp } from "firebase/app";

export const LOGIN_USER = "LOGIN_USER";
export const CEK_LOGIN = "CEK_LOGIN";
export const LOG_OUT = "LOG_OUT";

initializeApp(firebaseConfig);

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGIN_USER);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            if (snapshot.val().status === "admin") {
              //simpan di localstorage pake async storage
              window.localStorage.setItem(
                "user",
                JSON.stringify(snapshot.val())
              );

              dispatchSuccess(dispatch, LOGIN_USER, snapshot.val());
            } else {
              const errorKosongMessage = "Anda bukan admin";
              dispatchError(dispatch, LOGIN_USER, errorKosongMessage);
              alert(errorKosongMessage);
            }
          } else {
            const errorKosongMessage = "User tidak ditemukan";
            dispatchError(dispatch, LOGIN_USER, errorKosongMessage);
            alert(errorKosongMessage);
          }
        });
      })
      .catch((error) => {
        dispatchError(dispatch, LOGIN_USER, error.message);
        alert(error.message);
      });
  };
};

export const cekLogin = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, CEK_LOGIN);
    const userLocalStorage = window.localStorage.getItem("user");
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      const dbRef = ref(getDatabase());
      get(child(dbRef, "users/" + user.uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            if (snapshot.val().status === "admin") {
              dispatchSuccess(dispatch, CEK_LOGIN, snapshot.val());
            } else {
              const errorKosongMessage = "Anda bukan admin";
              dispatchError(dispatch, CEK_LOGIN, errorKosongMessage);
              alert(errorKosongMessage);
              history.push({ pathName: "/login" });
            }
          } else {
            const errorKosongMessage = "Data tidak ditemukan";
            dispatchError(dispatch, CEK_LOGIN, errorKosongMessage);
            alert(errorKosongMessage);
            history.push({ pathName: "/login" });
          }
        })
        .catch((error) => {
          dispatchError(dispatch, CEK_LOGIN, error.message);
          alert(error.message);
          history.push({ pathName: "/login" });
        });
    } else {
      const errorKosongMessage = "Anda belum login";
      dispatchError(dispatch, CEK_LOGIN, errorKosongMessage);

      history.push({ pathname: "/login" });
    }
  };
};

export const logOutUser = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOG_OUT);

    const auth = getAuth();
    signOut(auth)
      .then((res) => {
        window.localStorage.removeItem("user");
        dispatchSuccess(dispatch, CEK_LOGIN, res);
        history.push({ pathname: "/login" });
      })
      .catch((error) => {
        dispatchError(dispatch, CEK_LOGIN, error.message);
        alert(error.message);
      });
  };
};
