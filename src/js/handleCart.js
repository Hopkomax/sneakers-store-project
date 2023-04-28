import sneakers from '../db/sneakers';

function handleCart(event){
const cart = event.target;
console.log(cart.parentNode.parentNode.parentNode);
const sneakerId = cart.parentNode.parentNode.parentNode.id;
const selectedSneaker = sneakers.find(({id}) => id === sneakerId );
console.log(sneakerId);
const inCart = JSON.parse(localStorage.getItem('inCart')) || [];

if(cart.classList.contains('sneaker__plus__span')){
    if(cart.classList.contains('active')){
        const updatedCart = inCart.filter(({ id }) => id !== sneakerId);
        localStorage.setItem('inCart', JSON.stringify(updatedCart));
        cart.classList.remove('active');
        return;
    }
    cart.classList.add('active');
    inCart.push(selectedSneaker);
    localStorage.setItem('inCart', JSON.stringify(inCart));
}
}

export function setInCartOnload() {
  const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
  inCart.forEach(({ id }) => {
    const item = document.getElementById(id);
    const cartButton = item.querySelector('.sneaker__plus__span');
    cartButton.classList.add('active');
  });
};



document.querySelector('.sneakersList__list').addEventListener('click', handleCart);

//heder__user__icon__cart

//sneaker__add__button
//sneaker__plus__span