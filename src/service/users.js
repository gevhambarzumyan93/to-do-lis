import { get, add, set } from "./firebase";

const collection = "users";

export const query = async () => {
  return await get(collection);
};

export const create = async (data) => {
  return await add(collection, data);
};

export const update = async (docId, data) => {
  return await set(collection, docId, data);
};
