


export default function createPurchasesMarkup() {
    document.querySelector('.purchasesList').innerHTML=`
    <div class="purchasesList__container">
    <div class="purchases__container__top__blok">
    <h2 class="purchasesList__title">Purchases</h2>
    <ul class="purchasesList__list"></ul>
</div>
    <div class="purchases__container__bottom__blok">
      <div class="sneaker__inpurchases__totalAmount">
        <p>Total</p>
        <span></span>
        <p>UAH</p>
      </div>
      <div class="sneaker__inpurchases__taxes">
        <p>VAT 5%</p>
        <span></span>
        <p>UAH</p>
      </div>
      <div class="purchases__container__button__blok">
        <button class="purchases__container__button">Make order</button>
      </div>
    </div>
  </div>`;
}