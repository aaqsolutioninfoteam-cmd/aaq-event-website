// Firebase Configuration & Initialization
// Using existing Firebase project: aaq-event-erp

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8oQaQ051U1lXafwdjjOo38t56WwsdBO4",
    authDomain: "aaq-event-erp.firebaseapp.com",
    projectId: "aaq-event-erp",
    storageBucket: "aaq-event-erp.firebasestorage.app",
    messagingSenderId: "985636664002",
    appId: "1:985636664002:web:4b941d3562609d2058815b",
    measurementId: "G-HHD049KDS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log("✅ Firebase initialized successfully");
