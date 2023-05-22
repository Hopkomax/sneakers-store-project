import refs from "./refs";
const {priceEl, totalAmountElementInCart, taxElementInCart} = refs;

export function calculateTotalPrice() {
  const productsInCart = JSON.parse(localStorage.getItem('inCart')) || [];
  const totalPrice = productsInCart.reduce((total, { price }) => (total += price), 0);
  return totalPrice;
}

export function setActualPriceIntoHeader() {
  // const priceEl = document.querySelector('.heder__user__icon__cart span');
  let price = priceEl.textContent.split('\n')[0];
  price = calculateTotalPrice() + ' ' + 'грн';
  priceEl.textContent = price;
}

export function setActualPriceIntoCart() {
  const priceElement = document.querySelector('.sneaker__inCart__totalAmount').lastElementChild;
  // const priceElement = totalAmountElementInCart.lastElementChild;
  priceElement.textContent = calculateTotalPrice() + ' ' + 'грн';
   const taxElement = document.querySelector('.sneaker__inCart__taxes').lastElementChild;
 // const taxElement = taxElementInCart.lastElementChild;
  taxElement.textContent = ((calculateTotalPrice() * 5) / 100 ).toFixed(2) + ' ' + 'грн';
}
