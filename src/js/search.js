import createSneakersMarkup from './createMarkupFunctions/createSneakersMarkup';
import { findSneakers } from '../api/api';
import createEmptyContent from './createMarkupFunctions/createEmptyContent';
import { setFavoritesOnload } from './handleFavorites';
import { setInCartOnload } from './handleCart';
import debounce from 'lodash/debounce';

const list = document.querySelector('.sneakersList__list');
const input = document.querySelector('.search__input');

async function search(event) {
  const inputValue = input.value.toLowerCase().trim();

  list.innerHTML = '';

  try {
    const data = await findSneakers(inputValue);

    if (data.length === 0) {
      list.insertAdjacentHTML('afterbegin', createEmptyContent());
    }

    list.insertAdjacentHTML('afterbegin', createSneakersMarkup(data));
    setFavoritesOnload();
    setInCartOnload();
  } catch (error) {
    console.error('Error searching sneakers:', error);
  }
}

const debouncedSearch = debounce(search, 500);

input.addEventListener('input', debouncedSearch);
