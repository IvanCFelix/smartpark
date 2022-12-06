import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../firebaseConfig";
import { Alert } from "react-native";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const firestoreServices = {
  async createDocument(dbCollection, data) {
    try {
      const docRef = await addDoc(collection(db, dbCollection), data);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },

  async getReferenceById(reference, dbCollection) {
    const docRef = doc(db, dbCollection, reference);
    return docRef;
  },

  async getCollection(dbCollection) {
    const list = [];
    try {
      const q = query(collection(db, dbCollection));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      return list;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
};
