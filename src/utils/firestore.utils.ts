import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/firestore';
import { CatUser } from '../features/auth/auth.slice';

let firebaseAppInstance: firebase.app.App;

export const getAppInstance = () => {
  const isProd = process.env.NODE_ENV === 'production';
  if (!firebaseAppInstance) {
    const firebaseConfigDev = {
      apiKey: 'AIzaSyAbPD7B0vrP99CSXOeLMbzB3bxbtDNi2PY',
      authDomain: 'catsapi-react-demonstration.firebaseapp.com',
      projectId: 'catsapi-react-demonstration',
      storageBucket: 'catsapi-react-demonstration.appspot.com',
      messagingSenderId: '589018570976',
      appId: '1:589018570976:web:ce712173d2b0f8a822f085'
    };
    const firebaseConfigProd = {
      apiKey: 'AIzaSyD6lXKDTx2RFQoRVW93Eo0SrwdL2wHTKSA',
      authDomain: 'catsapi-prod.firebaseapp.com',
      projectId: 'catsapi-prod',
      storageBucket: 'catsapi-prod.appspot.com',
      messagingSenderId: '789304791379',
      appId: '1:789304791379:web:dc9eb4328458231ac611a6'
    };
    firebaseAppInstance = firebase.initializeApp(
      isProd ? firebaseConfigProd : firebaseConfigDev
    );
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
