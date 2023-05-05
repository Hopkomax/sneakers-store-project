

export function makeOrder(){
    localStorage.removeItem('inCart');
    document.querySelector('.cartList__container').innerHTML = '';

}

const makeOrderButton = document.querySelector('.cart__container__button');
makeOrderButton.addEventListener('click', makeOrder);
