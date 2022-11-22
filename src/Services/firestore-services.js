import { collection, addDoc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const firestoreServices = {
  async createDocument(collection, data) {
    try {
      const docRef = await addDoc(collection(db, collection), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    return this.getReferenceId(itemDoc.ref);
  },

  async getReferenceId(reference) {
    const docSnap = await getDoc(reference);
    const data = docSnap.id;
    return data;
  },
};
