import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyANPz4WUFnPnL6UgodFZH7R-J9hnf5ctXM",
    authDomain: "codemonk-ecommerce-1658c.firebaseapp.com",
    databaseURL: "https://codemonk-ecommerce-1658c.firebaseio.com",
    projectId: "codemonk-ecommerce-1658c",
    storageBucket: "codemonk-ecommerce-1658c.appspot.com",
    messagingSenderId: "481512000218",
    appId: "1:481512000218:web:0749d3a08df9f0fd8eb3e3"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();                                 


  export { db, auth };
