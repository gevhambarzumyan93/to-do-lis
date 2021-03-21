import { get, add, set, fbListen } from "./firebase";

const collection = (val) => `users/${val}/tasks`;

export const query = async (id) => {
  return await get(collection(id));
};

export const create = async (userId, data) => {
  return await add(collection(userId), data);
};

export const update = async (userId, docId, data) => {
  return await set(collection(userId), docId, data);
};

export const listen = (id, listner) => fbListen(collection(id), listner);
