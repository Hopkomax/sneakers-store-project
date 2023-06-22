import { setActualPriceIntoHeader } from './calculateTotalPrice';
import { getSneakerById } from '../api/api';
import { db } from '../firebase';
import 'firebase/compat/firestore';
import Swal from 'sweetalert2';

export async function handleCart(event) {
  const cart = event.target;
  console.log(cart);
  if (cart.classList.contains('sneaker__add__button')) {
    const sneakerId = cart.parentNode.parentNode.id;
    const selectedSneaker = (await getSneakerById(sneakerId)) || {};
    // const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
    //console.log(inCart);
    if (cart.classList.contains('active')) {
      console.log('ssssssssssss');
      console.log('cart.classList', cart.classList);
      // const updatedCart = inCart.filter(({ id }) => id !== sneakerId);
      // console.log(updatedCart);
      //localStorage.setItem('inCart', JSON.stringify(updatedCart));
      cart.classList.remove('active');
      console.log(cart);
      // work with FIREBASE
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
        Swal.fire('Please log in');

      }
    });
    //inCart.push(selectedSneaker);
    //localStorage.setItem('inCart', JSON.stringify(inCart));
    // add sneakers to FIREBASE
    // await db
    //   .firestore()
    //   .collection('cart')
    //   .add({ ...selectedSneaker, userId: db.auth().currentUser.uid });

    // setActualPriceIntoHeader();
  }
}

export function setInCartOnload() {
  // const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
  const currentUser = db.auth().currentUser;
  if(!currentUser) return;
  db.firestore()
    .collection('cart')
    .where('userId', '==', currentUser.uid)
    .onSnapshot(
      snapshot => {
        const inCart = snapshot.docs.map(doc => doc.data()) || [];
        document
          .querySelectorAll('.sneaker__add__button.active')
          .forEach(item => item.classList.remove('active'));

        for (const { id } of inCart) {
          const item = document.getElementById(id);
          if (!item) {
            continue;
          }
          console.log('ITEM:   ', item);
          // Якщо item === null (getElementById(id) не знайшов такого елементу на сторінці), то ми пропустимо ту ітерацію, і йти до наступної (continue пропускає ітерацію)
          const cartButton = item.querySelector('.sneaker__add__button');
          if(!cartButton) return;
          cartButton.classList.add('active');
        }
      },
      error => {
        console.log('Помилка отримання даних:', error);
      },
    );
}
