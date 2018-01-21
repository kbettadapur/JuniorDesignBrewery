import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBiAwA5G6xihHVUTv0XV5D2GPQYrKmsgdc",
    authDomain: "brewerytracker.firebaseapp.com",
    databaseURL: "https://brewerytracker.firebaseio.com",
    projectId: "brewerytracker",
    storageBucket: "brewerytracker.appspot.com",
    messagingSenderId: "624606500424"
  };

export default firebaseApp = firebase.initializeApp(config);