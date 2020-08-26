import React from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCxFs3zd19KO3Ue0cwJg8nDrE2rm6zZwm0",
  authDomain: "doctor-appointment-booki-dbdf.firebaseapp.com",
  databaseURL: "https://doctor-appointment-booki-dbdf.firebaseio.com",
  projectId: "doctor-appointment-booki-dbdf",
  storageBucket: "doctor-appointment-booki-dbdf.appspot.com",
  messagingSenderId: "332039631630",
  appId: "1:332039631630:web:8a1908bf2a5fcd874a5d5f",
  measurementId: "G-42BX5779HH",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const AuthContext = React.createContext(null);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
export default {db, auth};

