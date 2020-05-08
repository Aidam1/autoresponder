import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBbWxBXXG-P-3d8CgJb-WG8PpzJmybGcas",
    authDomain: "firebasics-9b8be.firebaseapp.com",
    databaseURL: "https://firebasics-9b8be.firebaseio.com",
    projectId: "firebasics-9b8be",
    storageBucket: "firebasics-9b8be.appspot.com",
    messagingSenderId: "426910015766",
    appId: "1:426910015766:web:77de11f23801f651037037"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;