import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAV-8l1RttGB3hb-9QcGv0UXVgYS_2gjws",
  authDomain: "instamockpost.firebaseapp.com",
  projectId: "instamockpost",
  storageBucket: "instamockpost.appspot.com",
  messagingSenderId: "128201418428",
  appId: "1:128201418428:web:f63b1c63239b103004d2b9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
