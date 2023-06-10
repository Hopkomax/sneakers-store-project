export function calculateTotalPrice() {
  const productsInCart = JSON.parse(localStorage.getItem('inCart')) || [];
  const totalPrice = productsInCart.reduce((total, { price }) => (total += price), 0);
  return totalPrice;
}

export function setActualPriceIntoHeader() {
  const priceEl = document.querySelector('.header__user__icon__cart span');
  let price = priceEl.textContent.split('\n')[0];
  price = calculateTotalPrice() + ' ' + 'UAH';
  priceEl.textContent = price;
}

export function setActualPriceIntoCart() {
  const priceElement = document.querySelector('.sneaker__inCart__totalAmount').lastElementChild;
  priceElement.textContent = calculateTotalPrice() + ' ' + 'UAH';
  const taxElement = document.querySelector('.sneaker__inCart__taxes').lastElementChild;
  taxElement.textContent = ((calculateTotalPrice() * 5) / 100).toFixed(2) + ' ' + 'UAH';
}