import sneakers from '../db/sneakers';

export default function createSneakersMarkup(items) {
  const markup = items
    .map(({title, images, price, id}) => {
      return `<li class='sneaker__item' id = "${id}">
    <div class='sneaker__img__wrapper'>
    <span class ='sneaker__heart__span'></span>
    <img src="${images[0]}" alt="${title}">
</div>
<h4 class='sneaker__title'>${title}</h4>
<div class='sneaker__price__container'>
    <div class='sneaker__price__wrapper'>
        <p class='sneaker__price__label'>Ціна</p>
        <p class='sneaker__price'>${price}</p>
    </div>
    <div class='sneaker__add__button'>
        <span class='sneaker__plus__span'>+</span>
    </div>
</div>
</li>`;
    })
    .join(' ');
return markup;
}
// const list = document.querySelector('.sneakersList__list');
// list.insertAdjacentHTML('afterbegin', createSneakersMarkup(sneakers));

