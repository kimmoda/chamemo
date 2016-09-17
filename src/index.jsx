import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBk72F0DXtewljMH6EPWaJZwL5gqGr9Kp4",
  authDomain: "chamemo-f867b.firebaseapp.com",
  databaseURL: "https://chamemo-f867b.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "567148988576"
};

firebase.initializeApp(firebaseConfig);
render(<App/>, document.querySelector("#app"));
