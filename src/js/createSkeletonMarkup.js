 
export default function createSkeletonMarkup() {
    const list = document.querySelector('.sneakersList__list');
    const skeletonMarkup = [...new Array(6)].map(() => {

  return `
  <li class="skeleton__item">
    <div class="skeleton__img__wrapper"></div>
    <div class="skeleton__title__wrapper">
      <div class="skeleton__title__long"></div>
      <div class="skeleton__title__short"></div>
    </div>
    <div class="skeleton__price__container">
      <div class="skeleton__price__wrapper"></div>
      <div class="skeleton__add_button"></div>
    </div>
  </li>
  `;
}).join(' ');
list.insertAdjacentHTML('afterbegin', skeletonMarkup);
console.log(skeletonMarkup);
}

