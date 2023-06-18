import { db } from '../firebase';
import 'firebase/compat/firestore';

export async function calculateTotalPrice() {
  try {
    const snapshot = await db
      .firestore()
      .collection('cart')
      .where('userId', '==', db.auth().currentUser.uid)
      .get();

    const inCart = snapshot.docs.map((doc) => doc.data());
    const totalPrice = inCart.reduce((total, { price }) => (total += price), 0);

    return totalPrice;
  } catch (error) {
    console.log('Помилка отримання даних:', error);
    return 0;
  }
}

export async function setActualPriceIntoHeader() {
  const priceEl = document.querySelector('.header__user__icon__cart span');
  let price = priceEl.textContent.split('\n')[0];
  price = await calculateTotalPrice() + ' ' + 'UAH';
  priceEl.textContent = price;
}

export async function setActualPriceIntoCart() {
  const priceElement = document.querySelector('.sneaker__inCart__totalAmount').lastElementChild;
  const taxElement = document.querySelector('.sneaker__inCart__taxes').lastElementChild;
  const totalPrice = await calculateTotalPrice();
  const tax = ((totalPrice * 5) / 100).toFixed(2);
  priceElement.textContent = totalPrice + ' ' + 'UAH';
  taxElement.textContent = parseFloat(tax) + ' ' + 'UAH';
}
