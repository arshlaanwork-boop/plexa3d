import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
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
