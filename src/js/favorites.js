import createSneakersMarkup from './createMarkupFunctions/createSneakersMarkup';
import { setFavoritesOnload } from './handleFavorites';
import { createEmptyFavorites } from './createMarkupFunctions/createEmptyFavorites';
import { setActualPriceIntoHeader } from './calculateTotalPrice';
import { setInCartOnload } from './handleCart';
import { getSneakerById } from '../api/api';
import { themeSwitch, setThemeOnLoad } from './themeSwitch';
import { modalHandler } from './displayCart';
import './mobileMenu';
import { openModal } from './handleAuthForm';
import { db, signOut } from '../firebase';
import 'firebase/compat/firestore';
import { handleCart } from './handleCart';

const headerGroup = document.querySelector('.header__user__icons__group');
const btnLogOut = document.querySelector('.btn__log__out');

 db.auth().onAuthStateChanged((user) => {
  if ( user){
    console.log(' USER =>', user);

    // await Promise.all([setInCartOnload(), setFavoritesOnload()]);
    console.log('promise');
    setTimeout(() => {
      setInCartOnload();
      setFavoritesOnload();

    }, 2000);
    setActualPriceIntoHeader();

    console.log(' USER =>', user);
    document.querySelector('.header__user__user__name').textContent = user.displayName;
    headerGroup.classList.add('visible');
    btnLogOut.classList.add('visible');

    console.log(user.displayName);
  } else {
    headerGroup.classList.remove('visible');
    btnLogOut.classList.remove('visible');

  }
});
setThemeOnLoad();
document.querySelector('.theme__switch').addEventListener('change', themeSwitch);
document.addEventListener('click', modalHandler);
// document.querySelector('.btn__log__out').addEventListener('click', signOut);
btnLogOut.addEventListener('click', () => {
  signOut().then(() => {
    // Виконується після виходу з облікового запису
    db.auth().onAuthStateChanged((user) => {
      if (!user) {
        // Перенаправлення на головну сторінку після виходу
        window.location.href = 'index.html'; // Замініть 'index.html' на URL вашої головної сторінки
      }
    });
  });
});
const userButton = document.querySelector('.header__user__icon__user');
userButton.addEventListener('click', openModal);

const list = document.querySelector('.favoritesList__list');
list.addEventListener('click', handleFavorites);
list.addEventListener('click', handleCart);

// const headerGroup = document.querySelector('.header__user__icons__group');
// const currentUser = db.auth().currentUser;
// console.log(currentUser);
// if (currentUser) {
//   document.querySelector('.header__user__user__name').textContent = currentUser.displayName;
//   headerGroup.classList.add('visible');
// } else {
//   headerGroup.classList.remove('visible');
// }

// const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// const favorites = await db.firestore().collection('favorites').get() || [];
function handleAuthStateChanged(user) {
  if (user) {
    console.log('USER =>', user);
console.log('db.auth().currentUser.uid', db.auth().currentUser.uid);
unsubscribe = db
  .firestore()
  .collection('favorites')
  .where('userId', '==', db.auth().currentUser.uid)
  .onSnapshot(
    snapshot => {
      const favorites = snapshot.docs.map(doc => doc.data()) || [];
      console.log(favorites);
      if (favorites.length === 0) {
        emptyFavorites();
      } else {
        list.insertAdjacentHTML('afterbegin', createSneakersMarkup(favorites));
        setFavoritesOnload();
        setInCartOnload();
      }
    },
    error => {
      console.log('Помилка отримання даних:', error);
    },
  );
}
}
db.auth().onAuthStateChanged(handleAuthStateChanged);

// if (favorites.length === 0) {
//   emptyFavorites();

// } else {
//   list.insertAdjacentHTML('afterbegin', createSneakersMarkup(favorites));
//   setFavoritesOnload();
//   setInCartOnload();
// }

setActualPriceIntoHeader();

function emptyFavorites() {
  const favoritesList = document.querySelector('.favoritesList__list');
  favoritesList.innerHTML = createEmptyFavorites();
}

async function handleFavorites(event) {
  const heart = event.target;

  if (heart.classList.contains('sneaker__heart__button')) {
    const sneaker = heart.closest('li');
    // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (heart.classList.contains('active')) {
      // const updatedFavorites = favorites.filter(({ id }) => id !== sneaker.id);
      // localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      const selectedSneaker = (await getSneakerById(sneaker.id)) || {};

      heart.classList.remove('active');
      const docId = await db.firestore().collection('favorites').get();
      docId.forEach(async item => {
        const currentSneaker = item.data();
        if (currentSneaker.id === sneaker.id) {
          await db.firestore().collection('favorites').doc(item.id).delete();
        }
      });
      sneaker.remove();
      list.innerHTML = ''; 
    }
  }
  // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  // console.log(db.firestore().collection('favorites').empty);
  db.firestore().collection('favorites')
  .get()
  .then((querySnapshot) => {
    if (querySnapshot.empty) {
      console.log('Колекція порожня');
      emptyFavorites();
    } else {
      console.log('Колекція не порожня');
    }
  })
  .catch((error) => {
    console.log('Помилка при отриманні даних з колекції:', error);
  });
  // if (favorites.length === 0) {
  //   emptyFavorites();
  // }
}
// const cart = event.target;
// handleCart();
async function handleCart(event) {
  const cart = event.target;

  if (cart.classList.contains('sneaker__add__button')) {
    const sneakerId = cart.parentNode.parentNode.id;
    const selectedSneaker = (await getSneakerById(sneakerId)) || {};
    // const inCart = JSON.parse(localStorage.getItem('inCart')) || [];

    if (cart.classList.contains('active')) {
      // const updatedCart = inCart.filter(({ id }) => id !== sneakerId);
      // localStorage.setItem('inCart', JSON.stringify(updatedCart));
      cart.classList.remove('active');
      const docId = await db.firestore().collection('cart').get();
      docId.forEach(async item => {
        const currentSneaker = item.data();
        if (currentSneaker.id === selectedSneaker.id) {
          await db.firestore().collection('cart').doc(item.id).delete();
        }
      });
      setActualPriceIntoHeader();
      return;
    }
    await db.auth().onAuthStateChanged(async user => {
      if (user) {
        cart.classList.add('active');
        await db
          .firestore()
          .collection('cart')
          .add({ ...selectedSneaker, userId: db.auth().currentUser.uid });

        setActualPriceIntoHeader();
      } else {
        console.log('щоб додати у корзину - зареєструйся');
      }
    });
  }
}
