import React from 'react';

export function CatsHome() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  return (
    <div>
      <p>apiKey: {firebaseConfig.apiKey}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi
        consectetur culpa eos expedita! Officiis nobis accusamus corrupti
        nesciunt ullam, distinctio aliquam unde deserunt nulla adipisci eum aut
        totam eos.
      </p>
    </div>
  );
}
