import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/firestore';
import { CatUser } from '../features/auth/auth.slice';

let firebaseAppInstance: firebase.app.App;

export const getAppInstance = () => {
  if (!firebaseAppInstance) {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    };
    firebaseAppInstance = firebase.initializeApp(firebaseConfig);
  }
  return firebaseAppInstance;
};

export const dbCollections = {
  users: 'users'
};

export const auth = getAppInstance().auth();
export const db = getAppInstance().firestore();

export async function findUserDocumentByEmail(
  email: string
): Promise<CatUser | null> {
  const query = await db
    .collection(dbCollections.users)
    .where('email', '==', email)
    .get();
  if (!query.empty) {
    return query.docs[0].data() as CatUser;
  }
  return null;
}

export async function updateUserIfExists(user: Partial<CatUser>) {
  const userRef = db.collection(dbCollections.users).doc(user.id);
  let updated = false;
  try {
    const updatedData = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        return;
      }
      transaction.update(userRef, updatedData);
      updated = true;
    });
  } catch (error) {
    // console.error(error);
    updated = false;
  }
  return updated;
}
