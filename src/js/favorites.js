import createSneakersMarkup from './createSneakersMarkup';
import { setFavoritesOnload } from './handleFavorites';
import { createEmptyFavorites } from './createEmptyFavorites';
import sneakers from '../db/sneakers';
import { setActualPriceIntoHeader } from './calculateTotalPrice';
import { setInCartOnload } from './handleCart';
import mobileMenu from './mobileMenu';

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

function handleCart(event) {
  const cart = event.target;

  if (cart.classList.contains('sneaker__add__button')) {
    const sneakerId = cart.parentNode.parentNode.id;
    const selectedSneaker = sneakers.find(({ id }) => id === sneakerId);
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
