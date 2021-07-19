import firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyCHSe2R7sEFOx5lq_O1rylWxLq81pRd1_g",
    authDomain: "booksanta-ed8d8.firebaseapp.com",
    projectId: "booksanta-ed8d8",
    storageBucket: "booksanta-ed8d8.appspot.com",
    messagingSenderId: "147773398000",
    appId: "1:147773398000:web:b97fdff3cb2d458b18db35"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();