
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCDGpEk_MLJGwQ-eb7oiNcMSCOtVaVU614",

    authDomain: "reventscourse-87062.firebaseapp.com",
  
    projectId: "reventscourse-87062",
  
    storageBucket: "reventscourse-87062.appspot.com",
  
    messagingSenderId: "979359557659",
  
    appId: "1:979359557659:web:04c85dad57eb6c94f970be"
  
}


firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase