import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDvIYm3IwNQyAIZJIt2ihBT7YaFN1N0K_g",
    authDomain: "cookingmaster-b9c8b.firebaseapp.com",
    projectId: "cookingmaster-b9c8b",
    storageBucket: "cookingmaster-b9c8b.appspot.com",
    messagingSenderId: "454422855574",
    appId: "1:454422855574:web:9f59ffe4bcc065c385a7b7"
}

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

export { projectFirestore }