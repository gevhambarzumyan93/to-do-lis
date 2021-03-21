import { FIREBASE_RTD_CONFIG } from "../config";
import firebase from "firebase";

export const FIRESTORE = (!firebase.apps.length
  ? firebase.initializeApp(FIREBASE_RTD_CONFIG)
  : firebase.app()
).firestore();

export const get = async (collection) => {
  const snapshot = await FIRESTORE.collection(collection).get();
  const result = snapshot.docs.map((item) => item.data());
  return result;
};

export const add = async (collection, data) => {
  return await FIRESTORE.collection(collection).doc(data.id).set(data);
};

export const set = async (collection, docId, data) => {
  return await FIRESTORE.collection(collection).doc(docId).update(data);
};

export const fbListen = (collection, cb) =>
  FIRESTORE.collection(collection).onSnapshot((docSnapshot) => {
    cb(docSnapshot.docs.map((item) => item.data()));
  });
