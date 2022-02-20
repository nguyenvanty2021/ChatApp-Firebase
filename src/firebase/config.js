// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import "firebase/storage";
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4Kr4DNPKBFZgoGAZaXitleaR2BZA-3QI",
  authDomain: "chat-app-f4356.firebaseapp.com",
  databaseURL: "https://chat-app-f4356-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-f4356",
  storageBucket: "chat-app-f4356.appspot.com",
  messagingSenderId: "919461873729",
  appId: "1:919461873729:web:0eb71b61578311a7fcdec0",
  measurementId: "G-V6TBCE33HZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
if (window.location.hostname === 'localhost') {
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
}

export { db, auth,storage };
export default firebase;