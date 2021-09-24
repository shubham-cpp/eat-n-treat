import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCxW3AjObm52XyoHXI5FQ8zogsTGAEwkqg",
  authDomain: "eatntreat-7a9fa.firebaseapp.com",
  projectId: "eatntreat-7a9fa",
  storageBucket: "eatntreat-7a9fa.appspot.com",
  messagingSenderId: "814989241675",
  appId: "1:814989241675:web:d9d41428e0a21c09484cce"
})

export const auth = app.auth()
export default app