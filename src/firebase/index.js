import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import "firebase/compat/firestor";

const firebaseConfig = {
  apiKey: "AIzaSyDQeNp4zopAC3EU3l8ZaWzfhNek_E8z078",
  authDomain: "sneakers-store-project.firebaseapp.com",
  projectId: "sneakers-store-project",
  storageBucket: "sneakers-store-project.appspot.com",
  messagingSenderId: "136640583583",
  appId: "1:136640583583:web:c3286904d98a7edf99cfaa",
  measurementId: "G-M359FBS8GK"
};

const db = firebase.initializeApp(firebaseConfig);

export function createUser({email, password, name}){
  console.log(db);

    db.auth().createUserWithEmailAndPassword(email, password, name)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential.user);
    // ...

    //userName
    const user = userCredential.user;
      
    const firestore = db.firestore();
    const usersCollection = firestore.collection("users");
    
    // Створення об'єкта користувача з іменем
    const userObject = {
      name: name,
      email: email,
    };
    
    // Збереження об'єкта користувача в Firestore
    usersCollection
      .doc(user.uid)
      .set(userObject)
      .then(() => {
        console.log("Користувач успішно створений та збережений в Firestore");
      })
      .catch((error) => {
        console.log("Помилка при збереженні користувача в Firestore", error);
      });
          //userName

  })
  
  
  .catch((error) => {
    console.log(error.message);
    // ..
  });
}
export function signIn({email, password}) {
  db.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential.user);
    // ...
     })
  // firebase.auth().signInWithEmailAndPassword(email, password)
  // .then((userCredential) => {
  //   // Signed in
  //   var user = userCredential.user;
  //   // ...
  // })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

export function authState () {
  db.auth().onAuthStateChanged((user) => {
  if (user) {
    // Користувач авторизований
    console.log('Користувач авторизований:', user);
  } else {
    // Користувач неавторизований
    console.log('Користувач неавторизований');
  }
});
}