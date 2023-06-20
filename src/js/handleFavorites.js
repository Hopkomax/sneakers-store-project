import { getSneakerById } from '../api/api';
import { db } from '../firebase';
import 'firebase/compat/firestore';
import Swal from 'sweetalert2';

export async function handleFavorites(event) {
  const heart = event.target;
  // console.log('heart', heart);
  if (heart.classList.contains('sneaker__heart__button')) {
    console.log('heart', heart);
    await db.auth().onAuthStateChanged(async user => {
      if (user) {
        const sneaker = heart.closest('li');
        const selectedSneaker = (await getSneakerById(sneaker.id)) || {};
        // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (heart.classList.contains('active')) {
          // const updatedFavorites = favorites.filter(({ id }) => id !== sneaker.id);
          // localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          heart.classList.remove('active');

          // work with FIREBASE
          const docId = await db.firestore().collection('favorites').get();
          docId.forEach(async item => {
            const currentSneaker = item.data();
            if (currentSneaker.id === selectedSneaker.id) {
              await db.firestore().collection('favorites').doc(item.id).delete();
            }
          });

          return;
        }
        heart.classList.add('active');
        // favorites.push(selectedSneaker);
        // localStorage.setItem('favorites', JSON.stringify(favorites));
        // add sneakers to FIREBASE
        await db
          .firestore()
          .collection('favorites')
          .add({ ...selectedSneaker, userId: db.auth().currentUser.uid });
      } else {
        console.log('зареєструйся');
        Swal.fire('Please log in');
      }
    });
  }
}

export function setFavoritesOnload() {
  const currentUser = db.auth().currentUser;
  if (!currentUser) return;
     
  db.firestore()
    .collection('favorites')
    .where('userId', '==', currentUser.uid)
    .onSnapshot(
      snapshot => {
        const favorites = snapshot.docs.map(doc => doc.data()) || [];
        document
          .querySelectorAll('.sneaker__heart__button.active')
          .forEach(item => item.classList.remove('active'));

        for (const { id } of favorites) {
          const item = document.getElementById(id);
          if (!item) {
            continue;
          }

          const heartButton = item.querySelector('.sneaker__heart__button');

          heartButton.classList.add('active');
        }
      },
      error => {
        console.log('Помилка отримання даних:', error);
      },
    );
}
