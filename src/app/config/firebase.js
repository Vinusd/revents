
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,

    authDomain: "reventscourse-87062.firebaseapp.com",
  
    projectId: "reventscourse-87062",
  
    storageBucket: "reventscourse-87062.appspot.com",
  
    messagingSenderId: "979359557659",
  
    appId: "1:979359557659:web:04c85dad57eb6c94f970be",

    databaseURL:"https://reventscourse-87062-default-rtdb.asia-southeast1.firebasedatabase.app"
  
}


firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase