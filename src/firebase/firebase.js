import firebase from "firebase";

var config = {
  apiKey: "AIzaSyChLA9qGA5TKRnkpq90k-vF7D7wzAOy2js",
  authDomain: "tapnotes-feecf.firebaseapp.com",
  databaseURL: "https://tapnotes-feecf.firebaseio.com",
  projectId: "tapnotes-feecf",
  storageBucket: "tapnotes-feecf.appspot.com",
  messagingSenderId: "992697131894",
  appId: "1:992697131894:web:6397dcd106930764e51057",
  measurementId: "G-FNFJZV8M0G",
};

firebase.initializeApp(config);

export const addToDB = (note) => {
    const NoteRef = firebase.database().ref('notes/' + localStorage.getItem('LOCAL_UID')).push({
        title: note.title,
        timestamp: note.timestamp,
        content : note.content
    });
    return NoteRef.key;
}  

// export const addToDB = (note) => {
//    const NoteRef = firebase.database().ref('notes/').push({
//        title: note.title,
//        timestamp: note.timestamp,
//        content : note.content
//    });
//    return NoteRef.key;
// }
 
export const removeFromDB = (noteKey) => {
    firebase.database().ref('notes/' + localStorage.getItem('LOCAL_UID') + '/' + noteKey).remove();
}

// export const removeFromDB = (noteKey) => {
//    firebase.database().ref('notes/' + noteKey).remove();
// }
 
export const fetchFromDB = () => {
    return new Promise((resolve, reject) => {
        firebase.database().ref('notes/' + localStorage.getItem('LOCAL_UID')).once('value').then( function(snapshot) {
          if(snapshot.val()) {
            var notes = [];
            Object.keys(snapshot.val()).forEach(key => {
              var note = {};
              note = {...snapshot.val()[key]};
              note['key'] = key;
              notes.push(note);
            });
            resolve(notes);
          }
          else {
            resolve([]);
          }
        });
    })
}

// export const fetchFromDB = () => {
//     return new Promise((resolve, reject) => {
//        firebase.database().ref('notes/').once('value').then( function(snapshot) {
//           if(snapshot.val()) {
//             var notes = [];
//             Object.keys(snapshot.val()).forEach(key => {
//               var note = {};
//               note = {...snapshot.val()[key]};
//               note['key'] = key;
//               notes.push(note);
//             });
//             resolve(notes);
//           }
//           else {
//             resolve([]);
//           }
//         });
//     })
//   }

var provider = new firebase.auth.GoogleAuthProvider();
 
export const logIn = () => {
 return new Promise((resolve, reject) => {
   firebase.auth().signInWithPopup(provider).then(function(result) {
     var token = result.credential.accessToken;
     var user = result.user;
     resolve({
        token: token,
        user: user,
     });
   });
 });
}

export const logOut = () => {
 firebase.auth().signOut().then( () => {
   console.log('Successfully Logged Out');
 });
}

export default firebase;
