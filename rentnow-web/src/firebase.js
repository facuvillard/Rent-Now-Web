import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBzyvTgVKA8KX-pT_wu7TBBUrp6BfM8bNs",
    authDomain: "rent-now-13046.firebaseapp.com",
    databaseURL: "https://rent-now-13046.firebaseio.com",
    projectId: "rent-now-13046",
    storageBucket: "rent-now-13046.appspot.com",
    messagingSenderId: "501335176849",
    appId: "1:501335176849:web:65e444d485b036b8c83130",
    measurementId: "G-625S2953FV"
})

export default firebaseApp;