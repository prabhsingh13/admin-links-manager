import admin from "firebase-admin";
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

// Initialize Firebase only if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin.firestore();