import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
}

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

export { projectFirestore }
