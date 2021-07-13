import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCjIbUA3JjLkJiGbPxMYPKtD-Yki4Rgnf0",
    authDomain: "netflix-like-page.firebaseapp.com",
    projectId: "netflix-like-page",
    storageBucket: "netflix-like-page.appspot.com",
    messagingSenderId: "135781446033",
    appId: "1:135781446033:web:cef911ff0b14ea775cea30",
    measurementId: "G-GZ3RMQ7V6Z"
  }
 
  firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const db = firebase.firestore()  

  export {db, auth}