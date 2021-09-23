import * as firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCc8zYvZJsc9_NyvVXGh0CyP3o1qJ0tZzc",
  authDomain: "eatntreat-4a0d2.firebaseapp.com",
  projectId: "eatntreat-4a0d2",
  storageBucket: "eatntreat-4a0d2.appspot.com",
  messagingSenderId: "143156328785",
  appId: "1:143156328785:web:e6768e65a36b36b2c13b70",
  measurementId: "G-L8S4HD1BPS"
});

export default firebaseConfig;