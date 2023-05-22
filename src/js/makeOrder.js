export function makeOrder() {
  localStorage.removeItem('inCart');
  document.querySelector('.cartList__container').innerHTML = `
    <div class="emptyContentOrder__wrapper" >
    <div class="emptyContentOrder__img"></div>
    <h3 class="emptyContentOrder__title">Order is processed!</h3>
    <p class="emptyContentOrder__text">Your order will be delivered to courier soon</p>
    <div class='emptyContentOrder__container__button'>
    <a href="index.html" class="emptyContentOrder__button">Return</a>
    </div>
    </div>`;
}
// emptyContentFavorites__button