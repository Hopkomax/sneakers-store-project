import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: 'AIzaSyDQeNp4zopAC3EU3l8ZaWzfhNek_E8z078',
  authDomain: 'sneakers-store-project.firebaseapp.com',
  projectId: 'sneakers-store-project',
  storageBucket: 'sneakers-store-project.appspot.com',
  messagingSenderId: '136640583583',
  appId: '1:136640583583:web:c3286904d98a7edf99cfaa',
  measurementId: 'G-M359FBS8GK',
};
const btnLogOut = document.querySelector('.btn__log__out');

export const db = firebase.initializeApp(firebaseConfig);
const userName = document.querySelector('.header__user__user__name');
const headerGroup = document.querySelector('.header__user__icons__group');


export async function createUser({ email, password, name }) {
  await db.auth().createUserWithEmailAndPassword(email, password);
  const user = await db.auth().currentUser;
  console.log('createUser');
  await user.updateProfile({
    displayName: name,
  });
}

export async function signIn({ email, password }) {
  try {
    await db.auth().signInWithEmailAndPassword(email, password);
    console.log('Sign in');
  } catch (error) {
    console.log(error.message);
  }
  // btnLogOut.classList.remove('hidden');

}

export async function signOut () {
await db.auth().signOut()
console.log('Sign out');
// btnLogOut.classList.add('hidden');


  await db.auth().onAuthStateChanged((user) => {
  if (!user){
 
    const productsSneakersList = document.querySelector('.sneakersList__list');
    productsSneakersList.querySelectorAll('.active').forEach(item => {
      item.classList.remove('active')
    });

    headerGroup.classList.remove('visible');

  }
});
}



// export async function checkCurrentUser() {
//   await db.auth().onAuthStateChanged((user) => {
//   if (user){
//     setInCartOnload();
//     setFavoritesOnload();
//     console.log(' USER =>', user);
//     userName.textContent = user.displayName;

//     console.log(user.displayName);
//   }
// });
// }