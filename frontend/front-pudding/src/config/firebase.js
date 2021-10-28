import firebase from 'firebase/compat';

firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();
export const fb = firebase;
export const FirebaseFieldValue = firebase.firestore.FieldValue
export const FirebaseTimestamp = firebase.firestore.Timestamp;
export const googleProvider = new firebase.auth.GoogleAuthProvider();