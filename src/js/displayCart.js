import createSneakersMarkupInCart from './createSneakersMarkupInCart';
import { setActualPriceIntoCart, setActualPriceIntoHeader } from './calculateTotalPrice';
import { setInCartOnload } from './handleCart';
import createCartMarkup from './createCartMarkup';
import createEmptyContent from './createEmptyContent';
import { makeOrder } from './makeOrder';

let list = null;
const backdrop = document.querySelector('#modal-backdrop');
const modalCart = document.querySelector('.cartList');

document.addEventListener('click', modalHandler);

function modalHandler(evt) {
  const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
  const modalBtnOpen = evt.target.closest('.heder__user__icon__cart');

  if (modalBtnOpen) {
    createCartMarkup();

    list = document.querySelector('.cartList__list');
  
    // open btn click
    showModal(modalCart);
    setActualPriceIntoCart();

    if (inCart.length === 0) {
      document.querySelector('.cartList__container').innerHTML = createEmptyContent();
     // list.insertAdjacentHTML('afterbegin', createEmptyContent());
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

function showModal(modalElem) {
  modalElem.classList.add('active');
  backdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function hideModal(modalElem) {
  modalElem.classList.remove('active');
  backdrop.classList.add('hidden');
  document.body.style.overflow = 'visible';
}
