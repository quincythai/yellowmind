import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY!
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Optionally specify your databaseURL if needed:
    // databaseURL: "https://<PROJECT_ID>.firebaseio.com"
  });
}

export const adminDb = admin.firestore();
