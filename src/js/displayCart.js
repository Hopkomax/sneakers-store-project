import createSneakersMarkupInCart from './createMarkupFunctions/createSneakersMarkupInCart';
import { setActualPriceIntoCart, setActualPriceIntoHeader } from './calculateTotalPrice';
import { setInCartOnload } from './handleCart';
import createCartMarkup from './createMarkupFunctions/createCartMarkup';
import createEmptyCart from './createMarkupFunctions/createEmptyCart';

let list = null;
const backdrop = document.querySelector('#modal-backdrop');
const modalCart = document.querySelector('.cartList');

document.addEventListener('click', modalHandler);

export function modalHandler(evt) {
  const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
  const modalBtnOpen = evt.target.closest('.header__user__icon__cart');

  if (modalBtnOpen) {
    createCartMarkup();

    list = document.querySelector('.cartList__list');
  
    // open btn click
    showModal(modalCart);
    setActualPriceIntoCart();

    if (inCart.length === 0) {
      const cart = document.querySelector('.cartList__container');
      cart.innerHTML = createEmptyCart();
    } else {
      list.innerHTML = createSneakersMarkupInCart(inCart);
    }
  }

  if (evt.target.matches('#modal-backdrop')) {
    list.innerHTML = '';
    hideModal(modalCart);
    setActualPriceIntoHeader();
    setInCartOnload();
  }
}

export function showModal(modalElem) {
  modalElem.classList.add('active');
  backdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

export function hideModal(modalElem) {
  modalElem.classList.remove('active');
  backdrop.classList.add('hidden');
  document.body.style.overflow = 'visible';
}
