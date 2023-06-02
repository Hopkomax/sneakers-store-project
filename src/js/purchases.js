import createSneakersMarkup from "./createMarkupFunctions/createSneakersMarkup";
import { themeSwitch, setThemeOnLoad } from './themeSwitch';
import { modalHandler } from './displayCart';
import { setActualPriceIntoHeader } from './calculateTotalPrice';

const list = document.querySelector('.purchasesList__list');

setThemeOnLoad();
setActualPriceIntoHeader();

document.querySelector('.theme__switch').addEventListener('change', themeSwitch);

// export default function displayPurchases(){
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];

  list.insertAdjacentHTML('afterbegin', createSneakersMarkup(purchases));
console.log(purchases);
// }