import { handleDelete } from '../deleteItemInCart';
import createMakeOrderMarkup from './createMakeOrderMarkup';

export default function createCartMarkup() {
  document.querySelector('.cartList').innerHTML = `
  <div class="cartList__container">
    <div class="cart__container__top__blok">
    <h2 class="cartList__title">Cart</h2>
    <ul class="cartList__list"></ul>
</div>
    <div class="cart__container__bottom__blok">
      <div class="sneaker__inCart__totalAmount">
        <p>Total</p>
        <span></span>
        <p>UAH</p>
      </div>
      <div class="sneaker__inCart__taxes">
        <p>VAT 5%</p>
        <span></span>
        <p>UAH</p>
      </div>
      <div class="cart__container__button__blok">
        <button class="cart__container__button">Make order</button>
      </div>
    </div>
  </div>`;
  
  const cartList = document.querySelector('.cartList__list');
  const makeOrderButton = document.querySelector('.cart__container__button');

  cartList.addEventListener('click', handleDelete);
  makeOrderButton.addEventListener('click', createMakeOrderMarkup);
}
