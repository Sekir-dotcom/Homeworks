import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCb_rDP7z-IGFswII7D87rQCa7FyIpw9gw',
  authDomain: 'parcial2-9bd98.firebaseapp.com',
  projectId: 'parcial2-9bd98',
  storageBucket: 'parcial2-9bd98.firebasestorage.app',
  messagingSenderId: '386286491039',
  appId: '1:386286491039:web:57535f0db2b8d8ba8c59aa',
  measurementId: 'G-6HV08T4261',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
