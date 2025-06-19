
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyBn2WKMl7X1s94bZn4FUvTVuZ_L3dMPWKE",

  authDomain: "khao-948dc.firebaseapp.com",

  projectId: "khao-948dc",

  storageBucket: "khao-948dc.firebasestorage.app",

  messagingSenderId: "604804443832",

  appId: "1:604804443832:web:729ac0c82cc12753260e4d",

  measurementId: "G-NC4MNXCJ72"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
