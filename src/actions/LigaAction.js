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

export const GET_LIGA_LIST = "GET_LIGA_LIST";
export const TAMBAH_LIGA = "TAMBAH_LIGA";
export const GET_DETAIL_LIGA = "GET_DETAIL_LIGA";
export const UPDATE_LIGA = "UPDATE_LIGA";
export const DELETE_LIGA = "DELETE_LIGA";

initializeApp(firebaseConfig);
const db = getDatabase();

export const getLigaList = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIGA_LIST);

    const dbRef = ref(getDatabase());
    get(child(dbRef, "ligas"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatchSuccess(dispatch, GET_LIGA_LIST, snapshot.val());
        } else {
          const errorKosongMessage = "Data tidak ditemukan";
          dispatchError(dispatch, GET_LIGA_LIST, errorKosongMessage);
          alert(errorKosongMessage);
        }
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIGA_LIST, error.message);
        alert(error.message);
      });
  };
};

export const tambahLiga = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_LIGA);

    const storage = getStorage();
    const storageRef = sRef(storage, "ligas/" + data.imageToDB.name);

    const uploadTask = uploadBytesResumable(storageRef, data.imageToDB);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const dataBaru = {
            namaLiga: data.namaLiga,
            image: downloadURL,
          };

          push(ref(db, "ligas"), dataBaru)
            .then((response) => {
              dispatchSuccess(dispatch, TAMBAH_LIGA, response ? response : []);
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_LIGA, error.message);
              alert(error.message);
            });
        });
      }
    );
  };
};

export const getDetailLiga = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_LIGA);

    const dbRef = ref(getDatabase());
    get(child(dbRef, "ligas/" + id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatchSuccess(dispatch, GET_DETAIL_LIGA, snapshot.val());
        } else {
          const errorKosongMessage = "Data tidak ditemukan";
          dispatchError(dispatch, GET_DETAIL_LIGA, errorKosongMessage);
          alert(errorKosongMessage);
        }
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIGA_LIST, error.message);
        alert(error.message);
      });
  };
};

export const updateLiga = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_LIGA);

    if (data.imageToDB) {
      const storage = getStorage();
      // Create a reference to the file to delete
      const desertRef = sRef(storage, data.imageLama);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          const storageRef = sRef(storage, "ligas/" + data.imageToDB.name);
          const uploadTask = uploadBytesResumable(storageRef, data.imageToDB);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const dataBaru = {
                  namaLiga: data.namaLiga,
                  image: downloadURL,
                };

                const db = getDatabase();
                const dbRef = ref(db, "ligas/" + data.id);
                update(dbRef, dataBaru)
                  .then((response) => {
                    dispatchSuccess(
                      dispatch,
                      UPDATE_LIGA,
                      response ? response : []
                    );
                  })
                  .catch((error) => {
                    dispatchError(dispatch, UPDATE_LIGA, error.message);
                    alert(error.message);
                  });
              });
            }
          );
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_LIGA, error.message);
          alert(error.message);
        });
    } else {
      const dataBaru = {
        namaLiga: data.namaLiga,
        image: data.image,
      };

      const db = getDatabase();
      const dbRef = ref(db, "ligas/" + data.id);
      update(dbRef, dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_LIGA, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_LIGA, error.message);
          alert(error.message);
        });
    }
  };
};

export const deleteLiga = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_LIGA);

    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = sRef(storage, image);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        remove(ref(db, "ligas/" + id))
          .then(() => {
            dispatchSuccess(dispatch, DELETE_LIGA, "Data berhasil dihapus");
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_LIGA, error.message);
            alert(error.message);
          });
      })
      .catch((error) => {
        dispatchError(dispatch, DELETE_LIGA, error.message);
        alert(error.message);
      });
  };
};
