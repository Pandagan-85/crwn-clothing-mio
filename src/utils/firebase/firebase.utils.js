// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuGc54pZ2__XUW-q6gaU8yUNExOwU8uCQ",
  authDomain: "crwn-clothing-db-8ae80.firebaseapp.com",
  projectId: "crwn-clothing-db-8ae80",
  storageBucket: "crwn-clothing-db-8ae80.appspot.com",
  messagingSenderId: "360856808376",
  appId: "1:360856808376:web:ad06eab8756e88ee103d4d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

//per il login in popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
//per il login con redirect
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

//creiamo il DB istanziando firestore
export const db = getFirestore();

//creaiamo un metodo per creare un utente nel db dall'autorizzazione che riceve il codice di autorizzazione

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //dobbiamo capire per prima cosa se esiste una referenza del documento

  const userDocRef = doc(db, "user", userAuth.uid);
  console.log(userDocRef);

  const userSnapshop = await getDoc(userDocRef);
  console.log(userSnapshop);
  console.log(userSnapshop.exists());
  //if user data does not exist
  //Create / set the document with the data from userAuth in my collection

  if (!userSnapshop.exists()) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,

        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists
  //return userDocRef

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
