import firebase from 'firebase/compat';

firebase.initializeApp({
	apiKey: "AIzaSyDxYFjyG9NheHbpKo0uxZSw_OkC1z4p8uQ",
	authDomain: "pj-pudding.firebaseapp.com",
	projectId: "pj-pudding",
	storageBucket: "pj-pudding.appspot.com",
	messagingSenderId: "382465989630",
	appId: "1:382465989630:web:dc1602b6c7bf9de92a3eaf",
	measurementId: "G-64J62ZQBV2"
});

export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();
export const fb = firebase;
export const FirebaseFieldValue = firebase.firestore.FieldValue
export const FirebaseTimestamp = firebase.firestore.Timestamp;
export const googleProvider = new firebase.auth.GoogleAuthProvider();