import sneakers from '../db/sneakers';

export function handleFavorites(event) {
  const heart = event.target;

  if (heart.classList.contains('sneaker__heart__button')) {
    const sneaker = heart.closest('li');
    const selectedSneaker = sneakers.find(({ id }) => id === sneaker.id);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (heart.classList.contains('active')) {
      const updatedFavorites = favorites.filter(({ id }) => id !== sneaker.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      heart.classList.remove('active');
      return;
    }
    heart.classList.add('active');
    favorites.push(selectedSneaker);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function setFavoritesOnload() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  for (const { id } of favorites) {
    const item = document.getElementById(id);
    if (!item) {
      continue;
    }

    const heartButton = item.querySelector('.sneaker__heart__button');

    heartButton.classList.add('active');
  }
}
