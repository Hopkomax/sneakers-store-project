import sneakers from '../db/sneakers';
//document.querySelector('.sneakersList__container')
export function handleFavorites(event) {
  const heart = event.target;
  console.log( heart);


  if (heart.classList.contains('sneaker__heart__button')) {
    const sneakerId = heart.closest('li').id;
    const selectedSneaker = sneakers.find(({ id }) => id === sneakerId);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
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

  export function setFavoritesOnload(){
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  for (const {id} of favorites) {
    const item = document.getElementById(id);
    if(!item){
      continue;
    }
    const heartButton = item.querySelector('.sneaker__heart__button');
    heartButton.classList.add('active');
  }

};

