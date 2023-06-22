export default function createMakeOrderMarkup() {

  // const inCartItems = localStorage.getItem('inCart');
  // let purchasesItems = localStorage.getItem('purchases');

  // if (!purchasesItems) {
  //   purchasesItems = []; // Initialize as an empty array if purchasesItems is null or empty
  // } else {
  //   purchasesItems = JSON.parse(purchasesItems); // Parse the stringified array
  // }

  // if (inCartItems) {
  //   const combinedItems = purchasesItems.concat(JSON.parse(inCartItems));
  //   localStorage.setItem('purchases', JSON.stringify(combinedItems));
  // }

  // localStorage.removeItem('inCart');
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
