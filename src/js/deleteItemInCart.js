import createEmptyCart from "./createMarkupFunctions/createEmptyCart";
import {setActualPriceIntoCart} from './calculateTotalPrice'

export function handleDelete(event) {
  if (
    event.target.classList.contains('sneaker__inCart__button') ||
    event.target.classList.contains('sneaker__inCart__button-span')
  ) {
    const inCart = JSON.parse(localStorage.getItem('inCart')) || [];
    const sneakerItem = event.target.closest('li');
    const sneaekers = inCart.filter(item => item.id !== sneakerItem.id);
    
    sneakerItem.remove();
    localStorage.setItem('inCart', JSON.stringify(sneaekers));
    setActualPriceIntoCart();
    const inCartAfterUpdate = JSON.parse(localStorage.getItem('inCart')) || [];

    if(inCartAfterUpdate.length === 0 ){
      document.querySelector('.cartList__container').innerHTML = createEmptyCart();
    }
  }
}
