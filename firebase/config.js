import firebase from 'firebase/app' 
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/firebase-storage'

const firebaseConfig = {
    apiKey: "AIzaSyAoxvDeCZ4NyGH5JX4A8BtcCHI_QLdunkg",
    authDomain: "instagram-mobile-7d110.firebaseapp.com",
    projectId: "instagram-mobile-7d110",
    storageBucket: "instagram-mobile-7d110.appspot.com",
    messagingSenderId: "44759026320",
    appId: "1:44759026320:web:1288a51c6f64672d1de615"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const store = firebase.firestore;
const storage = firebase.storage()

export { auth, firestore, storage, store };
