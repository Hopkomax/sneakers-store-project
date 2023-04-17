import sneakers from '../db/sneakers';
//document.querySelector('.sneakersList__container')
export function handleFavorites(event) {
  const heart = event.target;
  const sneakerId = heart.parentNode.parentNode.id;
  const selectedSneaker = sneakers.find(({ id }) => id === sneakerId);
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (heart.classList.contains('sneaker__heart__span')) {
    if (heart.classList.contains('active')) {
      const updatedFavorites = favorites.filter(({ id }) => id !== sneakerId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      heart.classList.remove('active');
      return;
    }
    heart.classList.add('active');
    favorites.push(selectedSneaker);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
// const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
// favorites.forEach(({ id }) => {
//   //const item = document.querySelector(`#${id}`);
//   const item = document.getElementById(id);
//   const heartButton = item.querySelector('.sneaker__heart__span');
//   heartButton.classList.add('active');
// });
  export function setFavoritesOnload(){
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.forEach(({ id }) => {
    const item = document.getElementById(id);
    const heartButton = item.querySelector('.sneaker__heart__span');
    heartButton.classList.add('active');
  });
};

