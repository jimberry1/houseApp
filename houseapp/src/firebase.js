import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyDfeuyqrnSSzvbhxjDESrhzLdpVdScpIUA',
  authDomain: 'django-tsunami.firebaseapp.com',
  projectId: 'django-tsunami',
  storageBucket: 'django-tsunami.appspot.com',
  messagingSenderId: '881616071635',
  appId: '1:881616071635:web:9d8ba8f150f6d6dcb31d26',
  measurementId: 'G-KHX17HYL1T',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage, firebaseApp };
export default db;
