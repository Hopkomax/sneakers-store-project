export default function createCartMarkup() {
  document.querySelector('.cartList').innerHTML = `
  <div class="cartList__container">
    <div class="cart__container__top__blok">
    <h2 class="cartList__title">Корзина</h2>
    <ul class="cartList__list"></ul>
</div>
    <div class="cart__container__bottom__blok">
      <div class="sneaker__inCart__totalAmount">
        <p>Разом</p>
        <span></span>
        <p>Грн</p>
      </div>
      <div class="sneaker__inCart__taxes">
        <p>ПДВ 5%</p>
        <span></span>
        <p>Грн</p>
      </div>
      <div class="cart__container__button__blok">
        <button class="cart__container__button">Оформити замовлення</button>
      </div>
    </div>
  </div>`;
}
