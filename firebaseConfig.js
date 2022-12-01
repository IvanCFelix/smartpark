import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyCX1AYANAMaXVUxpjCaYLcTS4lHC_x1LMs",
  authDomain: "smartpark-286d6.firebaseapp.com",
  projectId: "smartpark-286d6",
  storageBucket: "smartpark-286d6.appspot.com",
  messagingSenderId: "261115306083",
  appId: "1:261115306083:web:4468db5a64aad5d9171856",
  databaseURL: "https://smartpark-286d6-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
