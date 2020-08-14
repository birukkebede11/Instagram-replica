import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCLETyooNw5ZM3oecyft-k9k5UrLNn5DBg",
    authDomain: "instagram-replica-react.firebaseapp.com",
    databaseURL: "https://instagram-replica-react.firebaseio.com",
    projectId: "instagram-replica-react",
    storageBucket: "instagram-replica-react.appspot.com",
    messagingSenderId: "135782568778",
    appId: "1:135782568778:web:485e62817868618ca727b3",
    measurementId: "G-WH68T766H4"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };