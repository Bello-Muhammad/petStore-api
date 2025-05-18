const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require('../../firebase-key2.json');

initializeApp({
    credential: cert(serviceAccount),

});

const db = getFirestore();
const User = db.collection("users");
const Pet = db.collection("pets");
const Transaction = db.collection("transaction");

module.exports = {
    Pet,
    User,
    Transaction
}