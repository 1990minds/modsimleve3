
  import firebase from 'firebase';

 const firebaseConfig = {
  apiKey: "AIzaSyB047dG3-KMqN8axBTOTs8Xa76uSm_ujqU",
  authDomain: "modsimadmin-ce9c3.firebaseapp.com",
  projectId: "modsimadmin-ce9c3",
  storageBucket: "modsimadmin-ce9c3.appspot.com",
  messagingSenderId: "576979738081",
  appId: "1:576979738081:web:4c12bfbf628a1959a446a0",
  measurementId: "G-P1LPP238E5"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;