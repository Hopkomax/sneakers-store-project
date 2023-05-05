import createSneakersMarkupInCart from './createSneakersMarkupInCart';
import { setActualPriceIntoCart, setActualPriceIntoHeader } from './calculateTotalPrice';
import { setInCartOnload } from './handleCart';
import createCartMarkup from './createCartMarkup';
createCartMarkup();

const backdrop = document.querySelector('#modal-backdrop');
document.addEventListener('click', modalHandler);

const cartButton = document.querySelector('.heder__user__icon__cart');
const list = document.querySelector('.cartList__list');
const modalCart = document.querySelector('.cartList');

function modalHandler(evt) {
  const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
  const modalBtnOpen = evt.target.closest('.heder__user__icon__cart');
  if (modalBtnOpen) {
    createCartMarkup();

    // open btn click
    showModal(modalCart);
    setActualPriceIntoCart();
  
    if (inCart.length === 0) {
      const img = document.createElement('img');
      img.src =
        'https://cdn.dribbble.com/users/1639273/screenshots/4897055/media/b23d4908df82e11bfe4e11072c41a7bb.png?compress=1&resize=400x300';
      img.classList.add('img');
      list.prepend(img);
    } else {
      list.insertAdjacentHTML('afterbegin', createSneakersMarkupInCart(inCart));

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
