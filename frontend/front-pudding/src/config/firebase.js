import firebase from 'firebase/compat';
import * as FIREBASE_CONFIG from '../../.env.local'

firebase.initializeApp({
	apiKey: FIREBASE_CONFIG.REACT_APP_FIREBASE_API_KEY,
	authDomain: FIREBASE_CONFIG.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_CONFIG.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_CONFIG.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_CONFIG.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
	appId: FIREBASE_CONFIG.REACT_APP_FIREBASE_APP_ID,
	measurementId: FIREBASE_CONFIG.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();
export const fb = firebase;
export const FirebaseFieldValue = firebase.firestore.FieldValue
export const FirebaseTimestamp = firebase.firestore.Timestamp;
export const googleProvider = new firebase.auth.GoogleAuthProvider();