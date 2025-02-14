import admin from "firebase-admin";

if (!process.env.FIREBASE_ADMIN_CREDENTIALS) {
  throw new Error("Missing FIREBASE_ADMIN_CREDENTIALS environment variable");
}

// Parse environment variable safely
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

// Fix private key formatting (replace \\n with actual newlines)
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

// Initialize Firebase only if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export { db };
