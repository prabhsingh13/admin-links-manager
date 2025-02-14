const admin = require('firebase-admin');

// Initialize Firebase only if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require('./firebase-admin.json')),
    });
}

const db = admin.firestore();
module.exports = db;
