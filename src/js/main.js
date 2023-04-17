import sneakers from '../db/sneakers';
import createSneakersMarkup from './createSneakersMarkup';
import { getSneakers } from '../api/api';
import { setInCartOnload } from './handleCart';
import { setFavoritesOnload, handleFavorites } from './handleFavorites';

const list = document.querySelector('.sneakersList__list');
getSneakers().then(data => {
  list.insertAdjacentHTML('afterbegin', createSneakersMarkup(data));
  setInCartOnload();
  setFavoritesOnload();
});
document.querySelector('.sneakersList__list').addEventListener('click', handleFavorites);

//list.insertAdjacentHTML('afterbegin', createSneakersMarkup(sneakers));
