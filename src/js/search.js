import sneakers from '../db/sneakers';
import createSneakersMarkup from './createSneakersMarkup';
import { findSneakers } from '../api/api';

const list = document.querySelector('.sneakersList__list');

export default function search(event) {
  const inputValue = event.currentTarget.value.toLocaleLowerCase().trim();
  list.innerHTML = '';
  findSneakers(inputValue).then(data =>
    list.insertAdjacentHTML('afterbegin', createSneakersMarkup(data)),
  );
  'afterbegin', createSneakersMarkup(searchedSneakers);
}
const input = document.querySelector('.search__input');
input.addEventListener('input', search);
