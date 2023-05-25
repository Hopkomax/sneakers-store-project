import createSneakersMarkup from './createSneakersMarkup';
import { findSneakers } from '../api/api';
import createEmptyContent from './createEmptyContent';
import { setFavoritesOnload } from './handleFavorites';
import { setInCartOnload } from './handleCart';

const list = document.querySelector('.sneakersList__list');

export default function search(event) {
  const inputValue = event.currentTarget.value.toLocaleLowerCase().trim();

  list.innerHTML = '';

  findSneakers(inputValue).then(data => {
    if (data.length === 0) {
      list.insertAdjacentHTML('afterbegin', createEmptyContent());
    }
    list.insertAdjacentHTML('afterbegin', createSneakersMarkup(data));
    setFavoritesOnload();
    setInCartOnload();
  });
}

const input = document.querySelector('.search__input');

input.addEventListener('input', search);
