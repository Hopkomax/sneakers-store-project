export default function createPurchasesMarkup(items) {
  const markup = items
    .map(({ order, createdAt }) => {
console.log(createdAt);
const normalDate = new Date(createdAt.toDate()).toLocaleString("en-GB",{day: "numeric", hour:'2-digit', minute:'2-digit', month:'long', year:'numeric'})
      return `
    <li class="purchasesList__item">
    <p class="purchasesItem__date">${normalDate}</p>
    <ul class="purchasesItem__sneakers"> ${order
      .map(({ title, images, price, id }) => {
        const formatedTitle = title.slice(0, 20) + '...';
        return `
      <li class='sneaker__InPurchases__item'id=${id}>
      <img class='sneaker__InPurchases__img' src="${images[0]}" alt="${formatedTitle}">
      <div class='sneaker__InPurchases__description'>
          <h3>${formatedTitle}</h3>
          <p>${price} UAH</p>
      </div>
  </li>`;
      })
      .join(' ')}
    </ul>
  </li>`;
    })

    .join(' ');
  return markup;
}
//  const markup = orders.map(({order, createdAt}) => {
//   return `
//   <li>
//   <p>10.06</p>
//   <ul> ${order.map(({title}) => `<li>${title}</li>`)}
//   </ul>
// </li>`
// })
