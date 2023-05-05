import sneakers from '../db/sneakers';
import createSneakersMarkup from './createSneakersMarkup';
import { getSneakers } from '../api/api';
import { setInCartOnload, handleCart } from './handleCart';
import { setFavoritesOnload, handleFavorites } from './handleFavorites';
import {setActualPriceIntoHeader} from './calculateTotalPrice';

const list = document.querySelector('.sneakersList__list');
getSneakers().then(data => {
  list.insertAdjacentHTML('afterbegin', createSneakersMarkup(data));
  setInCartOnload();
  setFavoritesOnload();
});
document.querySelector('.sneakersList__list').addEventListener('click', handleFavorites);
document.querySelector('.sneakersList__list').addEventListener('click', handleCart);

setActualPriceIntoHeader();
