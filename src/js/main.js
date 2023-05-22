import sneakers from '../db/sneakers';
import createSneakersMarkup from './createSneakersMarkup';
import { getSneakers } from '../api/api';
import { setInCartOnload, handleCart } from './handleCart';
import { setFavoritesOnload, handleFavorites } from './handleFavorites';
import { setActualPriceIntoHeader } from './calculateTotalPrice';
import createSkeletonMarkup from './createSkeletonMarkup';
import { setThemeOnLoad, themeSwitch } from './themeSwitch';

const list = document.querySelector('.sneakersList__list');

createSkeletonMarkup();
setTimeout(() => {
  // getSneakers().then(data => {
  //   list.innerHTML = '';
  //   list.insertAdjacentHTML('afterbegin', createSneakersMarkup(data));
  //   setInCartOnload();
  //   setFavoritesOnload();
  // });
  list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', createSneakersMarkup(sneakers));
    setInCartOnload();
    setFavoritesOnload();
}, 2000);

document.querySelector('.sneakersList__list').addEventListener('click', handleFavorites);
document.querySelector('.sneakersList__list').addEventListener('click', handleCart);
document.querySelector('.theme__switch').addEventListener('change', themeSwitch);

setActualPriceIntoHeader();
setThemeOnLoad();

