import { setActualPriceIntoHeader } from './calculateTotalPrice';
import {getSneakerById} from '../api/api';

export async function handleCart(event) {
  const cart = event.target;

  if (cart.classList.contains('sneaker__add__button')) {
    const sneakerId = cart.parentNode.parentNode.id;
    const selectedSneaker = await getSneakerById(sneakerId) || {};
    const inCart = JSON.parse(localStorage.getItem('inCart')) || [];

    if (cart.classList.contains('active')) {
      const updatedCart = inCart.filter(({ id }) => id !== sneakerId);
      localStorage.setItem('inCart', JSON.stringify(updatedCart));
      cart.classList.remove('active');
      setActualPriceIntoHeader();
      return;
    }
    cart.classList.add('active');
    inCart.push(selectedSneaker);
    localStorage.setItem('inCart', JSON.stringify(inCart));
    setActualPriceIntoHeader();
  }
}

export function setInCartOnload() {
  const inCart = JSON.parse(localStorage.getItem('inCart')) || [];

  document
    .querySelectorAll('.sneaker__add__button.active')
    .forEach(item => item.classList.remove('active'));

  for (const { id } of inCart) {
    const item = document.getElementById(id);

    if (!item) {
      continue;
    }
    // Якщо item === null (getElementById(id) не знайшов такого елементу на сторінці), то ми пропустимо ту ітерацію, і йти до наступної (continue пропускає ітерацію)
    const cartButton = item.querySelector('.sneaker__add__button');
    cartButton.classList.add('active');
  }
}
