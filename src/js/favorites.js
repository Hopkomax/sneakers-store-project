import createSneakersMarkup from './createSneakersMarkup';
import { handleFavorites, setFavoritesOnload } from './handleFavorites';

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
if (favorites.length === 0) {
    emptyFavorites();
} else {
  const list = document.querySelector('.favoritesList__list');
  list.insertAdjacentHTML('afterbegin', createSneakersMarkup(favorites));

 setFavoritesOnload();
}

function emptyFavorites() {const title = document.querySelector('.favoritesList__title');
title.textContent = '(пусто)';
const img = document.createElement('img');
img.src =
  'https://cdn.dribbble.com/users/1639273/screenshots/4897055/media/b23d4908df82e11bfe4e11072c41a7bb.png?compress=1&resize=400x300';
img.classList.add('img');
title.after(img);}

const list = document.querySelector('.favoritesList__list');
list.addEventListener('click', (event) => {
  handleFavorites(event);
  const toSneakerDelete = event.target.parentNode.parentNode;
  toSneakerDelete.remove();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if(favorites.length ===0 ){
    emptyFavorites();
  }
});

