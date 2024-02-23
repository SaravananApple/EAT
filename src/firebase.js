// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcKCB7td706xf5WmzguhJh8d38P0VYGss",
  authDomain: "activity-recording-57be4.firebaseapp.com",
  projectId: "activity-recording-57be4",
  storageBucket: "activity-recording-57be4.appspot.com",
  messagingSenderId: "283784862596",
  appId: "1:283784862596:web:dc0866169af1ee86771bd1",
  measurementId: "G-WRXG5F53FP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
