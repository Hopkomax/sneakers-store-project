export default function createSneakersMarkup(items) {
  const markup = items
    .map(({ title, images, price, id }) => {
      const formatedTitle = title.slice(0, 23) + '...';
      return `<li class='sneaker__item' id = "${id}">
    <div class='sneaker__img__wrapper'>
    <div class='sneaker__heart__button'>
</div>
    <img src="${images[0]}" alt="${title}">
</div>
<h4 class='sneaker__title'>${formatedTitle}</h4>
<div class='sneaker__price__container'>
    <div class='sneaker__price__wrapper'>
        <p class='sneaker__price__label'>Price</p>
        <p class='sneaker__price'>${price}</p>
    </div>
    <div class='sneaker__add__button'>
        <span class='sneaker__plus__span'></span>
    </div>
</div>
</li>`;
    })
    .join(' ');
  return markup;
}
