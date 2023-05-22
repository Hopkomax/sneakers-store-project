import heartIcon from '../img/vector_heart.svg';
export default function createSneakersMarkupInCart(items) {
  const markup = items
    .map(({ title, images, price, id }) => {
      return `
      <li class='sneaker__inCart__item'id=${id}>
      <img class='sneaker__inCart__img' src="${images[0]}" alt="${title}">
      <div class='sneaker__inCart__description'>
          <h3>${title}</h3>
          <p>${price} UAH</p>
      </div>
      <div class='sneaker__inCart__button'>
          <span class='sneaker__inCart__button-span'>x</span>
      </div>
  </li>`;
    })
    .join(' ');
  return markup;
}
