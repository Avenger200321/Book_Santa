import firebase from 'firebase';
require('@firebase/firestore')



var firebaseConfig = {
  apiKey: "AIzaSyB87lJj4MkybpKcuQUvlcC1TKqQix2xGag",
  authDomain: "book-santa-3e633.firebaseapp.com",
  databaseURL: "https://book-santa-3e633.firebaseio.com",
  projectId: "book-santa-3e633",
  storageBucket: "book-santa-3e633.appspot.com",
  messagingSenderId: "443195809865",
  appId: "1:443195809865:web:cbe39cf27f532662761f98",
  measurementId: "G-YHWV2VQWLE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();