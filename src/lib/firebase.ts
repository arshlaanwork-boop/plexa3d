import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBBUq6oSWagewzQ0WsG2CQ5g5SU8-Gn3V8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "onyx-shade-5wjkk.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "onyx-shade-5wjkk",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "onyx-shade-5wjkk.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "799134615814",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:799134615814:web:7b2785d22f851a56d2b687",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-3aad8436-e385-4b48-b80a-808a886c3cb3"); // Using explicitly provided DB ID
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider);
};

export const logout = async () => {
  await signOut(auth);
};

export enum OperationType {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE'
}

export const handleFirestoreError = (error: any, operation: OperationType = OperationType.READ) => {
  console.error(`Firestore ${operation} error:`, error);
  let message = 'An error occurred while accessing the database.';
  if (error?.code === 'permission-denied') {
    message = 'You do not have permission to perform this action.';
  } else if (error?.code === 'unauthenticated') {
    message = 'Please sign in to continue.';
  } else if (error?.code === 'not-found') {
    message = 'The requested document was not found.';
  }
  return new Error(message);
};
