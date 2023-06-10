export default function createPurchasesMarkup(items) {
  const markup = items
  .map(({ title, images, price, id }) => {
    return `
    <li class='sneaker__InPurchases__item'id=${id}>
    <img class='sneaker__InPurchases__img' src="${images[0]}" alt="${title}">
    <div class='sneaker__InPurchases__description'>
        <h3>${title}</h3>
        <p>${price} UAH</p>
    </div>
</li>`;
  })
  .join(' ');
return markup;
}