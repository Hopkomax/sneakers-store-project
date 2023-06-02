import createSneakersMarkup from './createMarkupFunctions/createSneakersMarkup';
import { setFavoritesOnload } from './handleFavorites';
import { createEmptyFavorites } from './createMarkupFunctions/createEmptyFavorites';
import { setActualPriceIntoHeader } from './calculateTotalPrice';
import { setInCartOnload } from './handleCart';
import {getSneakerById} from '../api/api';

import { setActualPriceIntoHeader } from './calculateTotalPrice';
import { setInCartOnload } from './handleCart';
import { themeSwitch, setThemeOnLoad } from './themeSwitch';
import { modalHandler } from './displayCart';
import './mobileMenu';

setThemeOnLoad();

document.querySelector('.theme__switch').addEventListener('change', themeSwitch);
document.addEventListener('click', modalHandler);

const list = document.querySelector('.favoritesList__list');
list.addEventListener('click', handleFavorites);
list.addEventListener('click', handleCart);

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

if (favorites.length === 0) {
  emptyFavorites();

} else {
  list.insertAdjacentHTML('afterbegin', createSneakersMarkup(favorites));
  setFavoritesOnload();
  setInCartOnload();
}

setActualPriceIntoHeader();

function emptyFavorites() {
  const favoritesList = document.querySelector('.favoritesList__list');
  favoritesList.innerHTML = createEmptyFavorites();
}

function handleFavorites(event) {
  const heart = event.target;

  if (heart.classList.contains('sneaker__heart__button')) {
    const sneaker = heart.closest('li');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (heart.classList.contains('active')) {
      const updatedFavorites = favorites.filter(({ id }) => id !== sneaker.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      heart.classList.remove('active');
      sneaker.remove();
    }
  }
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if(favorites.length === 0) {
    emptyFavorites();
  }
}

async function handleCart(event) {
  const cart = event.target;

  if (cart.classList.contains('sneaker__add__button')) {
    const sneakerId = cart.parentNode.parentNode.id;
    const selectedSneaker = await getSneakerById(sneakerId) || {};
    const inCart = JSON.parse(localStorage.getItem('inCart')) || [];

    if (cart.classList.contains('active')) {
      const updatedCart = inCart.filter(({ id }) => id !== sneakerId);
      localStorage.setItem('inCart', JSON.stringify(updatedCart));
      cart.classList.remove('active');
      setActualPriceIntoHeader();
      return;
    }
    cart.classList.add('active');
    inCart.push(selectedSneaker);
    localStorage.setItem('inCart', JSON.stringify(inCart));
    setActualPriceIntoHeader();
  }
}


