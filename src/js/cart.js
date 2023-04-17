import createSneakersMarkup from './createSneakersMarkup'

console.log(createSneakersMarkup);
const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
console.log(inCart);
if(inCart.length === 0 ){
    const title = document.querySelector('.cartList__title');
    title.textContent = '( )';
    const img = document.createElement("img");
    img.src = 'https://cdn.dribbble.com/users/1639273/screenshots/4897055/media/b23d4908df82e11bfe4e11072c41a7bb.png?compress=1&resize=400x300';
    img.classList.add("img");
    title.after(img);
} else {
    console.log(inCart);
    const list = document.querySelector('.cartList__list');
    list.insertAdjacentHTML('afterbegin', createSneakersMarkup(inCart));

}