import createSneakersMarkup from './createMarkupFunctions/createSneakersMarkup';
import { themeSwitch, setThemeOnLoad } from './themeSwitch';
import { modalHandler } from './displayCart';
import { setActualPriceIntoHeader } from './calculateTotalPrice';
import createPurchasesMarkup from './createMarkupFunctions/createPurchasesMarkup';
import createSneakersMarkupInCart from './createMarkupFunctions/createSneakersMarkupInCart';
import { createEmptyPurchases } from './createMarkupFunctions/createEmptyPurchases';
const list = document.querySelector('.purchasesList__list');

setThemeOnLoad();
setActualPriceIntoHeader();

document.querySelector('.theme__switch').addEventListener('change', themeSwitch);

const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
if(purchases.length === 0){
  emptyPurchases();
} else{
list.insertAdjacentHTML('afterbegin', createPurchasesMarkup(purchases));
}
function emptyPurchases() {
  const purchasesList = document.querySelector('.purchasesList__list');
  purchasesList.innerHTML = createEmptyPurchases();
}
