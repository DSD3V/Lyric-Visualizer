// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBYc3raok0MfSV_ZKmsa_KORZwZrTRj1xk',
  authDomain: 'lyric-visualizer.firebaseapp.com',
  projectId: 'lyric-visualizer',
  storageBucket: 'lyric-visualizer.appspot.com',
  messagingSenderId: '589994476209',
  appId: '1:589994476209:web:b496f7c978d46b48dad890',
  measurementId: 'G-SZC75LBJF7'
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()

let user = ''
auth.onAuthStateChanged((_user) => {
  user = _user
})

export const getProfile = () => {
  return { user }
}
