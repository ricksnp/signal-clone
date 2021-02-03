import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB-TmI5teMVO5rhNgV52TS4OxMimdCR0zs",
    authDomain: "signal-clone-1.firebaseapp.com",
    projectId: "signal-clone-1",
    storageBucket: "signal-clone-1.appspot.com",
    messagingSenderId: "439036710448",
    appId: "1:439036710448:web:47964900c0d8152613a7f5",
    measurementId: "G-GZKJH549M4"
};

let app;

// No need to keep initializing the app if its already been initialized
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
