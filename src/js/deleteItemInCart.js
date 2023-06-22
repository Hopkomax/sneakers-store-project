import createEmptyCart from "./createMarkupFunctions/createEmptyCart";
import {setActualPriceIntoCart} from './calculateTotalPrice'
import { db } from '../firebase';
import 'firebase/compat/firestore';

export async function handleDelete(event) {
  if (
    event.target.classList.contains('sneaker__inCart__button') ||
    event.target.classList.contains('sneaker__inCart__button-span')
  ) {
    // const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
    const sneakerItem = event.target.closest('li');
    const sneakerId = sneakerItem.id;
        // const sneaekers = inCart.filter(item => item.id !== sneakerItem.id);
    //const selectedSneaker = (await getSneakerById(sneakerItem)) || {};

    // db.firestore().collection('cart').where('userId', '==', db.auth().currentUser.uid).doc(sneakerId).delete()
    // .then(() => {
    //   console.log('Кросівку успішно видалено з бази даних');
    // })
    // .catch((error) => {
    //   console.log('Помилка при видаленні кросівки з бази даних:', error);
    // });

    const docId = await db.firestore().collection('cart').get();
    docId.forEach(async item => {
      const currentSneaker = item.data();
      if (currentSneaker.id === sneakerId) {
        await db.firestore().collection('cart').doc(item.id).delete();
              console.log('Кросівку успішно видалено з бази даних');

      }
    });
    // sneakerItem.remove();
    // localStorage.setItem('inCart', JSON.stringify(sneaekers));
    setActualPriceIntoCart();
    // const inCartAfterUpdate = JSON.parse(localStorage.getItem('inCart')) || [];

    // if(inCartAfterUpdate.length === 0 ){
    //   document.querySelector('.cartList__container').innerHTML = createEmptyCart();
    // }
  }
}