import app from "firebase/app";
// implémenter l'API d'auth pour notre classe
import "firebase/auth"; // package d'auth 2
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    // implémenter l'API d'auth pour notre classe 2
    this.auth = app.auth();
    // --------------------------------------------
    this.db = app.firestore();
  }
  // Fonction d'authentification: 3
  // Inscription
  signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Deconnexion pas de param
  signoutUser = () => this.auth.signOut();

  // Recuperer le mot de pass
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // Fontion dataBase :
  user = (uid) => this.db.doc(`users/${uid}`);
}

export default Firebase;
