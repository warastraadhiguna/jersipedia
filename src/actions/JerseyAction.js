import {
  getDatabase,
  ref,
  child,
  get,
  push,
  update,
  remove,
} from "firebase/database";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";
import firebaseConfig from "../config/firebase";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref as sRef,
  deleteObject,
} from "firebase/storage";

initializeApp(firebaseConfig);
const db = getDatabase();

export const GET_JERSEY_LIST = "GET_JERSEY_LIST";
export const UPLOAD_JERSEY = "UPLOAD_JERSEY";
export const TAMBAH_JERSEY = "TAMBAH_JERSEY";
export const UPDATE_JERSEY = "UPDATE_JERSEY";
export const DELETE_JERSEY = "DELETE_JERSEY";
export const GET_DETAIL_JERSEY = "GET_DETAIL_JERSEY";

export const getJerseyList = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_JERSEY_LIST);

    const dbRef = ref(getDatabase());
    get(child(dbRef, "jerseys"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatchSuccess(dispatch, GET_JERSEY_LIST, snapshot.val());
        } else {
          const errorKosongMessage = "Data tidak ditemukan";
          dispatchError(dispatch, GET_JERSEY_LIST, errorKosongMessage);
          alert(errorKosongMessage);
        }
      })
      .catch((error) => {
        dispatchError(dispatch, GET_JERSEY_LIST, error.message);
        alert(error.message);
      });
  };
};

export const uploadJersey = (gambar, imageToDB) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPLOAD_JERSEY);
    const storage = getStorage();
    const storageRef = sRef(storage, "jerseys/" + gambar.name);

    const uploadTask = uploadBytesResumable(storageRef, gambar);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        dispatchError(dispatch, UPLOAD_JERSEY, error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const dataBaru = {
            imageToDB: imageToDB,
            image: downloadURL,
          };
          dispatchSuccess(dispatch, UPLOAD_JERSEY, dataBaru);
        });
      }
    );
  };
};

export const tambahJersey = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_JERSEY);

    const dataBaru = {
      gambar: [data.imageToDb1, data.imageToDb2],
      nama: data.nama,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      ready: data.ready,
      ukuran: data.ukuranSelected,
      liga: data.liga,
    };

    push(ref(db, "jerseys"), dataBaru)
      .then((response) => {
        dispatchSuccess(dispatch, TAMBAH_JERSEY, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, TAMBAH_JERSEY, error.message);
        alert(error.message);
      });
  };
};

export const updateJersey = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_JERSEY);

    const dataBaru = {
      gambar: [
        data.imageToDb1 ? data.imageToDb1 : data.imageLama1,
        data.imageToDb2 ? data.imageToDb2 : data.imageLama2,
      ],
      nama: data.nama,
      harga: data.harga,
      berat: data.berat,
      jenis: data.jenis,
      ready: data.ready,
      ukuran: data.ukuranSelected,
      liga: data.liga,
    };

    const dbRef = ref(db, "jerseys/" + data.id);
    update(dbRef, dataBaru)
      .then((response) => {
        if (data.imageToDb1) {
          const storage = getStorage();
          const desertRef = sRef(storage, data.imageLama1);

          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              dispatchError(dispatch, UPDATE_JERSEY, error.message);
              alert(error.message);
            });
        }
        if (data.imageToDb2) {
          const storage = getStorage();
          const desertRef = sRef(storage, data.imageLama2);

          deleteObject(desertRef)
            .then(() => {})
            .catch((error) => {
              dispatchError(dispatch, UPDATE_JERSEY, error.message);
              alert(error.message);
            });
        }
        dispatchSuccess(dispatch, UPDATE_JERSEY, response ? response : []);
      })
      .catch((error) => {
        dispatchError(dispatch, UPDATE_JERSEY, error.message);
        alert(error.message);
      });
  };
};

export const deleteJersey = (images, key) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_JERSEY);

    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = sRef(storage, images[0]);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        const desertRef2 = sRef(storage, images[1]);
        deleteObject(desertRef2)
          .then(() => {
            remove(ref(db, "jerseys/" + key))
              .then(() => {
                dispatchSuccess(
                  dispatch,
                  DELETE_JERSEY,
                  "Data berhasil dihapus"
                );
              })
              .catch((error) => {
                dispatchError(dispatch, DELETE_JERSEY, error.message);
                alert(error.message);
              });
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_JERSEY, error.message);
            alert(error.message);
          });
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_JERSEY, error.message);
        alert(error.message);
      });
  };
};

export const getDetailJersey = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_JERSEY);

    const dbRef = ref(getDatabase());
    get(child(dbRef, "jerseys/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatchSuccess(dispatch, GET_DETAIL_JERSEY, snapshot.val());
        } else {
          const errorKosongMessage = "Data tidak ditemukan";
          dispatchError(dispatch, GET_DETAIL_JERSEY, errorKosongMessage);
          alert(errorKosongMessage);
        }
      })
      .catch((error) => {
        dispatchError(dispatch, GET_JERSEY_LIST, error.message);
        alert(error.message);
      });
  };
};
