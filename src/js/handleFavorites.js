import { getSneakerById } from '../api/api';
import { db } from '../firebase';
import 'firebase/compat/firestore';

export async function handleFavorites(event) {
  const heart = event.target;

  if (heart.classList.contains('sneaker__heart__button')) {
    const sneaker = heart.closest('li');
    const selectedSneaker = (await getSneakerById(sneaker.id)) || {};
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (heart.classList.contains('active')) {
      const updatedFavorites = favorites.filter(({ id }) => id !== sneaker.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
    favorites.push(selectedSneaker);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // add sneakers to FIREBASE
     await db.firestore().collection("favorites").add({...selectedSneaker, userId: db.auth().currentUser.uid});
  }
}

export function setFavoritesOnload() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  for (const { id } of favorites) {
    const item = document.getElementById(id);
    if (!item) {
      continue;
    }

    const heartButton = item.querySelector('.sneaker__heart__button');

    heartButton.classList.add('active');
  }
}
